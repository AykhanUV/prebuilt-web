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
          document.querySelector('.starry-night').appendChild(star);
        };

        for (let i = 0; i < 50; i++) {
          createStar('small');
        }
        for (let i = 0; i < 30; i++) {
          createStar('medium');
        }
        for (let i = 0; i < 20; i++) {
          createStar('large');
        }
      }, []);

      return (
        <div className="app">
          <div className="starry-night"></div>
          {apks.map((apk, index) => (
            <div key={index} className="apk-section">
              <img src={`/${apk.logo}`} alt={apk.name} />
              <h2>{apk.name}</h2>
              <p>{apk.desc}</p>
              <button onClick={() => window.open(apk.downloadLink, '_blank')}>Download</button>
            </div>
          ))}
        </div>
      );
    }

    export default App;
