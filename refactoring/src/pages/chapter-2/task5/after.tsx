/* eslint-disable */
// @ts-nocheck

// Case 5: 이벤트 핸들러를 가볍게
// - **문제**: 이벤트 핸들러에 모든 로직이 집중
// - **해결**: 이벤트 처리(액션)와 로직(계산) 분리

// (1) 일단 어떤건지 파악해야지! -> 검색 쿼리를 검증하고, 가공하고, API 보내고, 결과받아옴
// (2) 액션, 데이터 파악 -> query / API 전송
// (3) 계산로직
// (3-1) 받아오기
// (3-2) 검증하기
// (3-3) 성공할 경우 가공하기 (필터, 키워드 추출)
// (3-4) 실패할 경우 아무 액션 없이
// (3-5) API 처리
// (3-6) 결과 세팅

const validateQuery = (query: string): string | null => {
  if (query.length < 3) {
    return "Query too short";
  }
  return null;
};

const MAX_ROWS = 10;
const descendingOrder = (a, b) => b - a;

const parseQueryToKeywords = (query: string) => {
  const trimmed = query.toLocaleLowerCase().trim();
  return trimmed
    .split(" ")
    .filter((k) => k.length > 0)
    .join("+");
};

function SearchBox() {
  const [error, setError] = useState(null);

  const { data: results } = useQuery({
    ...getSearchResults(parseQueryToKeywords(query)),
    enabled: error != null,
    select: (results) => {
      const sorted = data.sort((a, b) => descendingOrder(a.score, b.score));
      return sorted.slice(0, MAX_ROWS);
    },
  });

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);

    if (validateQuery(query)) {
      setError("Query too short");
    }
  };
}
