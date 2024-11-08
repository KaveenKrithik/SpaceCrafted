import React from 'react';
import Footer from './Footer';
import './MainPage.css';

function MainPage() {
  const handleGetStarted = () => {
    window.location.href = '/form';
  };

  return (
    <div className="main-container">
      <h1 className="title">SpaceCrafted</h1>
      <p className="description">We bring your dream interior design to life with personalized ideas tailored just for you.</p>
      <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
      <Footer />
    </div>
  );
}

export default MainPage;
