"use client"

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { Frontmatter } from "components/layout";
import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import * as MDXComponents from '../../mdx';

const SciDecorator = ({ children }) => {
  const [frontmatter, setFrontmatter] = useState<object | null>(null)
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null)
  const currentPath = usePathname();

  const updateFrontmatter = async () => {
    const res = await fetch(`/api/frontmatter?path=${currentPath}`);

    const data: {
      data: object,
      content: MDXRemoteSerializeResult,
    } = await res.json();

    setFrontmatter(data.data);
    setContent(data.content);
  }

  useEffect(() => {
    document.title = currentPath;
    setFrontmatter(null);
    setContent(null);
    updateFrontmatter();
  }, [children, currentPath])

  return (
    <>
      {frontmatter && <Frontmatter pageData={frontmatter} />}
      {content
        ? <MDXRemote
          components={MDXComponents}
          {...content}
        />
        : children}
    </>
  )
}

export default SciDecorator
