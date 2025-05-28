import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
      
      const newColumns = Math.floor(width / fontSize);
      if (newColumns !== columns) {
        columns = newColumns;
        drops.length = 0;
        for (let x = 0; x < columns; x++) {
          drops[x] = Math.floor(Math.random() * (canvas.height / fontSize));
        }
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

  return <canvas ref={canvasRef} id="matrix-background" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100vw', height: '100vh' }} />;
};

export default MatrixBackground;