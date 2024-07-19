import { useEffect, useState } from 'react';
import { useTheme } from '../../utils/providers/themeProvider';

import Themes from '../../themes.json';
const themeNames = Themes.map((theme) => theme.name);

const ThemeButton = ({ themeName, onClick }) => {
  return (
    <button
      onClick={() => onClick(themeName)}
      style={{
        padding: '12px',
        border: 'none',
        position: 'relative',
        zIndex: 1000,
      }}
    >{themeName}</button>
  )
}
  

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [showThemes, setShowThemes] = useState(false);

  useEffect(() => {
    const checkShouldClose = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id !== 'theme-button') {
        setShowThemes(false);
      }
    }
    document.addEventListener('click', checkShouldClose);
    return () => document.removeEventListener('click', checkShouldClose);
  }, [])

  const handleSetTheme = async (t: string) => {
    setTheme(t.toLowerCase());
    setShowThemes(false);
  }

  return (<>
    <div
      style={{
        position: 'absolute',
        display: showThemes ? 'flex' : 'none',
        right: '12px',
        bottom: '12px',
        flexDirection: 'column',
        background: theme.background,
        maxHeight: '420px',
        overflowY: 'auto',
        border: `1px solid ${theme.primary}`,
        color: theme.primary,
        zIndex: 1000,
      }}
    >
      {themeNames.map((themeName) => (
        <ThemeButton key={themeName} themeName={themeName} onClick={handleSetTheme} />
      ))}
    </div>

    <div
      style={{
        position: 'absolute',
        right: '24px',
        bottom: '24px',
      }}
      >

      <button
        id="theme-button"
        style={{
          padding: '12px',
          border: `1px solid ${theme.primary}`,
          color: theme.primary,
          background: theme.background,
          zIndex: 1,
          position: 'relative',
        }}
        onClick={() => setShowThemes(!showThemes)}
      >{theme.name}</button>
    </div>
    </>)
}

export default ThemeSwitcher
