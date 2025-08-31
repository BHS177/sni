import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export function useTheme() {
  const [theme, setTheme] = useState<Theme['mode']>(
    (localStorage.getItem('theme') as Theme['mode']) ?? 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}