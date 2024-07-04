import { JSX } from "react";

const H4 = ( { children, style }: JSX.IntrinsicElements["h4"] ) => {

  return (
    <h4
      id={typeof children === 'string'
          ? children.replace(/\s+/g, '-').toLowerCase()
          : `h3-${Math.floor(1000 * Math.random())}`}
          style={style}
    >{children}</h4>
  )
}

export default H4;