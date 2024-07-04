import { JSX } from "react";

const Tag = ( { children }: JSX.IntrinsicElements["p"] ) => {
  return (
    <span
      className="tag"
    >
      <span>{children}</span>
    </span>
  )
}

const P = ( { children }: JSX.IntrinsicElements["p"] ) => {

  if (typeof children === 'string') {
    const parts = children.split(/(#\S+)/g)
    return (
      <p>
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