"use client"

import { usePathname } from "next/navigation";
import { Frontmatter } from "components/layout";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

const SciLayout = async ({ children }) => {
  const currentPath = usePathname();
  
  const res = await fetch(process.env.URL + `/api/frontmatter?path=${currentPath}`)
  
  const data:{
    data: object,
    content: MDXRemoteSerializeResult,
  } = await res.json()

  return (
    <>
      <Frontmatter pageData={data.data} />
      {children}
    </>
  )
}

export default SciLayout