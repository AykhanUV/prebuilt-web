import React from 'react';
import { useTranslation } from 'react-i18next';
import ApkCard from './ApkCard';

const ApkList = ({ isLoading, filteredApks, searchTerm, handleDownload }) => {
  const { t } = useTranslation();

  return (
    <div className="apk-sections">
      {isLoading ? (
        <p className="loading-message">{t('loadingMessage', 'Loading...')}</p>
      ) : filteredApks.length > 0 ? (
        filteredApks.map((apk, index) => (
          <ApkCard
            key={apk.name || index}
            apk={apk}
            searchTerm={searchTerm}
            handleDownload={handleDownload}
            index={index}
          />
        ))
      ) : (
        <p className="no-results">{t('noResults')}</p>
      )}
    </div>
  );
};

export default ApkList;