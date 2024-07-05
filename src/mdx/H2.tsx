import { JSX, useEffect, useState, useMemo } from "react";
import { useStoredState } from "../hooks";

const H2 = ( { children, style }: JSX.IntrinsicElements["h2"] ) => {
  const id = useMemo(() => {
    return (
      typeof children === 'string'
      ? 'h2-' + children.replace(/[ .|?&#:[\]~>+]+/g, '-').toLowerCase()
      : `h2-${Math.floor(1000 * Math.random())}`
    )
  }, [children]);

  const [collapsed, setCollapsed] = useStoredState(id, false);
  const [showToggle, setShowToggle] = useState(false);

  const updateShownElements = (e?: CustomEventInit) => {
    // Avoid for other h2s or h3s
    if (e?.detail?.headingLevel && e.detail.headingLevel != 1) { return }
    // Avoid if it's open (could already be open, or this would show next siblings when unrelated h1s open)
    if (e?.detail?.headingLevel && !collapsed) { return }

    const siblings = document.querySelectorAll<HTMLElement>(`#${id} ~ *`);
    
    for (const el of Array.from(siblings)) {
      if (['h1', 'h2', 'hr'].includes(el.tagName.toLowerCase())) {
        break;
      }
      
      if (collapsed) {
        el.classList.add("hidden");
      } else {
        el.classList.remove("hidden");
      }
    }

    if (!collapsed) {
      const toggleEvent = new CustomEvent("onAnyCollapseOpen", {detail: {headingLevel: 2}});
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
      <h2
        id={id}
        style={typeof style === 'object'
          ? {...style, textIndent: '-0.8em'}
          : {textIndent: '-0.8em'}
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
          left: '-1em',
          display: (showToggle || collapsed) ? null : 'none'
        }}
      >
        <span className="material-icons" style={{lineHeight: 1.2}}>
          {collapsed ? 'chevron_right' : 'expand_more'}
        </span>
      </button>
        <div style={{display: 'inline-block', width: '1.75em'}}/>
        {children}
      </h2>
  )
}

export default H2;
