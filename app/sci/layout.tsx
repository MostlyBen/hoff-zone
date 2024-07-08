import { headers } from "next/headers";
import { Frontmatter } from "components/layout";
import MDXComponent from "../../mdx/ClientMDXRemote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

const SciLayout = async ({ children }) => {
  const headerList = headers();
  const currentPath = headerList.get("x-current-path")
  
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