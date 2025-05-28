import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ApkList from './components/ApkList';
import apksData from './apks.json';
import MatrixBackground from './components/MatrixBackground';

function App() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showMatrixAnimation, setShowMatrixAnimation] = useState(() => {
    const savedPreference = localStorage.getItem('showMatrixAnimation');
    return savedPreference !== null ? JSON.parse(savedPreference) : true;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('showMatrixAnimation', JSON.stringify(showMatrixAnimation));
  }, [showMatrixAnimation]);

  const toggleMatrixAnimation = () => {
    setShowMatrixAnimation(prevShow => !prevShow);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredApks = apksData.filter(apk => {
    const translatedDesc = t(apk.descKey) || ''
    return (
      apk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translatedDesc.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleDownload = (downloadUrl, apkName) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `${apkName}.apk`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      {showMatrixAnimation && <MatrixBackground />}
      <Header toggleMatrixAnimation={toggleMatrixAnimation} showMatrixAnimation={showMatrixAnimation} />
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <ApkList
        isLoading={isLoading}
        filteredApks={filteredApks}
        searchTerm={searchTerm}
        handleDownload={handleDownload}
      />
      <div className="footer fade-in">
        <p>{t('footerCopyright')}</p>
      </div>
    </div>
  )
}

export default App
