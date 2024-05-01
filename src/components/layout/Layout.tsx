import React from 'react';
import { useTheme } from '../../utils/themeProvider';
import { Console } from '../console';
import { ThemeSwitcher } from '../input';


interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  return (
    <div
      className="min-w-max text-xs md:min-w-full md:text-base flex flex-row"
      style={{
        color: theme.foreground,
      }}
    >
      <div
        className="p-2 console-container relative"
        style={{
          background: theme.background,
        }}
      >
        <Console inputRef={inputRef} />
      </div>

      <main
        className="main-container py-8 px-4 flex-grow relative"
        style={{
          background: theme.background,
        }}
        >
        {children}
      </main>
      <ThemeSwitcher />
    </div>
  );
};

export default Layout;
