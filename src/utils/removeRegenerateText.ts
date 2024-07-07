const removeRegenerateText = (children) => {
  if (typeof children === 'string') {
    return children.replace('^regenerate', '')
  }
  if (!Array.isArray(children)) {
    return children
  }
  const lastChild = children[children.length - 1]
  if (typeof lastChild === 'string') {
    children[children.length - 1] = lastChild.replace('^regenerate', '')
  }
  return children
}

export default removeRegenerateText;