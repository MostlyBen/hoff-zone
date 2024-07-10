'use client'

// TODO: add types
// TODO: auto-detect links

import { useEffect, useState } from "react";

const getChildText = (children) => {
  // Return text if that's all it is
  if (typeof children === 'string') return children;
  // If it's an array, loop through the children
  if (Array.isArray(children)) {
    let text = '';
    for (const i in children) {
      // Add each child text, if that's what it is
      if (typeof children[i] === 'string' ) {
        text += children[i];
      } else {
        // If it's not a string, use recursion to get the text
        text += getChildText(children[i]);
      }
    }
    // Return the text when the loop is done
    return text;
  }
  // If it was not a string or array, it should be a component
  if (typeof children === 'object') {
    // Use recursion to get the text from the component
    return getChildText(children.props?.children)
  }
}

const ChecklistItem = ({ children }) => {
  const [isChecked, setIsChecked]
    = useState(
        Array.isArray(children)
        ? children[0].startsWith("[x]")
        : children.startsWith("[x]")
      );

  const [text, setText] = useState('');
  
  
  useEffect(() => {
    let _text = '';
    if (typeof children == 'string') _text = children.slice(3);
    if (Array.isArray(children)) {
      _text = getChildText(children).slice(4);
    }
    setText(_text);

    const _checkedItems = JSON.parse(localStorage?.getItem("checkedItems") || "{}");
    if (!Object.keys(_checkedItems).includes(window.location.pathname)) {
      _checkedItems[window.location.pathname] = [];
      localStorage?.setItem("checkedItems", JSON.stringify(_checkedItems));
    }

    if (_checkedItems[window.location.pathname].includes(_text)) {
      setIsChecked(true);
    }
  }, [children])

  const handleChecked = (checked) => {
    const _checkedItems = JSON.parse(localStorage?.getItem("checkedItems") || "{}");

    _checkedItems[window.location.pathname] = _checkedItems[window.location.pathname].filter(item => item !== text);
    if (checked) {
      _checkedItems[window.location.pathname].push(text);
    }

    localStorage?.setItem("checkedItems", JSON.stringify(_checkedItems));
    setIsChecked(checked);
  }

  return (<li style={{margin: "0.5rem 0"}}>
    <button
      className="inline-block"
      style={{padding: 0, border: 'none'}}
      onClick={() => handleChecked(!isChecked)}
    >
      {isChecked
        ? <span className="todo-check">[<span className="todo-check" style={{color: "var(--blue)"}}>x</span>]</span>
        : <span className="todo-check">[ ]</span>
      }
    </button>
    
    <span>{
      typeof children == 'string'
      ? children.slice(3)
      : children.map((child, index) => {
          return (index === 0)
          ? child.length > 4 ? child.slice(3) : ' '
          : child
        })
    }</span>
  </li>)
}


const LI = ({ children, style }: JSX.IntrinsicElements["li"]) => {
  let isChecklistItem = false;

  if (typeof children === 'string')  {
    isChecklistItem = children.startsWith("[ ]") || children.startsWith("[x]");
  }
  if (Array.isArray(children)) {
    isChecklistItem = getChildText(children).startsWith("[ ]") || getChildText(children).startsWith("[x]");
  }

  if (isChecklistItem) {
    return <ChecklistItem>{children}</ChecklistItem>
  }

  return (
    <li
      className="bullet-list-item list-decimal"
      style={
        typeof style === 'object'
        ? {margin: "0.5rem 0", ...style}
        : {margin: "0.5rem 0"}}
    >{children}</li>
  )
}

export default LI