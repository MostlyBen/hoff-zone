import { JSX } from "react";
import Link from "next/link";
import { useTheme } from "../utils/themeProvider";

const Anchor = ( props: JSX.IntrinsicElements["a"]) => {
  const { theme } = useTheme();

    return (
      <Link href={props.href} replace>
        {props.children}
        {!props.href?.startsWith('/') &&
          <span
            className="material-icons"
            style={{
              fontSize: 'inherit',
              paddingLeft: '0.125rem',
              color: theme.blue,
              transform: 'scale(0.8) translateY(-0.1rem)'
            }}
          >open_in_new</span>
        }
      </Link>
    )
}

export default Anchor;