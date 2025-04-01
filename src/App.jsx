import React, { useState, useEffect } from 'react'
import apksData from './apks.json'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    const backgroundAnimation = document.createElement('div')
    backgroundAnimation.className = 'background-animation'
    document.body.appendChild(backgroundAnimation)

    for (let i = 0; i < 50; i++) {
      const ball = document.createElement('div')
      ball.className = 'ball'
      ball.style.top = `${Math.random() * 100}vh`
      ball.style.left = `${Math.random() * 100}vw`
      ball.style.width = '20px'
      ball.style.height = ball.style.width
      ball.style.backgroundColor = 'rgba(128, 128, 128, 0.5)'
      ball.style.animationDelay = `${Math.random() * 5}s`
      ball.style.animationDuration = `${Math.random() * 3 + 3}s`
      backgroundAnimation.appendChild(ball)
    }
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredApks = apksData.filter(apk =>
    apk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apk.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <div className="header fade-in">
        <h1>APK Center</h1>
        <a href="https://github.com/AykhanUV/prebuilt-web" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
          <i className="fab fa-github"></i>
        </a>
      </div>
      <div className="search-container fade-in">
        <input
          type="text"
          placeholder="Search APKs by name or description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="apk-sections">
        {filteredApks.length > 0 ? (
          filteredApks.map((apk, index) => (
            <div key={index} className="apk-section fade-in">
              <h2>{apk.name}</h2>
              <p className="version-text">Version: {apk.version}</p>
              <img src={`/${apk.logo}`} alt={`${apk.name} logo`} />
              <p>{apk.desc}</p>
              <button onClick={() => window.open(apk.downloadLink, '_blank')}>Download</button>
            </div>
          ))
        ) : (
          <p className="no-results">No matching APKs found.</p>
        )}
      </div>
      <div className="footer fade-in">
        <p>&copy; 2024 AykhanUV</p>
      </div>
    </div>
  )
}

export default App
