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

  return (<li>
    <button
      className="inline-block"
      style={{padding: 0, border: 'none'}}
      onClick={() => handleChecked(!isChecked)}
    >
      {isChecked
        ? <span>[<span style={{color: "var(--blue)"}}>x</span>]</span>
        : "[ ]"
      }
    </button>
    
    <span>{
      typeof children == 'string'
      ? children.slice(3)
      : children.map((child, index) => {
          return (index === 0) ? ' ' : child
        })
    }</span>
  </li>)
}


const LI = ({ children }) => {
  let isChecklistItem = false;

  if (typeof children === 'string')  {
    isChecklistItem = children.startsWith("[ ]") || children.startsWith("[x]");
  }
  if (Array.isArray(children)) {
    isChecklistItem = children[0].startsWith("[ ]") || children[0].startsWith("[x]");
  }

  if (isChecklistItem) {
    return <ChecklistItem>{children}</ChecklistItem>
  }

  return (
    <li
      className="bullet-list-item"
    >{children}</li>
  )
}

export default LI