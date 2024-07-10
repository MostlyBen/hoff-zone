'use client'

import React from "react"
import { usePathname } from "next/navigation"

interface OptionsProps {
  options: string[];
  forHeader: string;
  awaitingResponse: boolean;
  setAwaitingResponse: (value: boolean) => void;
}

interface ButtonProps {
  option: string;
  forHeader: string;
  awaitingResponse: boolean;
  setAwaitingResponse: (value: boolean) => void;
}

const OptionButton:React.FC<ButtonProps> = (
  { option, forHeader, awaitingResponse, setAwaitingResponse }
) => {
  const asPath = usePathname();

  const generateProject = async () => {
    if (awaitingResponse) { return }
    setAwaitingResponse(true);
    
    const pageReq = await fetch(`/api/frontmatter?path=${asPath}`);
    const pageData = await pageReq.json();

    const res = await fetch(`/api/ai/generate-project`, {
      method: "POST",
      body: JSON.stringify({
        project_data: pageData.data,
        user_request: option,
      })
    });
    const responseMessage = await res.json()

    return responseMessage.output
  }

  const handleClickOption = () => {
    generateProject().then(res => {
      let key = forHeader
                ? window.location.pathname + '-' + forHeader + '-content'
                : window.location.pathname + '-' + 'h2-the-project-content'
      localStorage.setItem(key, res);
      window.location.reload();
    })
  }

  return (
    <div>
      <button
        className={`mb-2${awaitingResponse ? ' disabled' : ''}`}
        onClick={handleClickOption}
      >
        {option}
      </button>
    </div>
  )
}

const GeneratedOptions:React.FC<OptionsProps> = (
  { options, awaitingResponse, setAwaitingResponse, forHeader }
) => {

  return (
    <div className="mt-4">
        project options
        <br />
        {options.map((o, i) => {
          return (
            <OptionButton
              option={o}
              key={`option-${i}`}
              forHeader={forHeader}
              awaitingResponse={awaitingResponse}
              setAwaitingResponse={setAwaitingResponse}
            />
          )
        })}

    </div>
  )
}

export default GeneratedOptions