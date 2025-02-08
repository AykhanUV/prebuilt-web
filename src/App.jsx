import React, { useEffect } from 'react'

const apks = [
  { name: 'Afnify', logo: 'afnify.png', desc: 'This app is modified YouTube app with no ads and custom features(Mostly up to date)', downloadLink: 'https://github.com/AykhanUV/Afnify/releases/download/Afnify(20.05.44)/Afnify.apk', version: '19.28.42' },
  { name: 'AfnMusic', logo: 'afnmusic.png', desc: 'This app is modified YouTube Music app with no ads and custom features', downloadLink: 'https://github.com/AykhanUV/AfnMusic/releases/download/AfnMusic(7.16.53)v5/AfnMusic.apk', version: '7.16.53' },
  { name: 'MicroG', logo: 'microg.png', desc: 'Just MicroG required for YT products', downloadLink: 'https://github.com/AykhanUV/MicroG/releases/download/2.5/MicroG-signed.apk', version: '2.5' },
  { name: 'AfnPlayer', logo: 'afnplayer.png', desc: 'An Android native video player', downloadLink: 'https://github.com/AykhanUV/AfnPlayer/releases/download/v1.0/AfnPlayer-arm64-v8a.apk', version: '1.0' },
  { name: 'Symphony', logo: 'symphony.png', desc: 'Lightweight, elegant music player for Android 9+ ', downloadLink: 'https://github.com/AykhanUV/Symphony/releases/download/v2024.4.111/Symphony.apk', version: '2024.4.111' },
  { name: 'Photomath', logo: 'photomath.png', desc: 'Modded version of Photomath', downloadLink: 'https://github.com/AykhanUV/mc/releases/download/1.21.30.03/PhotoMath.v8.37.0.Rollback.apk', version: '8.37.0' },
  { name: 'Spotify', logo: 'spotify.png', desc: 'Modded version of Spotify', downloadLink: 'https://github.com/AykhanUV/mc/releases/download/1.21.30.03/Spotify.v9.02.459.Experimental.Merged.apk', version: '9.02.459' },
  { name: 'YT-Extended', logo: 'yt-extended.png', desc: 'This app is modified YouTube app with no ads and custom features(Difference from Afnify is branding and version/patches)', downloadLink: 'https://github.com/AykhanUV/YT-Extended/releases/download/YT-Extended(19.26.42)v2/YT-Extended.apk', version: '19.26.42' },
  { name: 'TikTok', logo: 'tiktok.png', desc: 'Modified TikTok. No ads, watermark-free downloads.', downloadLink: 'https://github.com/AykhanUV/AfnTikTok/releases/download/v36.5.4(v2)/AfnTikTok.apk', version: '36.5.4' },
  { name: 'Minecraft', logo: 'minecraft.png', desc: 'Minecraft v1.21.51, arm64-v8a apk. Music is cut off to reduce file size', downloadLink: 'https://github.com/AykhanUV/mc/releases/download/1.21.30.03/minecraft-1-21-51-01-arm64-v8a-xbox-servers-compressed.apk', version: '1.21.51' },
  { name: 'Seal', logo: 'seal.png', desc: '🦭 Video/Audio Downloader for Android, based on yt-dlp, designed with Material You', downloadLink: 'https://github.com/JunkFood02/Seal/releases/download/v1.13.1/Seal-1.13.1-arm64-v8a-release.apk', version: '1.13.1' },
  { name: 'YTDLnis', logo: 'ytdlnis.png', desc: 'Android Video/Audio Downloader app using yt-dlp ', downloadLink: 'https://github.com/deniscerri/ytdlnis/releases/download/v1.8.1.2/YTDLnis-1.8.1.2-arm64-v8a-release.apk', version: '1.8.1.2' }
]

function App() {
  useEffect(() => {
    const backgroundAnimation = document.createElement('div')
    backgroundAnimation.className = 'background-animation'
    document.body.appendChild(backgroundAnimation)

    for (let i = 0; i < 50; i++) {
      const ball = document.createElement('div')
      ball.className = 'ball'
      ball.style.top = `${Math.random() * 100}vh`
      ball.style.left = `${Math.random() * 100}vw`
      ball.style.width = `${Math.random() * 30 + 10}px`
      ball.style.height = ball.style.width
      ball.style.backgroundColor = Math.random() > 0.5 ? 'rgba(0, 0, 255, 0.5)' : 'rgba(128, 128, 128, 0.5)'
      ball.style.animationDelay = `${Math.random() * 5}s`
      ball.style.animationDuration = `${Math.random() * 3 + 2}s` // Random duration between 2s and 5s
      backgroundAnimation.appendChild(ball)
    }
  }, [])

  return (
    <div className="app">
      <div className="header fade-in">
        <h1>APK Center</h1>
        <a href="https://github.com/AykhanUV/prebuilt-web" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
      </div>
      <div className="apk-sections">
        {apks.map((apk, index) => (
          <div key={index} className="apk-section fade-in">
            <h2>{apk.name}</h2>
            <p className="version-text">Version: {apk.version}</p>
            <img src={`/${apk.logo}`} alt={apk.name} />
            <p>{apk.desc}</p>
            <button onClick={() => window.open(apk.downloadLink, '_blank')}>Download</button>
          </div>
        ))}
      </div>
      <div className="footer fade-in">
        <p>&copy; 2024 AykhanUV</p>
      </div>
    </div>
  )
}

export default App
