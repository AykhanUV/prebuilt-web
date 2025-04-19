import React from 'react';
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

  const logoSrc = apk.logo ? `/${apk.logo}` : '/placeholder.png';

  return (
    <div
      className="apk-section fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h2>{highlightMatch(apk.name, searchTerm)}</h2>
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
      <button onClick={() => handleDownload(apk.downloadLink, apk.name)} disabled={!apk.downloadLink}>
        {t('downloadButton')}
      </button>
      {apk.fileSize !== undefined && (
         <p className="apk-meta">{t('fileSizeLabel', 'Size:')} {formatFileSize(apk.fileSize)}</p>
      )}
    </div>
  );
};

export default ApkCard;