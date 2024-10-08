'use client'

import React, { useEffect, useState } from 'react';
import { Theme } from '../../interfaces/theme';
import Themes from '../../themes.json';
const ThemeList = Themes as Theme[];
import config from '../../theme-config.json';

const constructThemeStyles = (theme: Theme) => {
  return `
    :root {
      --black: ${theme.black};
      --secondary: ${theme.secondary};
      --error: ${theme.error};
      --primary: ${theme.primary};
      --tertiary: ${theme.tertiary};
      --white: ${theme.white};
      --foreground: ${theme.foreground};
      --background: ${theme.background};
      --highlight: ${theme.highlight};
      --theme-font: ${theme.font ?? "'CascadiaCode', monospace"}
    }
  `;
}

export interface ThemeContextType {
  setTheme: (name: string) => string;
  theme: Theme;
}

const ThemeContext = React.createContext<ThemeContextType>(null);

interface Props {
  children: React.ReactNode;
}

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, _setTheme] = useState<Theme>(ThemeList[0]);
  const [styles, setStyles] = useState<string>('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    setTheme(savedTheme || config.theme);
  }, []);

  const setTheme = (name: string) => {
    const index = Themes.findIndex(
      (colorScheme) => colorScheme.name.toLowerCase() === name,
    );

    if (index === -1) {
      return `Theme '${name}' not found. Try 'theme ls' to see the list of available themes.`;
    }

    _setTheme(ThemeList[index]);

    setStyles(constructThemeStyles(ThemeList[index]));

    const themeMeta = document.querySelector('meta[name="theme-color"]')
    if (themeMeta) { themeMeta.setAttribute('content', Themes[index].primary) }

    localStorage.setItem('theme', name);

    return `Theme ${Themes[index].name} set successfully!`;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <style>{styles}</style>
      {children}
    </ThemeContext.Provider>
  );
};
