import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

export default function TestEnabledFalse() {
  const data = useQuery({
    queryKey: ["test-enabled-false"],
    queryFn: () => fetch("/test-enabled-false").then((res) => res.json()),
    enabled: false,
    useErrorBoundary: false,
  });
  const navigate = useNavigate();

  const [isOpen, toggle] = useReducer((prev) => !prev, true);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={toggle}>show</button>
      {isOpen ? <Inner /> : null}
      <button onClick={() => navigate("/sample")}>navigate</button>
    </div>
  );
}

function Inner() {
  const data = useQuery({
    queryKey: ["test-enabled-false"],
    queryFn: () => fetch("/test-enabled-false").then((res) => res.json()),
    enabled: true,
    retry: false,
    useErrorBoundary: false,
  });

  return <div>Inner</div>;
}
