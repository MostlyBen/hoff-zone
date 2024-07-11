'use client'

import { useEffect, useState } from "react";
import { useStoredState } from "../hooks";
const indentAdjust = {
  1: '-0.6em',
  2: '-0.8em',
  3: '-1em',
  4: '-1.4em',
  5: '-1.6em',
}

const arrowPos = {
  1: {left: '-1em'},
  2: {left: '-1em'},
  3: {left: '-1em'},
  4: {left: '-1.25em', top: '-0.25em'},
  5: {left: '-1.5em', top: '-0.5em'},
}

interface Props {
  id: string;
  level: number;
  children: string | React.ReactNode | React.ReactNode[];
  asElement?: keyof JSX.IntrinsicElements;
  style?: object;
  defaultCollapsed?: boolean;
}

const CollapsibleDecorator = ( { id, level, asElement, children, style, defaultCollapsed }: Props ) => {
  const TagName = asElement ?? `h${level}` as keyof JSX.IntrinsicElements;
  const [collapsed, setCollapsed] = useStoredState<boolean>(id, defaultCollapsed);
  const [showToggle, setShowToggle] = useState<boolean>(false);
  const [avoidHideToggle, setAvoidHideToggle] = useState<boolean>(false);

  useEffect(() => {
    const siblings = document.querySelectorAll<HTMLElement>(`#${id} ~ *`);
    for (const el of Array.from(siblings)) {

      const tagName = el.tagName.toLowerCase();
      if (tagName && tagName === asElement) { break }
      if (tagName.includes('h')) {
        if (tagName.split('h')[1] === 'r' || Number(tagName.split('h')[1]) <= level) {
          break
        }
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

  useEffect(() => {
    const handleAnyMouseDown = (e: MouseEvent) => {
      let el = e.target as HTMLElement
      if (el.id !== id) {
        setShowToggle(false);
        setAvoidHideToggle(false);
      }
    }

    if (avoidHideToggle) {
      document.addEventListener("click", handleAnyMouseDown);
    }

    return () => {
      document.removeEventListener("click", handleAnyMouseDown);
    }
  }, [avoidHideToggle])

  const handlePointerOut = () => {
    if (!avoidHideToggle) { setShowToggle(false); }
  }

  const handleClickExpand = () => {
    setCollapsed(collapsed ? null : true);
  }
  
  return (
      <TagName
        id={id}
        style={typeof style === 'object'
          ? {...style, textIndent: indentAdjust[level]}
          : {textIndent: indentAdjust[level]}
        }
        className="relative"
        onPointerDown={() => setAvoidHideToggle(true)}
        onPointerOver={() => setShowToggle(true)}
        onPointerOut={handlePointerOut}
      >
        <button
        className="remove-btn-styling"
        onClick={handleClickExpand}
        style={{
          position: 'absolute',
          display: (showToggle || collapsed) ? null : 'none',
          ...arrowPos[level]
        }}
      >
        <span className="material-icons" style={{lineHeight: 1.2}}>
          {collapsed ? 'chevron_right' : 'expand_more'}
        </span>
      </button>
        <div style={{display: 'inline-block', width: '1.75em'}}/>
        {children}
      </TagName>
  )
}

export default CollapsibleDecorator;
