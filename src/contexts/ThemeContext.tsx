
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Inicializa com o tema salvo ou o tema do sistema
  const [theme, setTheme] = useState<Theme>(() => {
    // Verifica se está no ambiente do navegador
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('agendai_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      // Usa preferência do sistema como fallback
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    // Default para SSR
    return 'light';
  });

  // Atualiza o DOM quando o tema muda
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('agendai_theme', theme);
  }, [theme]);

  // Função para alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
