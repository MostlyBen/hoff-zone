'use client'

import { useEffect, useState } from "react"
import { GenerateInput } from "./";

const GenerateBtn = ({ forHeader }: {forHeader?: string}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    const reposition = () => {
      setTimeout(() => {

        // Move this div to be by '## The Project'
        const projectEl = document.getElementById(forHeader ?? 'h2-the-project');
        const regenerateEl = document.getElementById('regenerate-project')
        if (projectEl && regenerateEl) {
          projectEl.after(regenerateEl);
          document.body.removeEventListener('change', reposition);
        }
      }, 500) 
    }
    reposition()

    document.body.addEventListener('change', reposition);
    return () => document.body.removeEventListener('change', reposition);
  }, [])


  return (<>
    <button
      className="btn-small mr-2"
      id="regenerate-project"
      onClick={() => setShowOptions(o => !o)}
    >
      regenerate
    </button>

    {showOptions && <GenerateInput onClose={() => setShowOptions(false)} />}

    </>)
}

export default GenerateBtn