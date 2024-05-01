import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../utils/themeProvider';
import { Console } from '../console';
import { ThemeSwitcher } from '../input';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [consoleOpen, setConsoleOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [consoleOpen]);

  return (
    <div
      className={`min-w-max text-xs md:min-w-full md:text-base flex flex-row flex-col-sm`}
      style={{
        color: theme.foreground,
      }}
    >
      <div
        className={`p-2 console-container h-100p relative${consoleOpen ? '' : ' minimized'}`}
        style={{
          background: theme.background,
        }}
      >
        <Console inputRef={inputRef} />
        {consoleOpen
        ? <button
            className="absolute btn hide block-md"
            onClick={() => setConsoleOpen(false)}
            style={{bottom: '16px', right: '16px', borderColor: theme.cursorColor}}
          >/\</button>
        :<button
        className="absolute btn hide block-md"
        onClick={() => setConsoleOpen(true)}
        style={{bottom: '16px', right: '16px', borderColor: theme.cursorColor}}
      >\/</button>
        }
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
