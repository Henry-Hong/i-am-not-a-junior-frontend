import { useNavigate } from "react-router-dom";

export default function SamplePage() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/test-enabled-false")}>navigate</button>
    </div>
  );
}
