'use client'

import { JSX, useEffect, useState, useMemo } from "react";
import { useStoredState } from "../hooks";
import formatAsId from "../utils/formatAsId";

const H3 = ( { children, style }: JSX.IntrinsicElements["h3"] ) => {
  const id = useMemo(() => {
    return (
      typeof children === 'string'
      ? 'h3-' + formatAsId(children)
      : Array.isArray(children)
        ? typeof children[0] === 'string' ? 'h1-' + formatAsId(children[0]) : 'h3'
        : 'h3'
    )
  }, [children]);

  const [collapsed, setCollapsed] = useStoredState(id, false);
  const [showToggle, setShowToggle] = useState(false);

  const updateShownElements = (e?: CustomEventInit) => {
    // Avoid for other h3s
    if (e?.detail?.headingLevel && e.detail.headingLevel == 3) { return }
    // Avoid if it's open (could already be open, or this would show next siblings when unrelated h1s/2s open)
    if (e?.detail?.headingLevel && !collapsed) { return }

    const mySection = document.getElementById(`${id}-content`)
    if (mySection) {
      if (collapsed) {
        mySection.classList.add("hidden");
      } else {
        mySection.classList.remove("hidden")
      }
    } else {
      const siblings = document.querySelectorAll<HTMLElement>(`#${id} ~ *`);
      for (const el of Array.from(siblings)) {
        if (['h1', 'h2', 'h3', 'hr'].includes(el.tagName.toLocaleLowerCase())) {
          break;
        }
        if (collapsed) {
          el.classList.add("hidden")
        } else {
          el.classList.remove("hidden")
        }
      }
    }

    if (!collapsed) {
      const toggleEvent = new CustomEvent("onAnyCollapseOpen", {detail: {headingLevel: 3}});
      document.dispatchEvent(toggleEvent);
    }
  }

  useEffect(() => {
    updateShownElements();
    document.addEventListener("onAnyCollapseOpen", updateShownElements);
    return () => document.removeEventListener("onAnyCollapseOpen", updateShownElements);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed, id])

  const handleClickExpand = () => {
    setCollapsed(collapsed ? null : true);
  }
  
  return (
      <h3
        id={id}
        style={typeof style === 'object'
          ? {...style, textIndent: '-1.05em'}
          : {textIndent: '-1.05em'}
        }
        className="relative"
        onPointerEnter={() => setShowToggle(true)}
        onPointerLeave={() => setShowToggle(false)}
      >
        <button
        className="remove-btn-styling"
        onClick={handleClickExpand}
        style={{
          position: 'absolute',
          top: '0',
          left: '-1.26em',
          display: (showToggle || collapsed) ? null : 'none'
        }}
      >
        <span className="material-icons" style={{lineHeight: 1.2}}>
          {collapsed ? 'chevron_right' : 'expand_more'}
        </span>
      </button>
        <div style={{display: 'inline-block', width: '1.75em'}}/>
        {children}
      </h3>
  )
}

export default H3;