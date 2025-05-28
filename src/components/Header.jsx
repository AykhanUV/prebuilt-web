import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ toggleMatrixAnimation, showMatrixAnimation }) => {
  const { t } = useTranslation();

  return (
    <div className="header fade-in">
      <div className="header-left">
        <a href="https://github.com/AykhanUV/prebuilt-web" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
          <i className="fab fa-github" aria-hidden="true"></i>
          <span className="sr-only">{t('headerGithubLinkAlt')}</span>
        </a>
      </div>
      <h1>{t('headerTitle')}</h1>
      <div className="header-right">
        <button
          onClick={toggleMatrixAnimation}
          className="matrix-toggle-button"
          aria-label={showMatrixAnimation ? t('disableMatrixAnimation') : t('enableMatrixAnimation')}
          title={showMatrixAnimation ? t('disableMatrixAnimation') : t('enableMatrixAnimation')}
        >
          <i className={showMatrixAnimation ? "fas fa-toggle-on" : "fas fa-toggle-off"} aria-hidden="true"></i>
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;