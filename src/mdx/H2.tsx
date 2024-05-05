import { JSX } from "react";

const H2 = ( { children }: JSX.IntrinsicElements["h2"] ) => {

  return (
    <h2
      id={typeof children === 'string'
          ? children.replace(/\s+/g, '-').toLowerCase()
          : `h2-${Math.floor(1000 * Math.random())}`}
    >{children}</h2>
  )
}

export default H2;