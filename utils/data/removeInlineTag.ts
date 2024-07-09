import { ReactNode, ReactElement, ReactFragment, PromiseLikeOfReactNode } from "react"

const removeInlineTag = (children:
  string | ReactNode | ReactElement | ReactFragment | PromiseLikeOfReactNode
) => {
  if (typeof children === 'string') {
    return children.replace('^regenerate', '')
  }

  if (!Array.isArray(children)) {
    return children
  }

  const lastChild = children[children.length - 1]
  if (typeof lastChild === 'string') {
    children[children.length - 1] = lastChild.split('^')[0]
  }

  return children
}

export default removeInlineTag;