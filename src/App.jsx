import React, { useEffect } from 'react';

    const apks = [
      { logo: 'logo1.png', desc: 'Description for APK 1', downloadLink: 'link1' },
      { logo: 'logo2.png', desc: 'Description for APK 2', downloadLink: 'link2' },
      { logo: 'logo3.png', desc: 'Description for APK 3', downloadLink: 'link3' },
      { logo: 'logo4.png', desc: 'Description for APK 4', downloadLink: 'link4' },
      { logo: 'logo5.png', desc: 'Description for APK 5', downloadLink: 'link5' },
      { logo: 'logo6.png', desc: 'Description for APK 6', downloadLink: 'link6' },
      { logo: 'logo7.png', desc: 'Description for APK 7', downloadLink: 'link7' },
      { logo: 'logo8.png', desc: 'Description for APK 8', downloadLink: 'link8' },
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
              <img src={apk.logo} alt={`APK ${index + 1}`} />
              <p>{apk.desc}</p>
              <button onClick={() => window.open(apk.downloadLink, '_blank')}>Download</button>
            </div>
          ))}
        </div>
      );
    }

    export default App;
