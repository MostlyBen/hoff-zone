'use client'

import React from "react"
import { usePathname } from "next/navigation"

interface Props {
  options: string[];
  awaitingResponse: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setAwaitingResponse: Function;
}

const OptionButton:React.FC<{
  option: string,
  awaitingResponse: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  setAwaitingResponse: Function,
}> = ({ option, awaitingResponse, setAwaitingResponse }) => {
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
      console.log("New project:", res);
      localStorage.setItem(window.location.pathname + '-' + 'h2-the-project-content', res);
      window.location.reload();
    })
  }

  return (
    <div>
      <button onClick={handleClickOption}>{option}</button>
    </div>
  )
}

const GeneratedOptions:React.FC<Props> = ({ options, awaitingResponse, setAwaitingResponse }) => {

  return (
    <div>
        Project options
        <br />
        {options.map((o, i) => <OptionButton option={o} key={`option-${i}`} awaitingResponse={awaitingResponse} setAwaitingResponse={setAwaitingResponse} />)}

    </div>
  )
}

export default GeneratedOptions