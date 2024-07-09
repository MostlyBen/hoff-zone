"use client"

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { Frontmatter } from "components/layout";
import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { a, blockquote, h1, h2, h3, h4, hr, li, p } from '../../mdx';

const SciLayout = ({ children }) => {
  const [frontmatter, setFrontmatter] = useState<object|null>(null)
  const [content, setContent] = useState<MDXRemoteSerializeResult|null>(null)
  const currentPath = usePathname();

  const udpateFrontmatter = async () => {
    const res = await fetch(`/api/frontmatter?path=${currentPath}`);

    const data:{
      data: object,
      content: MDXRemoteSerializeResult,
    } = await res.json();

    setFrontmatter(data.data);
    setContent(data.content);
  }

  useEffect(() => {
    setFrontmatter(null);
    setContent(null);
    udpateFrontmatter();
  }, [children])

  if (!frontmatter) {
    return (
      <>{children}</>
    )
  }

  return (
    <>
      <Frontmatter pageData={frontmatter} />
      {content
        ? <MDXRemote
            components={{ a, blockquote, h1, h2, h3, h4, hr, li, p }}
            {...content}
          />
        : children}
    </>
  )
}

export default SciLayout