const options = [
  "https://www.youtube.com/embed/zuCRSwWssVk",
  "https://www.youtube.com/embed/6P0HiR4xWI4",
  "https://www.youtube.com/embed/zhDwjnYZiCo",
  "https://www.youtube.com/embed/PLLRRXURicM",
  "https://www.youtube.com/embed/sF80I-TQiW0",
  "https://www.youtube.com/embed/dN6LK9-Nx3I",
  "https://www.youtube.com/embed/eEZF9iIv5XM",
  "https://www.youtube.com/embed/MtT5_PgLJlY",
  "https://www.youtube.com/embed/ZmdEBzCqL6o",
  "https://www.youtube.com/embed/u4DXqKV0Wtk",
]
const Lofi = ({ onClose }) => {
  const choice:number = Math.floor( Math.random() * options.length )

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
      src={options[choice]}
      title="Lofi Youtube Video"
      referrerPolicy="strict-origin-when-cross-origin"
    />

    </div>
  )
}

export default Lofi;