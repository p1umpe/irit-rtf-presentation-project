import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { ProcessingPage } from './pages/ProcessingPage';
import urfuLogo from './images/urfu-logo.png';
import './styles/global.css';
    
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleStartProcessing = (file) => {
    setSelectedFile(file);
    setCurrentPage('processing');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setSelectedFile(null);
  };

  const handleHistoryClick = () => {
    console.log('История загрузок');
  };

  const handleLogoClick = () => {
    setCurrentPage('landing');
    setSelectedFile(null);
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
        {currentPage === 'landing' && (
          <LandingPage
            onStartProcessing={handleStartProcessing}
            onHistoryClick={handleHistoryClick}
          />
        )}
        {currentPage === 'processing' && (
          <ProcessingPage onBack={handleBackToLanding} />
        )}
      </main>
      <footer className="app-footer">
        <p>ИРИТ-РТФ • Кодовое Убежище • 2026</p>
      </footer>
    </div>
  );
}

export default App;