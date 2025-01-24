import React from 'react';

const NotFound = () => {
  return (
    <div className="app">
      <div className="header fade-in">
        <h1>404 - Page Not Found</h1>
      </div>
      <div className="content fade-in">
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="back-home-button">Go Back to Home</a>
      </div>
      <div className="footer fade-in">
        <p>&copy; 2024 AykhanUV</p>
      </div>
    </div>
  );
};

export default NotFound;
