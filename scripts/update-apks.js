import { Octokit } from "@octokit/rest";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APKS_JSON_PATH = path.join(__dirname, '../src/apks.json');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

function cleanVersion(versionString) {
    return versionString?.startsWith('v') ? versionString.substring(1) : versionString;
}

function findMatchingAsset(assets, assetPattern) {
    if (!assets || assets.length === 0) return null;
    try {
        const regex = new RegExp(assetPattern);
        return assets.find(asset => regex.test(asset.name));
    } catch (e) {
        console.warn(`Interpreting assetPattern "${assetPattern}" as exact match due to regex error: ${e.message}`);
        return assets.find(asset => asset.name === assetPattern);
    }
}

async function getLatestReleaseInfo(appConfig) {
    const { repo, updateStrategy, tagPattern, assetPattern, name } = appConfig;
    if (!repo) {
        console.warn(`Skipping ${name}: Missing 'repo' configuration.`);
        return null;
    }

    const [owner, repoName] = repo.split('/');
    if (!owner || !repoName) {
        console.warn(`Skipping ${name}: Invalid 'repo' format "${repo}". Should be "owner/repoName".`);
        return null;
    }

    try {
        console.log(`Checking for updates: ${name} (${repo})...`);
        const { data: latestRelease } = await octokit.repos.getLatestRelease({ owner, repo: repoName });

        if (!latestRelease) {
            console.warn(`Skipping ${name}: No releases found for ${repo}.`);
            return null;
        }

        const tagName = latestRelease.tag_name;
        const assets = latestRelease.assets;
        let version = null;
        let downloadLink = null;

        const matchingAsset = findMatchingAsset(assets, assetPattern);
        if (!matchingAsset) {
            console.warn(`Skipping ${name}: No asset found matching pattern "${assetPattern}" in release ${tagName}.`);
            return null;
        }
        downloadLink = matchingAsset.browser_download_url;

        switch (updateStrategy) {
            case 'tagPattern':
                try {
                    const tagRegex = new RegExp(tagPattern);
                    const match = tagName.match(tagRegex);
                    if (match && match[1]) {
                        version = match[1];
                    } else {
                        console.warn(`Skipping ${name}: Tag "${tagName}" did not match pattern "${tagPattern}".`);
                        return null;
                    }
                } catch (e) {
                    console.error(`Skipping ${name}: Invalid tagPattern regex "${tagPattern}". Error: ${e.message}`);
                    return null;
                }
                break;

            case 'directTag':
                version = cleanVersion(tagName);
                break;

            case 'assetFilename':
                 try {
                    const assetRegex = new RegExp(assetPattern);
                    const match = matchingAsset.name.match(assetRegex);
                    if (match && match[1]) {
                        version = match[1];
                    } else {
                        console.warn(`Skipping ${name}: Asset filename "${matchingAsset.name}" did not match pattern "${assetPattern}" or capture group missing.`);
                        return null;
                    }
                } catch (e) {
                    console.error(`Skipping ${name}: Invalid assetPattern regex "${assetPattern}". Error: ${e.message}`);
                    return null;
                }
                break;

            default:
                console.warn(`Skipping ${name}: Unknown updateStrategy "${updateStrategy}".`);
                return null;
        }

        if (version && downloadLink) {
            console.log(`  Found potential update: ${name} v${version} (Size: ${matchingAsset.size})`);
            return {
                version,
                downloadLink,
                fileSize: matchingAsset.size
            };
        } else {
             console.warn(`Skipping ${name}: Could not determine version or download link.`);
            return null;
        }

    } catch (error) {
        if (error.status === 404) {
             console.warn(`Skipping ${name}: Repository ${repo} not found or no releases available.`);
        } else {
            console.error(`Error fetching release for ${name} (${repo}):`, error.message);
        }
        return null;
    }
}

async function updateApks() {
    console.log(`Reading APK data from ${APKS_JSON_PATH}...`);
    let apksData;
    try {
        const fileContent = await fs.readFile(APKS_JSON_PATH, 'utf-8');
        apksData = JSON.parse(fileContent);
    } catch (error) {
        console.error(`Failed to read or parse ${APKS_JSON_PATH}:`, error);
        return;
    }

    let updatesMade = false;
    const updatedApksData = [...apksData];

    for (let i = 0; i < updatedApksData.length; i++) {
        const appConfig = updatedApksData[i];
        const latestInfo = await getLatestReleaseInfo(appConfig);

        if (latestInfo) {
            const mergedData = {
                ...appConfig,
                ...latestInfo
            };

            if (latestInfo.version !== appConfig.version) {
                console.log(`  Updating ${appConfig.name}: ${appConfig.version} -> ${latestInfo.version}`);
                updatesMade = true;
            } else {
                 console.log(`  Refreshed data for ${appConfig.name} (v${appConfig.version}).`);
            }
            updatedApksData[i] = mergedData;
        } else {
             updatedApksData[i] = appConfig;
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log("Finished checking apps. Writing current data back to apks.json...");
    try {
        console.log("Data to be written:", JSON.stringify(updatedApksData, null, 2));
        await fs.writeFile(APKS_JSON_PATH, JSON.stringify(updatedApksData, null, 2), 'utf-8');
        console.log("Successfully updated apks.json.");
    } catch (error) {
        console.error("Failed to write updates to apks.json:", error);
    }
}

updateApks().catch(error => {
    console.error("An unexpected error occurred during the update process:", error);
    process.exit(1);
});