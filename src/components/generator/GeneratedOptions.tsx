import { useTheme } from "../../utils/themeProvider"

const GeneratedOptions = ({ onClose }) => {
  const { theme } = useTheme()

  return (
    <div className="modal-container">
      <div
        className="modal-content"
        style={{
          background: theme.background,
          border: `2px solid ${theme.yellow}`,
        }}
      >
        Options will go here
      </div>

      <div className="modal-bg" onClick={onClose} />
    </div>
  )
}

export default GeneratedOptions