import { JSX } from "react";

// TODO: audo-detect links

const Tag = ( { children }: JSX.IntrinsicElements["p"] ) => {
  return (
    <span
      className="tag"
    >
      <span>{children}</span>
    </span>
  )
}

const P = ( { children, style }: JSX.IntrinsicElements["p"] ) => {

  if (typeof children === 'string') {
    const parts = children.split(/(#\S+)/g)
    return (
      <p style={style}>
        {parts.map((part, index) => {
          if (part.match(/#\S+/)) {
            return <Tag key={index}>{part}</Tag>
          }
          return part
        })}
      </p>
    )
  }

  return (
    <p>{children}</p>
  )
}

export default P;