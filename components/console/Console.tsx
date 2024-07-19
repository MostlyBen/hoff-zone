import React, { useState } from 'react';
import { History, Input } from './';
import { ShellProvider, useShell } from '../../utils/providers/shellProvider';
import { usePathname } from 'next/navigation';
import { Journal } from "../journal";
import { useTheme } from '../../utils/providers/themeProvider';
import config from '../../theme-config.json';

interface ConsoleProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const Console: React.FC<ConsoleProps> = ({ inputRef }) => {
  const { history } = useShell();
  const { theme } = useTheme();

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current?.scrollIntoView();
  }, [history, inputRef]);

  const focusInput = () => {
    inputRef.current?.focus();
  }

  return (
    <>
      <div
        className="overflow-hidden h-full rounded console-content"
        onClick={focusInput}
        style={{
          borderColor: theme.primary,
          padding: config.border ? 18 : 8,
          borderWidth: config.border ? 2 : 0,
        }}
      >
        <div ref={containerRef} className="overflow-y-auto fix-console-sm h-full">
          <History history={history} />

          <Input inputRef={inputRef} containerRef={containerRef} />
        </div>
      </div>
    </>
  );
};

const ConsoleWithProvider: React.FC<ConsoleProps> = ({ inputRef }) => {
  const pathname = usePathname();
  const [showJournal, setShowJournal] = useState<boolean>(false);

  React.useEffect(() => {
    document.addEventListener('onShowJournal', () => setShowJournal(true))
    return () => document.removeEventListener('onShowJournal', () => setShowJournal(true))
  }, [])

  React.useEffect(() => {
    setShowJournal(false);
    if (pathname.startsWith('/sci') && !localStorage.getItem('avoidJournalAutoOpen')) {
      setShowJournal(true);
    }
  }, [pathname])

  return (
    <ShellProvider>
      {showJournal
        ? <Journal journalId={pathname} onClose={() => setShowJournal(false)} />
        : <Console inputRef={inputRef} />
      }
    </ShellProvider>
  )

}

export default ConsoleWithProvider;
