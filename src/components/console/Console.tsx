import Head from 'next/head';
import React from 'react';
import { History } from '../history';
import { Input } from '../input';
import { useShell } from '../../utils/shellProvider';
import { useTheme } from '../../utils/themeProvider';
import config from '../../../config.json';

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
      <Head>
        <title>Hoff Zone</title>
      </Head>

      <div
        className="overflow-hidden h-full rounded"
        onClick={focusInput}
        style={{
          borderColor: theme.yellow,
          padding: config.border ? 16 : 8,
          borderWidth: config.border ? 2 : 0,
        }}
      >
        <div ref={containerRef} className="overflow-y-auto h-full">
          <History history={history} />

          <Input inputRef={inputRef} containerRef={containerRef} />
        </div>
      </div>
    </>
  );
};

export default Console;
