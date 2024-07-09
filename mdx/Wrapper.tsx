'use client'

import { useState, useEffect, ReactNode, Children } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import formatAsId from '../utils/formatAsId';
import removeRegenerateText from '../utils/removeRegenerateText';

const removeFrontmatter = (children:React.ReactNode[]) => {
  if (!Array.isArray(children)) { return children }
  if (!checkIfHr(children[0])) { return children }
  
  let frontmatterEnd:number = 0
  for (let i:number = 0; i < children.length; i++) {
    if (i > 0 && checkIfHr(children[i])) {
      frontmatterEnd = i + 1;
      break;
    }
  }
  
  return children.slice(frontmatterEnd)
}

const checkIfHr = (element) => {
  if (typeof element.type == 'object' && element.type['_payload']['value']['name'] === 'HR') { 
    return true;
  }
  return false;
}

const GeneratedContent:React.FC<{
  id:string,
  content:string,
  original:ReactNode[]
}> = ({ id, content, original }) => {
  const [_content, setContent] = useState<MDXRemoteSerializeResult|null>(null);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  useEffect(() => {
    serialize(content).then(res => {
      setContent(res);
    });
  }, [content])

  if (!_content) {
    return (
      <section id={id} key={id}>
        Loading content...
      </section>
    )
  }

  if (showOriginal) {
  <section id={id}>
    <button className='btn-small' onClick={() => setShowOriginal(false)}>Show Custom</button>
    {original}
  </section>
  }

  return (
    <section id={id}>
      <button className='btn-small mt-2' onClick={() => setShowOriginal(o => !o)}
      >
        {showOriginal ? 'show custom' : 'show original'}
      </button>
      {showOriginal ? original : <MDXRemote {..._content} />}
    </section>
  )
}

const addSecition = (id:string, content:ReactNode[], toReturn:ReactNode[]) => {
  const _toReturn = [...toReturn]
  const storedVersion = localStorage.getItem(window.location.pathname + '-' + id);
  if (storedVersion) {
    _toReturn.push(
      <GeneratedContent id={id} content={storedVersion} original={content} key={id} />
    )
  } else {
    _toReturn.push(
      <section id={id} key={id}>
        {content}
      </section>
    )
  }

  return _toReturn;
}

const sectionHeaderContent = (children, level:number) => {
  const _children = [...children];
  let toReturn = [];
  let thisSectionElements = [];
  let currentSection:string|null = null;

  for (const child of _children) {
    console.log("Child:", child)
    let childType;
    if (child.type) {
      try {
        childType =
        "_payload" in child.type
          ? child.type._payload.value.name // Lazy
          : child.type.name; // Non-lazy
      } catch (err) {}
    }
    let headerLevel = 0;
    if (childType === 'H1') { headerLevel = 1 }
    if (childType === 'H2') { headerLevel = 2 }
    if (childType === 'H3') { headerLevel = 3 }
    if (childType === 'HR') { headerLevel = -1 }

    // Other Elements
    if (headerLevel > level || headerLevel === 0) {
      if (currentSection) {
        thisSectionElements.push(child);
      } else {
        toReturn.push(child);
      }
      continue;
    }

    if (headerLevel <= level) {
      if (thisSectionElements.length) {
        toReturn = addSecition(
          formatAsId(`h${level}-${currentSection}-content`),
          thisSectionElements,
          toReturn
        );
      }

      toReturn.push(child);
      thisSectionElements = [];
    }

    currentSection = headerLevel === level
      ? Array.isArray(child.props.children)
        ? removeRegenerateText(child.props.children[0])
        : typeof child.props.children === 'string' ? removeRegenerateText(child.props.children) : `h${level}`
      : null;
  }

  if (thisSectionElements.length) {
    toReturn = addSecition(
      formatAsId(`h${level}-${currentSection}-content`),
      thisSectionElements,
      toReturn
    );
  }

  return toReturn
}

const Wrapper = ({ children }) => {
  const [processedChildren, setProcessedChildren] = useState(children);

  if (!Array.isArray(children)) return (<>{children}</>)

  const updateDom = () => {
    let newChildren = Children.toArray(removeFrontmatter(children));
    newChildren = sectionHeaderContent([...newChildren], 3);
    newChildren = sectionHeaderContent([...newChildren], 2);
    newChildren = sectionHeaderContent([...newChildren], 1);
    setProcessedChildren(newChildren);
  }

  useEffect(() => {
    updateDom();
  }, [])
  
  return (
    <>{processedChildren}</>
  )
}

export default Wrapper