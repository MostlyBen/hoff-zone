'use client'

import { useTheme } from "../utils/themeProvider";

const HR = ({ style }: JSX.IntrinsicElements["hr"]) => {
  const { theme } = useTheme();

  return (
    <hr
      style={
        typeof style === 'object'
        ? {
            border: `1px solid ${theme.yellow}`,
            ...style
          } 
        : { border: `1px solid ${theme.yellow}` }}
    />
  );
}

export default HR;