import { JSX } from "react";
import { useTheme } from "../utils/themeProvider";

const Blockquote = ( { children }: JSX.IntrinsicElements["blockquote"] ) => {
  const { theme } = useTheme();

  return (
    <blockquote
      id={typeof children === 'string'
          ? children.replace(/\s+/g, '-').toLowerCase()
          : `h2-${Math.floor(1000 * Math.random())}`}
      style={{
        borderLeft: `2px solid ${theme.yellow}`,
        padding: '0.5em 0.5em 0.5em 1em',
        background: theme.foreground + '15',
        color: theme.foreground,
      }}
    >{children}</blockquote>
  )
}

export default Blockquote;