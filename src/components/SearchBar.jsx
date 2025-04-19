import React from 'react';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const { t } = useTranslation();

  return (
    <div className="search-container fade-in">
      <input
        type="text"
        placeholder={t('searchPlaceholder')}
        value={searchTerm}
        onChange={onSearchChange}
        className="search-input"
        aria-label={t('searchPlaceholder')}
      />
    </div>
  );
};

export default SearchBar;