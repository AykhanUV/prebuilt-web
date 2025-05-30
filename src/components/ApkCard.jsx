import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function formatFileSize(bytes) {
  if (bytes === undefined || bytes === null || isNaN(bytes)) return '';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(i > 0 ? 1 : 0));
  return formattedSize + ' ' + sizes[i];
}

function highlightMatch(text, term) {
  if (!term || typeof text !== 'string') {
    return text;
  }
  try {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="search-highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  } catch (e) {
    console.error("Error creating regex or highlighting:", e);
    return text;
  }
}

const ApkCard = ({ apk, searchTerm, handleDownload, index }) => {
  const { t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);

  const logoSrc = apk.logo ? `/${apk.logo}` : '/placeholder.png';

  const handleDownloadClick = () => {
    if (!apk.downloadLink || isDownloading) return;

    setIsDownloading(true);
    handleDownload(apk.downloadLink, apk.name);

    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };

  let formattedUpdateDate = null;

  if (apk.apkAssetUpdatedAt) {
    const publishDate = new Date(apk.apkAssetUpdatedAt);
    formattedUpdateDate = publishDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div
      className="apk-section fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h2>{highlightMatch(apk.name, searchTerm)}</h2>
      {formattedUpdateDate && (
        <p className="apk-meta last-updated-timestamp">
          {t('apkLastUpdatedLabel', 'Updated:')} {formattedUpdateDate}
        </p>
      )}
      {apk.version && (
         <p className="version-text">{t('versionPrefix', 'Version:')} {apk.version}</p>
      )}
      <img src={logoSrc} alt={`${apk.name} logo`} onError={(e) => { e.target.onerror = null; e.target.src='/placeholder.png'; }} />
      <p>{highlightMatch(t(apk.descKey), searchTerm)}</p>
      {apk.requiresMicroG && (
        <div className="microg-indicator">
          <img src="/microg.png" alt="MicroG logo" className="microg-logo" />
          <span>{t('requiresMicroG')}</span>
        </div>
      )}
      <button onClick={handleDownloadClick} disabled={!apk.downloadLink || isDownloading}>
        {isDownloading ? t('downloadingButton') : t('downloadButton')}
      </button>
      {(apk.fileSize !== undefined || apk.downloadLink) && (
        <div className="apk-meta-container">
          {apk.fileSize !== undefined && (
            <p className="apk-meta">{t('fileSizeLabel', 'Size:')} {formatFileSize(apk.fileSize)}</p>
          )}
          {apk.downloadLink && (
            <div className="virustotal-link-container">
              <a
                href={`https://www.virustotal.com/gui/search/${encodeURIComponent(encodeURIComponent(apk.downloadLink))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="virustotal-link"
                title={t('scanOnVirusTotal')}
              >
                <img src="/virustotal.svg" alt="VirusTotal Logo" className="virustotal-logo" />
                <span>{t('scanOnVirusTotal')}</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApkCard;