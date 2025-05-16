import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const languages = {
  en: { nativeName: 'English', flag: '🇬🇧' },
  az: { nativeName: 'Azərbaycan', flag: '🇦🇿' },
  tr: { nativeName: 'Türkçe', flag: '🇹🇷' },
  ru: { nativeName: 'Русский', flag: '🇷🇺' },
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const currentLanguageCode = i18n.resolvedLanguage || 'en';
  const currentLanguage = languages[currentLanguageCode] || languages.en;

  return (
    <div className="language-switcher-container" ref={dropdownRef}>
      <button
        className="language-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Change language, current language ${currentLanguage.nativeName}`}
      >
        {currentLanguage.flag}
        <span className="dropdown-arrow">{isOpen ? ' ▲' : ' ▼'}</span>
      </button>
      <ul className={`language-switcher-dropdown ${isOpen ? 'open' : ''}`}>
        {Object.keys(languages).map((lng) => (
          <li key={lng}>
              <button
                className={`language-option ${currentLanguageCode === lng ? 'selected' : ''}`}
                onClick={() => handleLanguageChange(lng)}
              >
                {languages[lng].flag} {languages[lng].nativeName}
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default LanguageSwitcher;