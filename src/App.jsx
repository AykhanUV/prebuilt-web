import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import apksData from './apks.json'

function formatFileSize(bytes) {
  if (bytes === undefined || bytes === null || isNaN(bytes)) return '';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function App() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    const backgroundAnimation = document.createElement('div')
    backgroundAnimation.className = 'background-animation'
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
  }, [])

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

  return (
    <div className="app">
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
      <div className="search-container fade-in">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="apk-sections">
        {filteredApks.length > 0 ? (
          filteredApks.map((apk, index) => (
            <div
              key={index}
              className="apk-section fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h2>{apk.name}</h2>
              <p className="version-text">{t('versionPrefix')} {apk.version}</p>
              <img src={`/${apk.logo}`} alt={`${apk.name} logo`} />
              <p>{t(apk.descKey)}</p>
              {apk.requiresMicroG && (
                <div className="microg-indicator">
                  <img src="/microg.png" alt="MicroG logo" className="microg-logo" />
                  <span>{t('requiresMicroG')}</span>
                </div>
              )}
              <button onClick={() => window.open(apk.downloadLink, '_blank')}>{t('downloadButton')}</button>
              {apk.fileSize !== undefined && (
                 <p className="apk-meta">{t('fileSizeLabel', 'Size:')} {formatFileSize(apk.fileSize)}</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">{t('noResults')}</p>
        )}
      </div>
      <div className="footer fade-in">
        <p>{t('footerCopyright')}</p>
      </div>
    </div>
  )
}

export default App
