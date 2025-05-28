import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const languages = {
  en: { nativeName: 'English', flag: '🇬🇧' },
  az: { nativeName: 'Azərbaycan', flag: '🇦🇿' },
  tr: { nativeName: 'Türkçe', flag: '🇹🇷' },
  ru: { nativeName: 'Русский', flag: '🇷🇺' },
  es: { nativeName: 'Español', flag: '🇪🇸' },
  fr: { nativeName: 'Français', flag: '🇫🇷' },
  de: { nativeName: 'Deutsch', flag: '🇩🇪' },
  it: { nativeName: 'Italiano', flag: '🇮🇹' },
  pt: { nativeName: 'Português', flag: '🇵🇹' },
  ja: { nativeName: '日本語', flag: '🇯🇵' },
  ko: { nativeName: '한국어', flag: '🇰🇷' },
  'zh-CN': { nativeName: '简体中文', flag: '🇨🇳' },
  hi: { nativeName: 'हिन्दी', flag: '🇮🇳' },
  ar: { nativeName: 'العربية', flag: '🇸🇦' },
  bn: { nativeName: 'বাংলা', flag: '🇧🇩' },
  ur: { nativeName: 'اردو', flag: '🇵🇰' },
  id: { nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  nl: { nativeName: 'Nederlands', flag: '🇳🇱' },
  pl: { nativeName: 'Polski', flag: '🇵🇱' },
  sv: { nativeName: 'Svenska', flag: '🇸🇪' },
  uk: { nativeName: 'Українська', flag: '🇺🇦' },
  ro: { nativeName: 'Română', flag: '🇷🇴' },
  cs: { nativeName: 'Čeština', flag: '🇨🇿' },
  hu: { nativeName: 'Magyar', flag: '🇭🇺' },
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