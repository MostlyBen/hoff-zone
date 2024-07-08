import { JSX } from "react";
import formatAsId from "../utils/formatAsId";

const H4 = ( { children, style }: JSX.IntrinsicElements["h4"] ) => {

  return (
    <h4
      id={typeof children === 'string'
        ? 'h4-' + formatAsId(children)
        : Array.isArray(children)
          ? typeof children[0] === 'string' ? 'h4-' + formatAsId(children[0]) : 'h4'
          : 'h4'}
          style={style}
    >{children}</h4>
  )
}

export default H4;
