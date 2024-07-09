'use client'

import { useState } from "react"
import { GenerateInput } from "./";

const GenerateBtn = ({ forHeader }: {forHeader?: string}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);


  return (<>
    <button
      className="btn-small mr-2"
      id="regenerate-project"
      onClick={() => setShowOptions(o => !o)}
    >
      regenerate
    </button>

    {showOptions && <GenerateInput forHeader={forHeader} onClose={() => setShowOptions(false)} />}

    </>)
}

export default GenerateBtn