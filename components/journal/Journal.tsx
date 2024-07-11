"use client"

import { useState, useMemo } from 'react';
import { useTheme } from 'utils/providers/themeProvider';
import { useStoredState } from 'hooks';
import config from '../../theme-config.json';
import JournalPreview from './JournalPreview';

interface JournalProps {
  journalId: string;
  onClose: () => void;
}

const Journal:React.FC<JournalProps> = ({ journalId, onClose }) => {
  const { theme } = useTheme();
  const journalPath = useMemo(() => {
    return `journal-${journalId}`
  }, [journalId]);

  const [content, setContent] = useStoredState<string>(journalPath, '');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') e.preventDefault();
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
            <div>
              <button
                className="remove-btn-styling"
                style={{textDecoration: 'underline'}}
                onClick={onClose}
              >
                [ctrl + x]: close
              </button>
            </div>
          </>
      }

    </div>
  )
}

export default Journal