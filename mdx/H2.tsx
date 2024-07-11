'use client'

import { JSX, useEffect, useState, useMemo } from "react";
import { useStoredState } from "../hooks";
import { formatAsId } from "../utils";
import { GenerateBtn, Editor } from '../components/generator';
import removeInlineTag from "../utils/data/removeInlineTag";
import { usePathname } from "next/navigation";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { a, blockquote, h1, h2, h3, h4, hr, li, p } from './';

const H2 = ( { children, style }: JSX.IntrinsicElements["h2"] ) => {
  const pathName = usePathname();
  const [replacementContent, setReplacementContent]
    = useState<MDXRemoteSerializeResult|null>(null);
  const [readyForReplacement, setReadyForReplacement] = useState<boolean>(false);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const showGenerate = useMemo(() => {
    if (typeof children === 'string') {
      return children.endsWith('^editable');
    }
    if (!Array.isArray(children)) {
      return false;
    }
    const lastChild = children[children.length -1]
    if (typeof lastChild === 'string') {
      return lastChild.endsWith('^editable');
    }
    return false;
  }, [children])

  const id = useMemo(() => {
    return (
      typeof children === 'string'
      ? 'h2-' + formatAsId(children, showGenerate)
      : Array.isArray(children)
        ? typeof children[0] === 'string' ? 'h2-' + formatAsId(children[0], showGenerate) : 'h2'
        : 'h2'
    )
  }, [children, showGenerate]);

  const [collapsed, setCollapsed] = useStoredState<boolean>(id, false);
  const [showToggle, setShowToggle] = useState<boolean>(false);
  const [avoidHideToggle, setAvoidHideToggle] = useState<boolean>(false);

  const updateShownElements = (e?: CustomEventInit) => {
    // Avoid for other h2s or h3s
    if (e?.detail?.headingLevel && e.detail.headingLevel != 1) { return }
    // Avoid if it's open (could already be open, or this would show next siblings when unrelated h1s open)
    if (e?.detail?.headingLevel && !collapsed) { return }

    const siblings = document.querySelectorAll<HTMLElement>(`#${id} ~ *`);
    for (const el of Array.from(siblings)) {
      if (['h1', 'h2', 'hr'].includes(el.tagName.toLocaleLowerCase())) {
        break;
      }

      if (collapsed) {
        el.classList.add("hidden")
      } else {
        el.classList.remove("hidden")
      }
    }

    if (!collapsed) {
      const toggleEvent = new CustomEvent("onAnyCollapseOpen", {detail: {headingLevel: 2}});
      document.dispatchEvent(toggleEvent);
    }
  }

  useEffect(() => {
    const myReplacement = localStorage.getItem(`${pathName}-${id}-content`);
    serialize(myReplacement).then(res => setReplacementContent(res));

    if (myReplacement) {
    const siblings = document.querySelectorAll<HTMLElement>(`#${id} ~ *`);
    for (const el of Array.from(siblings)) {
      if (['h1', 'h2', 'hr'].includes(el.tagName.toLocaleLowerCase())) {
        break;
      }
        el.classList.add("locally-replaced");
      }
      setReadyForReplacement(true);
    }

  }, []);

  const handleCloseEditor = (newContent?:string) => {
    if (newContent) {
      serialize(newContent).then(res => setReplacementContent(res));
    }
    setShowEdit(false);
  }

  useEffect(() => {
    updateShownElements();
    document.addEventListener("onAnyCollapseOpen", updateShownElements);
    return () => document.removeEventListener("onAnyCollapseOpen", updateShownElements);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
  return (<>
      <h2
        id={id}
        style={typeof style === 'object'
          ? {...style, textIndent: '-0.8em', position: 'relative'}
          : {textIndent: '-0.8em', position: 'relative'}
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
        {removeInlineTag(children)}
      </h2>

      {(showGenerate && !collapsed) && <GenerateBtn forHeader={id} />}

      {showOriginal &&
        <button
          className="btn-small"
          onClick={() => setShowOriginal(false)}
        >
          show custom
        </button>
      }

      {(replacementContent && !collapsed && readyForReplacement && !showOriginal) &&
        <>
        <style>{`.locally-replaced { display: none }`}</style>
        <button
          className="mt-2 mr-2 btn-small"
          onClick={() => setShowOriginal(true)}
        >
          show original
        </button>

        <button
          className="mt-2 btn-small"
          onClick={() => setShowEdit(true)}
        >
          edit
        </button>

        {showEdit &&
          <Editor
            initialValue={localStorage.getItem(`${pathName}-${id}-content`)}
            storedAt={`${pathName}-${id}-content`}
            onClose={handleCloseEditor}
          />
        }
        
        <MDXRemote
          components={{ a, blockquote, h1, h2, h3, h4, hr, li, p }}
          {...replacementContent}
        />
        </>
      }
  </>)
}

export default H2;
