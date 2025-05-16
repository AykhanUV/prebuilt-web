import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ApkList from './components/ApkList';
import apksData from './apks.json';


function App() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let vantaEffect = null;
    if (window.VANTA && window.p5) {
      vantaEffect = window.VANTA.TOPOLOGY({
        el: "#vanta-background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x45ed,
        backgroundColor: 0x0
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

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
      <div id="vanta-background"></div>
      <Header />
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
