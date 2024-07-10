'use client'

import { useState, useRef, useEffect, ReactNode } from 'react';
import { useTheme } from '../../utils/providers/themeProvider';
import { Console } from '../console';
import { ThemeSwitcher } from '../input';
import { default as Lofi } from './Lofi';
import { Frontmatter } from '../layout';

interface Props {
  // Literally so annoyed that I can't figure out what the heck these children are
  // The whole mess at the start of this file is a result of that
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  frontmatter?: object;
}

const Layout: React.FC<Props> = ({ children, frontmatter }) => {
  // Why do I have to do children.type()? Idk. Idek what children.type is
  const [consoleOpen, setConsoleOpen] = useState(false);
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
        className="main-container flex-grow relative"
      >
        {frontmatter
        ? Object.keys(frontmatter).length
          ? <Frontmatter pageData={frontmatter} />
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
