import { JSX } from "react";

const H3 = ( { children, style }: JSX.IntrinsicElements["h3"] ) => {

  return (
    <h3
      id={typeof children === 'string'
          ? children.replace(/\s+/g, '-').toLowerCase()
          : `h3-${Math.floor(1000 * Math.random())}`}
      style={style}
    >{children}</h3>
  )
}

export default H3;