import { useEffect, useState } from "react";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (email === "") {
      setError("");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("올바른 이메일 양식을 입력해주세요.");
    } else {
      setError("");
    }
  }, [email]);

  return (
    <div>
      <label htmlFor="이메일">이메일</label>
      <input
        id="이메일"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />

      <label htmlFor="비밀번호">비밀번호</label>
      <input
        id="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />

      <strong>{error}</strong>
    </div>
  );
}
