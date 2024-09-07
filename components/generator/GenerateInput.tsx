'use client'

import { useState } from "react";
import { useTheme } from "../../utils/providers/themeProvider";
import { GeneratedOptions } from "./";
import { usePathname } from "next/navigation";

interface IdeaPayload {
  project_data: object,
  user_request?: string
}

const GenerateInput = (
  { onClose, forHeader }:
    { onClose: () => void, forHeader: string }
) => {

  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [options, setOptions] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathName = usePathname();

  const { theme } = useTheme();

  const generateOptions = async (topic: string) => {
    const pageReq = await fetch(`/api/frontmatter?path=${pathName}`);
    const pageData = await pageReq.json();

    const payload: IdeaPayload = { project_data: pageData.data }
    if (topic) payload.user_request = topic;

    const res = await fetch(`/api/ai/generate-ideas`, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const responseMessage = await res.json();

    try {
      const newOptions = JSON.parse(responseMessage.output)
      console.log("Response options:", newOptions);
      if (!Array.isArray(newOptions)) { throw new Error("AI responded with incorrect formatting:", responseMessage.output) }
      setOptions(newOptions)

      setShowOptions(true);

    } catch (err) {
      console.warn("Error generating options:", err)
      console.warn("Response was:", responseMessage.output)
      setError('Something went wrong. Try again.');
    }

    setAwaitingResponse(false);

  }

  const handleSubmit = () => {
    if (awaitingResponse) { return }
    setAwaitingResponse(true);
    generateOptions(userInput);
  }

  return (
    <div className="modal-container">
      <div
        className="modal-content"
        style={{
          background: theme.background,
          border: `2px solid ${theme.primary}`,
        }}
      >
        <label
          htmlFor="request-input"
          style={{ marginLeft: '1.75em' }}
        >
          Is there anything you want the project to be about?
        </label>
        <div className="flex row">
          <input
            className={`grow mr-2`}
            id="request-input"
            placeholder="(Optional) A topic for your project"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
            style={{
              backgroundColor: theme.white,
              color: theme.black,
              padding: "0.5em 1em"
            }}
          />
          <button
            className={`${awaitingResponse ? 'disabled' : ''}`}
            onClick={handleSubmit}
          >
            Generate
          </button>
        </div>

        {error && <div style={{ color: theme.error }}>* {error}</div>}

        {showOptions && <GeneratedOptions
          options={options}
          forHeader={forHeader}
          awaitingResponse={awaitingResponse}
          setAwaitingResponse={setAwaitingResponse}
        />}
      </div>

      <div
        className="modal-bg"
        onClick={() => { if (!awaitingResponse) onClose() }}
      />
    </div>
  )
}

export default GenerateInput
