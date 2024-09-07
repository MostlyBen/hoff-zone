import React, { useEffect, useState } from 'react';
import { useTheme } from '../../utils/providers/themeProvider';

const Ps1 = () => {
  const [hostname, setHostname] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  return (
    <div
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '172px',
      }}>
      <span
        style={{
          color: theme.primary,
        }}
      >
        guest
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        @
      </span>
      <span
        style={{
          color: theme.tertiary,
        }}
      >
        {hostname}
      </span>
      <span
        style={{
          color: theme.foreground,
        }}
      >
        :$ ~
      </span>
    </div>
  );
};

export default Ps1;
