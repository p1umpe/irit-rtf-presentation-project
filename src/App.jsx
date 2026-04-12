import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { ProcessingPage } from './pages/ProcessingPage';
import './styles/global.css';

function MainPage({ onStartProcessing }) {
  return (
    <div className="main-page-container">
      <button className="processing-start-button" onClick={onStartProcessing}>
        Начать обработку презентации
      </button>
    </div>
  );
}
    
function App() {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>ИРИТ-РТФ Презентации</h1>
          <ThemeToggle />
        </header>
        <main className="app-main">
          {!isProcessing ? (
            <MainPage onStartProcessing={() => setIsProcessing(true)} />
          ) : (
            <ProcessingPage onBack={() => setIsProcessing(false)} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;