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
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('matrix-background');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+[]{}|;':\",./<>?`~абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    let animationInterval;

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#007bff';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops.length = 0;
      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }
      if (animationInterval) clearInterval(animationInterval);
      animationInterval = setInterval(draw, 33);
    };
    
    setup();

    window.addEventListener('resize', setup);

    return () => {
      clearInterval(animationInterval);
      window.removeEventListener('resize', setup);
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
      <canvas id="matrix-background"></canvas>
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
