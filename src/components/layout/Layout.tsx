import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../utils/themeProvider';
import { Console } from '../console';
import { ThemeSwitcher } from '../input';
import { default as Lofi } from './Lofi';

interface Props {
  children: React.ReactNode;
  frontmatter?: object;
}

const Layout: React.FC<Props> = ({ children, frontmatter }) => {
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [lofiOpen, setLofiOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    document.addEventListener('onLofiOpen', () => setLofiOpen(true));
    return () => document.removeEventListener('onLofiOpen', () => setLofiOpen(false));
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [consoleOpen]);

  return (
    <div
      className={`min-w-max text-xs md:min-w-full md:text-base flex flex-row flex-col-sm bg-cover`}
      style={{
        color: theme.foreground,
        background: theme.background,
      }}
    >
      <div
        className={`p-2 console-container h-100p relative${consoleOpen ? '' : ' minimized'}`}
        style={{
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
        className="main-container pt-8 px-4 flex-grow relative"
        style={{paddingBottom: "300px"}}
      >
        {frontmatter
        ? Object.keys(frontmatter).length
          ? <div>page data (better view coming soon): {JSON.stringify(frontmatter)}</div>
          : <></>
        : <></>}
        {children}
      </main>
      {lofiOpen && <Lofi onClose={() => setLofiOpen(false)} />}
      <ThemeSwitcher />
    </div>
  );
};

export default Layout;
