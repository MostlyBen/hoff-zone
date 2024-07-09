"use client"

import { useState } from 'react';
import { useTheme } from "utils/providers/themeProvider"

interface Props {
  initialValue: string;
  onClose: (arg0?:string) => void;
  storedAt?: string;
}

const Editor:React.FC<Props> = ({ initialValue, onClose, storedAt }) => {
  const [value, setValue] = useState<string>(initialValue);
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  const handleSave = () => {
    if (storedAt) {
      localStorage.setItem(storedAt, value);
    }
    onClose(value);
  }

  const handleCancel = () => {
    onClose();
  }

  return (
    <div className="modal-container">
      <div
        className="modal-content"
        style={{
          background: theme.background,
          border: `2px solid ${theme.cursorColor}`
        }}
      >
        <div>
          <textarea
            onChange={e => handleChange(e)}
            value={value}
            style={{
              background: 'transparent',
              color: theme.foreground,
              padding: "0.5em 1em",
              minWidth: 'min(720px, 100vw - 60px)',
              minHeight: 'min(720px, 100dvh - 150px)',
              borderRadius: '3px',
              outline: `none`,
              backdropFilter: 'brightness(80%)'
            }}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={handleCancel}>cancel</button>
          <button onClick={handleSave}>save</button>
        </div>
        
      </div>

      <div className="modal-bg" onClick={() => onClose()} />
    </div>
  )
}

export default Editor