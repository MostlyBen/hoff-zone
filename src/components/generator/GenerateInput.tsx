import { useState } from "react";
import { useTheme } from "../../utils/themeProvider";
import { GeneratedOptions } from "./";

interface IdeaPayload {
  project_data: object,
  user_request?: string
}

const GenerateInput = ({ onClose }) => {
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [options, setOptions] = useState<string[]|null>(null);

  const { theme } = useTheme();

  const generateOptions = async (topic:string) => {
    console.log("Generating for:", topic);
    const pageReq = await fetch(`/api/frontmatter?path=${'/sci/11'/* asPath */}`);
    const pageData = await pageReq.json();

    const payload:IdeaPayload = { project_data: pageData.data }
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
          border: `2px solid ${theme.yellow}`,
        }}
      >
        <label htmlFor="request-input">Is there anything you want the project to be about?</label>
        <div className="flex row">
          <input
            className="grow"
            id="request-input"
            placeholder="(Optional) A topic for your project"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{
              backgroundColor: theme.white,
              color: theme.black,
              padding: "0.5em 1em"
            }}
          />
          <button onClick={handleSubmit}>Generate</button>
        </div>

        {showOptions && <GeneratedOptions
          options={options}
          awaitingResponse={awaitingResponse}
          setAwaitingResponse={setAwaitingResponse}
        />}
      </div>

      <div className="modal-bg" onClick={onClose} />
    </div>
  )
}

export default GenerateInput