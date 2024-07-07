import { useEffect, useState } from "react"
import { GeneratedOptions } from "./";

const GenerateBtn = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    const reposition = () => {
      setTimeout(() => {

        // Move this div to be by '## The Project'
        const projectEl = document.getElementById('h2-the-project');
        const regenerateEl = document.getElementById('regenerate-project')
        
        projectEl.after(regenerateEl);
        document.body.removeEventListener('change', reposition);
      }, 500) 
    }
    reposition()

    document.body.addEventListener('change', reposition);
    return () => document.body.removeEventListener('change', reposition);
  }, [])


  return (<>
    <button
      className="btn-small"
      id="regenerate-project"
      onClick={() => setShowOptions(o => !o)}
    >
      regenerate
    </button>

    {showOptions && <GeneratedOptions onClose={() => setShowOptions(false)} />}

    </>)
}

export default GenerateBtn