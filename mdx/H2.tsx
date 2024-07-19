'use client'

import { JSX, useEffect, useState, useMemo } from "react";
import { formatAsId } from "../utils";
import { GenerateBtn, Editor } from '../components/generator';
import removeInlineTags from "../utils/data/removeInlineTags";
import { usePathname } from "next/navigation";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import * as MDXComponents from './';
import CollapsibleDecorator from "./CollapsibleDecorator";

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

  const defaultCollapsed = useMemo(() => {
    return (
      typeof children === 'string'
      ? children.includes('^collapsed')
      : Array.isArray(children)
        ? typeof children[children.length - 1] === 'string'
          ? children[children.length - 1].includes('^collapsed')
          : null
        : null
    )
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
  
  return (<>
    <CollapsibleDecorator id={id} level={2} style={style} defaultCollapsed={defaultCollapsed}>
      
      {removeInlineTags(children)}

      <div style={{marginLeft: '1.8em'}}>
        {(showGenerate) && <GenerateBtn forHeader={id} />}

        {showOriginal &&
          <button
            className="btn-small"
            onClick={() => setShowOriginal(false)}
          >
            show custom
          </button>
        }

        {(replacementContent && readyForReplacement && !showOriginal) &&
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
          </>
        }
      </div>
    </CollapsibleDecorator>
    
    {(replacementContent && readyForReplacement && !showOriginal) && <MDXRemote
      components={MDXComponents}
      {...replacementContent}
    />}
  </>)
}

export default H2;
