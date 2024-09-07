'use client'

import { JSX } from "react";
import Link from "next/link";
import { useTheme } from "../utils/providers/themeProvider";

const Anchor = (props: JSX.IntrinsicElements["a"]) => {
  const { theme } = useTheme();
  const internal = props.href?.startsWith('/') || props.href?.startsWith('#');

  return (
    <Link href={props.href} replace target={internal ? '' : '_blank'}>
      {props.children}
      {!internal &&
        <span
          className="material-icons"
          style={{
            fontSize: 'inherit',
            paddingLeft: '0.125rem',
            color: theme.secondary,
            transform: 'scale(0.8) translateY(-0.1rem)'
          }}
        >open_in_new</span>
      }
    </Link>
  )
}

export default Anchor;
