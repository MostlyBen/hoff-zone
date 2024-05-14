const Lofi = ({ onClose }) => {
  return (
    <div style={{
      background: "var(--background)",
      padding: "8px",
      border: "1px solid var(--green)",
      borderRadius: "8px",
      position: "absolute",
      bottom: "16px",
      right: "16px",
    }}>
      <button onClick={onClose} style={{
        padding: "4px",
        border: "none",
        borderRadius: "4px",
        color: "var(--green)",
        backgroundColor: "var(--background)",
        position: "absolute",
        top: "4px",
        right: "4px",
        lineHeight: "1",
      }}><span className="material-icons" style={{lineHeight: '1'}}>close</span></button>

      <iframe
        width="420"
        height="236"
        src="https://www.youtube.com/watch?v=zuCRSwWssVk"
        title="LoFi"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}

export default Lofi;