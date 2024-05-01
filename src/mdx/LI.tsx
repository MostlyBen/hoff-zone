import { useEffect, useState } from "react";

const ChecklistItem = ({ children }) => {
  const text = children.slice(3);
  const [isChecked, setIsChecked] = useState( children.startsWith("[x]"));

  useEffect(() => {
    const _checkedItems = JSON.parse(localStorage?.getItem("checkedItems") || "{}");
    if (!Object.keys(_checkedItems).includes(window.location.pathname)) {
      _checkedItems[window.location.pathname] = [];
      localStorage?.setItem("checkedItems", JSON.stringify(_checkedItems));
    }

    if (_checkedItems[window.location.pathname].includes(children.slice(3))) {
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
    
    <span>{text}</span>
  </li>)
}


const LI = ({ children }) => {

  let isChecklistItem = false;

  if (typeof children === 'string')  {
    isChecklistItem = children.startsWith("[ ]") || children.startsWith("[x]");
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