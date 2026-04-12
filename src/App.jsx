import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}>
        <header style={{ 
          padding: '1rem', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <h1>ИРИТ-РТФ Презентации</h1>
          <ThemeToggle />
        </header>
        <main>
          {/* Здесь будет контент */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;