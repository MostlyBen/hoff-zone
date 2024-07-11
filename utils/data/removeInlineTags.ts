// TODO: match any tags, not just editable

import { ReactNode, ReactElement } from "react"

const removeInlineTags = (children:
  string | ReactNode | ReactElement
) => {
  if (typeof children === 'string') {
    return children.split('^')[0];
  }

  if (!Array.isArray(children)) {
    return children;
  }

  const lastChild = children[children.length - 1]
  if (typeof lastChild === 'string') {
    children[children.length - 1] = lastChild.split('^')[0];
  }

  return children
}

export default removeInlineTags;
