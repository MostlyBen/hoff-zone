'use client'

// TODO: auto-detect links

import { JSX } from "react";
import { formatAsId } from "../utils";
import { useTheme } from "../utils/providers/themeProvider";

const Blockquote = ( { children }: JSX.IntrinsicElements["blockquote"] ) => {
  const { theme } = useTheme();

  return (
    <blockquote
      id={typeof children === 'string'
        ? 'blockquote-' + formatAsId(children)
        : Array.isArray(children)
          ? typeof children[0] === 'string' ? 'blockquote-' + formatAsId(children[0]) : 'blockquote'
          : 'blockquote'}
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