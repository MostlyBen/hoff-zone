import { JSX, useState } from "react";

const H1 = ( { children, style }: JSX.IntrinsicElements["h1"] ) => {
  const [glitch, setGlitch] = useState(false);

  return (
    <h1
      id={typeof children === 'string'
          ? children.replace(/\s+/g, '-').toLowerCase()
          : `h1-${Math.floor(1000 * Math.random())}`}

      className={glitch ? 'glitch' : ''}
      onPointerOver={() => setGlitch(true)}
      onPointerOut={() => setGlitch(false)}
      style={style}
    >{children}</h1>
  )
}

export default H1;