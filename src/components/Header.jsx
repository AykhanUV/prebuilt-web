import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
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
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;