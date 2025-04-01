import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="app">
      <div className="header fade-in">
        <h1>{t('notFoundTitle')}</h1>
      </div>
      <div className="content fade-in">
        <p>{t('notFoundMessage')}</p>
        <a href="/" className="back-home-button">{t('notFoundButton')}</a>
      </div>
      <div className="footer fade-in">
        <p>{t('footerCopyright')}</p>
      </div>
    </div>
  );
};

export default NotFound;
