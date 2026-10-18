import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Href() {
  const router = useRouter();

  const [inc, setInc] = useState(0);

  const hearts = [
    "🩷",
    "💙",
    "💚",
    "💛",
    "🧡",
    "❤️",
    "💜",
    "🤎",
    "🖤",
    "🤍",
    "💖",
    "💗",
    "💓",
    "💞",
    "💕",
    "💘",
    "💝",
    "💟",
  ];

  const hash = Array.from(
    { length: inc },
    (_, i) => hearts[i % hearts.length]
  ).join("");

  return (
    <div
      onClick={() => {
        router.push("/href", { pathname: `/href`, hash: hash });
        setInc((prev) => prev + 1);
      }}
    >
      href
    </div>
  );
}
