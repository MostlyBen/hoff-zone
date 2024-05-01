import React, { useEffect, useState } from 'react';
import Themes from '../../themes.json';
import { Theme } from '../interfaces/theme';
import config from '../../config.json';

const constructThemeStyles = (theme: Theme) => {
  return `
    :root {
      --black: ${theme.black};
      --blue: ${theme.blue};
      --red: ${theme.red};
      --yellow: ${theme.yellow};
      --green: ${theme.green};
      --cyan: ${theme.cyan};
      --white: ${theme.white};
      --brightBlack: ${theme.brightBlack};
      --brightRed: ${theme.brightRed};
      --brightGreen: ${theme.brightGreen};
      --brightYellow: ${theme.brightYellow};
      --brightBlue: ${theme.brightBlue};
      --brightPurple: ${theme.brightPurple};
      --brightCyan: ${theme.brightCyan};
      --brightWhite: ${theme.brightWhite};
      --foreground: ${theme.foreground};
      --background: ${theme.background};
      --cursorColor: ${theme.cursorColor};
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
  const [theme, _setTheme] = useState<Theme>(Themes[0]);
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

    _setTheme(Themes[index]);

    setStyles( constructThemeStyles(Themes[index]) );

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
