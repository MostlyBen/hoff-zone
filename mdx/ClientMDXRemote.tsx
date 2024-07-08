'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { a, blockquote, h1, h2, h3, h4, hr, li, p, wrapper } from './';

interface Props {
  content: MDXRemoteSerializeResult;
}
const ClientMDXRemote:React.FC<Props> = ({content}) => {
  return (
    
    <MDXRemote
      {...content}
      components={{ a, blockquote, h1, h2, h3, h4, hr, li, p, wrapper }}
    />
  )
}

export default ClientMDXRemote