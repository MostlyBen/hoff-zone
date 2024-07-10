import { JSX } from "react";
import A from "./A";

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
    const parts = children
                  .replaceAll(/https?:.*(?=\s|$)/g, (m) => {return `$$LINK$$${m}`})
                  .split(/(#\S+)/g)
    return (
      <p style={style}>
        {parts.map((part, index) => {
          if (part.match(/#\S+/)) {
            return <Tag key={index}>{part}</Tag>
          }
          if (part.startsWith('$$LINK$$')) {
            let link = part.split('$$LINK$$')[1]
            let text = link;
            // Truncate long links
            if (text.length > 50) {
              text = text.substring(0, 25) + '...' + text.substring(text.length - 25, link.length);
            }
            return <A href={link} target="_blank" key={Math.random()}>{text}</A>
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