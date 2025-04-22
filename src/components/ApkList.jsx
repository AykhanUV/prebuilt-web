import React from 'react';
import { useTranslation } from 'react-i18next';
import ApkCard from './ApkCard';
import ApkCardSkeleton from './ApkCardSkeleton';

const ApkList = ({ isLoading, filteredApks, searchTerm, handleDownload }) => {
  const { t } = useTranslation();

  const skeletonCount = 6;

  return (
    <div className="apk-sections">
      {isLoading ? (
        Array.from({ length: skeletonCount }).map((_, index) => (
          <ApkCardSkeleton key={`skeleton-${index}`} />
        ))
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
