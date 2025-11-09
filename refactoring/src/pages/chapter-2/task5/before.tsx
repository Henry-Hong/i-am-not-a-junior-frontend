/* eslint-disable */
// @ts-nocheck

// Case 5: 이벤트 핸들러를 가볍게
// - **문제**: 이벤트 핸들러에 모든 로직이 집중
// - **해결**: 이벤트 처리(액션)와 로직(계산) 분리

// ❌ Before: 무거운 이벤트 핸들러
function SearchBox() {
  const handleSearch = (e) => {
    const query = e.target.value;

    // 모든 로직이 핸들러 안에
    if (query.length < 3) {
      setResults([]);
      setError("Query too short");
      return;
    }

    const filtered = query.toLowerCase().trim();
    const keywords = filtered.split(" ").filter((k) => k.length > 0);

    fetch(`/api/search?q=${keywords.join("+")}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.score - a.score);
        const limited = sorted.slice(0, 10);
        setResults(limited);
      });
  };
}
