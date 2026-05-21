import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { LandingPage } from './pages/LandingPage';
import { useThemeAssets } from './hooks/useThemeAssets';
import './styles/global.css';

function AppContent() {
  const { urfuLogo } = useThemeAssets();

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
        <ThemeToggle />
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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
