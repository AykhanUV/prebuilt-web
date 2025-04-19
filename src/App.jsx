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
    const backgroundAnimation = document.createElement('div');
    backgroundAnimation.className = 'background-animation';
    document.body.appendChild(backgroundAnimation)

    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      star.innerHTML = '★'
      star.style.top = `${Math.random() * 100}vh`
      star.style.left = `${Math.random() * 100}vw`

      if (Math.random() > 0.7) {
        star.classList.add('blue')
      }

      const fadeDelay = Math.random() * 1
      const rotateDelay = 0

      star.style.animationDelay = `${fadeDelay}s, ${rotateDelay}s`

      backgroundAnimation.appendChild(star)
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => {
      clearTimeout(timer);
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
