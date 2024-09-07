'use client'

import { useTheme } from "../utils/providers/themeProvider";

const HR = ({ style }: JSX.IntrinsicElements["hr"]) => {
  const { theme } = useTheme();

  return (
    <hr
      style={
        typeof style === 'object'
          ? {
            border: `1px solid ${theme.primary}`,
            ...style
          }
          : { border: `1px solid ${theme.primary}` }}
    />
  );
}

export default HR;
