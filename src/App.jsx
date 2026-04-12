import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { LandingPage } from './pages/LandingPage';
import { ProcessingPage } from './pages/ProcessingPage';
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
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <div 
            className="logo" 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          >
            IRIT-STYLE
          </div>
          <div className="header-title">
            Автоматическое приведение презентаций к фирменному шаблону ИРИТ-РТФ
          </div>
          <ThemeToggle />
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
    </ThemeProvider>
  );
}

export default App;