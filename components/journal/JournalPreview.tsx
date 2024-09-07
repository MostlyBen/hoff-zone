"use client"

// TODO: render markdown on un-focus
// + auto-detect links

import { useEffect, useState } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import * as MDXComponents from "../../mdx";

interface PreviewProps {
  content: string;
  onEdit: () => void;
}

const JournalPreview: React.FC<PreviewProps> = ({ content, onEdit }) => {
  const [serializedContent, setSerializedContent]
    = useState<MDXRemoteSerializeResult | null>(null);
  const [errorSerializing, setErrorSerializing] = useState<boolean>(false);

  useEffect(() => {
    try {
      serialize(content).then(res => setSerializedContent(res));
      setErrorSerializing(false);
    } catch (err) {
      setErrorSerializing(true);
      console.warn("Could not serialize user-input journal content:", content);
    }
  }, [content])

  return (
    <div
      className='h-full w-full pl-4 pr-2'
      onClick={(e: any) => {
        if (!['todo-check', 'material-icons'].includes(e.target.classList[0])) {
          onEdit();
        }
      }}
    >
      {errorSerializing && <div>{content}</div>}

      {serializedContent && !errorSerializing &&
        <MDXRemote
          components={MDXComponents}
          {...serializedContent}
        />
      }
    </div>
  )
}

export default JournalPreview;
