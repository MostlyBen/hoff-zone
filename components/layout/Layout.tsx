'use client'

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../utils/providers/themeProvider';
import { Console } from '../console';
import { BottomButtons } from '../input';
import { default as Lofi } from './Lofi';
import { useStoredState } from 'hooks';
import todoBorderStyle from './todoBorderStyle';
console.log("BottomButtons:", BottomButtons)
interface Props {
  // Literally so annoyed that I can't figure out what type these children are
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [consoleOpen, setConsoleOpen] = useState<boolean>(false);
  const [lofiOpen, setLofiOpen] = useState<boolean>(false);
  const [showTodoBorders, setShowTodoBorders] = useStoredState('showTodoBorders', false, false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    document.addEventListener('onLofiOpen', () => setLofiOpen(true));
    document.addEventListener('onShowTodoBorders', () => { setShowTodoBorders(true) });
    document.addEventListener('onHideTodoBorders', () => { setShowTodoBorders(false) });

    return () => {
      document.removeEventListener('onLofiOpen', () => setLofiOpen(false));
      document.removeEventListener('onShowTodoBorders', () => { setShowTodoBorders(true) });
      document.removeEventListener('onHideTodoBorders', () => { setShowTodoBorders(false) });
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [consoleOpen]);

  return (<>
    {showTodoBorders && <style>{todoBorderStyle}</style>}
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
            style={{bottom: '16px', right: '16px', borderColor: theme.highlight}}
          >/\</button>
        :<button
        className="absolute btn hide block-md"
        onClick={() => setConsoleOpen(true)}
        style={{bottom: '16px', right: '16px', borderColor: theme.highlight}}
      >\/</button>
        }
      </div>

      <main
        className="main-container flex-grow relative"
      >
        {children}
      </main>

      {lofiOpen && <Lofi onClose={() => setLofiOpen(false)} />}

      <BottomButtons />
    </div>
    </>);
};

export default Layout;
