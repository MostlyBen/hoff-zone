"use client"

// TODO: render markdown on un-focus
// + auto-detect links

import { useEffect, useState, useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { useTheme } from 'utils/providers/themeProvider';
import { useStoredState } from 'hooks';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import config from '../../theme-config.json';
import * as MDXComponents from "../../mdx";

interface PreviewProps {
  content: string;
  onEdit: () => void;
}

interface JournalProps {
  journalId: string;
  onClose: () => void;
}

const JournalPreview:React.FC<PreviewProps> = ({ content, onEdit }) => {
  const [serializedContent, setSerializedContent]
    = useState<MDXRemoteSerializeResult|null>(null);

  useEffect(() => {
    serialize(content).then(res => setSerializedContent(res));
  }, [content])

  return (
    <div
      className='h-full w-full px-2'
      onClick={(e:any) => {
        if (e.target.classList[0] !== 'todo-check') {
          onEdit();
        }
      }}
    >
      {serializedContent &&
        <MDXRemote
          components={MDXComponents}
          {...serializedContent}
        />
      }
    </div>
  )
}

const Journal:React.FC<JournalProps> = ({ journalId, onClose }) => {
  const { theme } = useTheme();
  const journalPath = useMemo(() => {
    return `journal-${journalId}`
  }, [journalId]);

  const [content, setContent] = useStoredState<string>(journalPath, '');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "x") {
      onClose();
    }
  }

  return (
    <div
      className="overflow-hidden h-full rounded console-content flex flex-col gap-2"
      style={{
        borderColor: theme.yellow,
        padding: config.border ? 18 : 8,
        borderWidth: config.border ? 2 : 0,
      }}
    >

      {showPreview
        ? <JournalPreview content={content} onEdit={() => setShowPreview(false)} />
        : <>
            <textarea
              className="grow overflow-y-auto p-2"
              placeholder='put notes here...'
              style={{
                background: 'transparent',
                backdropFilter: 'brightness(0.8)',
                color: theme.foreground,
                outline: 'none',
                border: 'none',
                resize: 'none',
                borderRadius: "0.25em"
              }}
              value={content}
              onChange={(e) => {
                setContent(
                  e.target.value
                  .replaceAll('<', '(') // Caret brackets break `serialize`
                  .replaceAll('>', ')')
                )
              }}
              onKeyDown={handleKeyDown}
              autoFocus={true}
              onBlur={() => { if (content) setShowPreview(true) }}
            />
            <div>[ctrl + x]: close</div>
          </>
      }

    </div>
  )
}

export default Journal