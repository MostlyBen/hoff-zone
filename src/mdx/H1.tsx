import { JSX, useState } from "react";

const H1 = ( { children }: JSX.IntrinsicElements["h1"] ) => {
  const [glitch, setGlitch] = useState(false);

  return (
    <h1
      onPointerOver={() => setGlitch(true)}
      onPointerOut={() => setGlitch(false)}
      className={glitch ? 'glitch' : ''}
    >{children}</h1>
  )
}

export default H1;