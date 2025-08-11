export default function PDFPage() {

  const handleClick = () => {
    window.open("/api/hello", "_blank");
  }

  return <button onClick={handleClick}>click to download pdf</button>
}