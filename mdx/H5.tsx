'use client'

import { JSX, useMemo } from "react";
import CollapsibleDecorator from "./CollapsibleDecorator";
import { formatAsId } from "../utils";
import removeInlineTags from "../utils/data/removeInlineTags";

const H5 = ( { children, style }: JSX.IntrinsicElements["h5"] ) => {
  const id = useMemo(() => {
    return (
      typeof children === 'string'
      ? 'h5-' + formatAsId(children)
      : Array.isArray(children)
        ? typeof children[0] === 'string' ? 'h5-' + formatAsId(children[0]) : 'h5'
        : 'h5'
    )
  }, [children]);

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
  
  return (
    <CollapsibleDecorator
      id={id}
      level={5}
      style={style}
      defaultCollapsed={defaultCollapsed}
    >
      {removeInlineTags(children)}
    </CollapsibleDecorator>
  )
}

export default H5;
