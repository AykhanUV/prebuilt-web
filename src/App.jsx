import React, { useEffect } from 'react';

    const apks = [
      { name: 'Afnify', logo: 'afnify.png', desc: 'Description for Afnify', downloadLink: 'link1' },
      { name: 'AfnMusic', logo: 'afnmusic.png', desc: 'Description for AfnMusic', downloadLink: 'link2' },
      { name: 'MicroG', logo: 'microg.png', desc: 'Description for MicroG', downloadLink: 'link3' },
      { name: 'AfnPlayer', logo: 'afnplayer.png', desc: 'Description for AfnPlayer', downloadLink: 'link4' },
      { name: 'Symphony', logo: 'symphony.png', desc: 'Description for Symphony', downloadLink: 'link5' },
      { name: 'Photomath', logo: 'photomath.png', desc: 'Description for Photomath', downloadLink: 'link6' },
      { name: 'Spotify', logo: 'spotify.png', desc: 'Description for Spotify', downloadLink: 'link7' },
      { name: 'YT-Extended', logo: 'yt-extended.png', desc: 'Description for YT-Extended', downloadLink: 'link8' },
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
