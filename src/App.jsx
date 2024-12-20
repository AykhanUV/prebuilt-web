import React, { useEffect } from 'react';

    const apks = [
      { name: 'Afnify', logo: 'afnify.png', desc: 'This app is modified YouTube app with no ads and custom features', downloadLink: 'https://github.com/AykhanUV/Afnify/releases/download/Afnify(19.26.42)v7/Afnify.apk' },
      { name: 'AfnMusic', logo: 'afnmusic.png', desc: 'This app is modified YouTube Music app with no ads and custom features', downloadLink: 'https://github.com/AykhanUV/AfnMusic/releases/download/AfnMusic(7.16.53)v3/AfnMusic.apk' },
      { name: 'MicroG', logo: 'microg.png', desc: 'Just MicroG required for YT products', downloadLink: 'https://github.com/AykhanUV/MicroG/releases/download/2.0/MicroG-signed.apk' },
      { name: 'AfnPlayer', logo: 'afnplayer.png', desc: 'An Android native video player', downloadLink: 'https://github.com/AykhanUV/AfnPlayer/releases/download/v1.0/AfnPlayer-arm64-v8a.apk' },
      { name: 'Symphony', logo: 'symphony.png', desc: 'Lightweight, elegant music player for Android 9+ ', downloadLink: 'https://github.com/AykhanUV/Symphony/releases/download/v2024.4.111/Symphony.apk' },
      { name: 'Photomath', logo: 'photomath.png', desc: 'Modded version of Photomath', downloadLink: 'https://github.com/AykhanUV/mc/releases/download/1.21.30.03/PhotoMath.v8.37.0.Rollback.apk' },
      { name: 'Spotify', logo: 'spotify.png', desc: 'Modded version of Spotify', downloadLink: 'https://github.com/AykhanUV/mc/releases/download/1.21.30.03/Spotify.v8.9.98.488.Experimental.Merged.apk' },
      { name: 'YT-Extended', logo: 'yt-extended.png', desc: 'This app is modified YouTube app with no ads and custom features', downloadLink: 'https://github.com/AykhanUV/YT-Extended/releases/download/YT-Extended(19.26.42)v2/YT-Extended.apk' },
    ];

    function App() {
      useEffect(() => {
        const createStar = (size) => {
          const star = document.createElement('div');
          star.className = `star ${size}`;
          star.style.top = `${Math.random() * 100}vh`;
          star.style.left = `${Math.random() * 100}vw`;
          star.style.animationDuration = `${Math.random() * 10 + 5}s, 2s`;
          document.querySelector('.starry-night').appendChild(star);
        };

        for (let i = 0; i < 100; i++) {
          createStar('small');
        }
        for (let i = 0; i < 60; i++) {
          createStar('medium');
        }
        for (let i = 0; i < 40; i++) {
          createStar('large');
        }
      }, []);

      return (
        <div className="app">
          <div className="starry-night"></div>
          <h1>APK Center</h1>
          <div className="apk-sections">
            {apks.map((apk, index) => (
              <div key={index} className="apk-section">
                <h2>{apk.name}</h2>
                <img src={`/${apk.logo}`} alt={apk.name} />
                <p>{apk.desc}</p>
                <button onClick={() => window.open(apk.downloadLink, '_blank')}>Download</button>
              </div>
            ))}
          </div>
          <div className="footer">
            <p>&copy; 2024 AykhanUV</p>
          </div>
        </div>
      );
    }

    export default App;
