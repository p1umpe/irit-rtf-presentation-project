import React from 'react';
import { LandingPage } from './pages/LandingPage';
import urfuLogo from './images/urfu-logo.png';
import './styles/global.css';
    
function App() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button
          type="button"
          className="header-brand"
          onClick={handleLogoClick}
          aria-label="Презентации — на главную"
        >
          <span className="header-brand-title">Презентации</span>
          <img src={urfuLogo} alt="" className="header-brand-logo" />
        </button>
      </header>
      <main className="app-main">
        <LandingPage />
      </main>
      <footer className="app-footer">
        <p>ИРИТ-РТФ • Кодовое Убежище • 2026</p>
      </footer>
    </div>
  );
}

export default App;