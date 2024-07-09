'use client'

import { JSX, useEffect, useState, useMemo } from "react";
import { useStoredState } from "../hooks";
import { formatAsId } from "../utils";

const H1 = ( { children, style }: JSX.IntrinsicElements["h1"] ) => {
  const id = useMemo(() => {
    return (
      typeof children === 'string'
      ? 'h1-' + formatAsId(children)
      : Array.isArray(children)
        ? typeof children[0] === 'string' ? 'h1-' + formatAsId(children[0]) : 'h1'
        : 'h1'
    )
  }, [children]);

  const [collapsed, setCollapsed] = useStoredState(id, false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    const siblings = document.querySelectorAll<HTMLElement>(`#${id} ~ *`);
    for (const el of Array.from(siblings)) {
      if (['h1', 'hr'].includes(el.tagName.toLocaleLowerCase())) {
        break;
      }
      if (collapsed) {
        el.classList.add("hidden")
      } else {
        el.classList.remove("hidden")
      }
    }
  
    if (!collapsed) {
      const toggleEvent = new CustomEvent("onAnyCollapseOpen", {detail: {headingLevel: 1}});
      document.dispatchEvent(toggleEvent);
    }
  }, [collapsed, id])

  const handleClickExpand = () => {
    setCollapsed(collapsed ? null : true);
  }
  
  return (
      <h1
        id={id}
        style={typeof style === 'object'
          ? {...style, textIndent: '-0.6em'}
          : {textIndent: '-0.6em'}
        }
        className="relative"
      >
        <button
        className="remove-btn-styling"
        onClick={handleClickExpand}
        style={{
          position: 'absolute',
          top: '0',
          left: '-0.75em',
          display: (showToggle || collapsed) ? null : 'none'
        }}
      >
        <span className="material-icons" style={{lineHeight: 1.2}}>
          {collapsed ? 'chevron_right' : 'expand_more'}
        </span>
      </button>
        <div style={{display: 'inline-block', width: '1.75em'}}/>
        {children}
      </h1>
  )
}

export default H1;
