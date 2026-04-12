import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const SunIcon = () => <span role="img" aria-label="light">☀️</span>;
const MoonIcon = () => <span role="img" aria-label="dark">🌙</span>;

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      <span>{theme === 'light' ? 'Темная' : 'Светлая'}</span>
    </button>
  );
};