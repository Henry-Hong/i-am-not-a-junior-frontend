import React, { useEffect, useState } from "react";

/**
 * 흰 화면이 나타나는 여러 상황을 체험할 수 있는 예제들
 */

// 예제 1: 렌더링 중 에러 - undefined 객체 접근
const UndefinedAccessExample = () => {
  const data: any = undefined;

  return (
    <div>
      <h2>예제 1: Undefined 접근</h2>
      {/* 이 줄이 실행되면 흰 화면이 됩니다 */}
      <p>{data.user.name}</p>
    </div>
  );
};

// 예제 2: 렌더링 중 throw
const ThrowErrorExample = () => {
  throw new Error("의도적인 에러!");
  // 에러를 루트까지 전파 -> 앱이 크래시났는데 더이상 진행하는건, 사용자에게 오히려 잘못된 UI를 보여줄 수 있음
  // 그러기에, 최소한의 "안전장치"로, 트리를 언마운트함 -> 그렇게 되면, 흰페이지가 보이게됨.
  return <div>이 부분은 렌더링되지 않습니다</div>;
};

// 예제 3: useEffect에서 에러 (이건 흰 화면이 아닐 수 있음)
const UseEffectErrorExample = () => {
  useEffect(() => {
    throw new Error("useEffect에서 발생한 에러");
  }, []);

  return <div>이 텍스트는 보일 수 있습니다</div>;
};

// 예제 4: 무한 리렌더링 (브라우저 멈춤)
const InfiniteRenderExample = () => {
  const [count, setCount] = useState(0);

  // 렌더링마다 state 업데이트 -> 무한 루프
  setCount(count + 1);

  return <div>Count: {count}</div>;
};

// 예제 5: 존재하지 않는 함수 호출
const UndefinedFunctionExample = () => {
  const someObject: any = {};

  return (
    <div>
      <h2>예제 5: 존재하지 않는 함수 호출</h2>
      <button onClick={() => someObject.nonExistentFunction()}>
        클릭하면 흰 화면!
      </button>
    </div>
  );
};

// 예제 6: map에서 에러
const MapErrorExample = () => {
  const items: any = null; // 배열이 아님

  return (
    <div>
      <h2>예제 6: null.map() 에러</h2>
      {items.map((item: any) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};

// 메인 컴포넌트 - 각 예제를 선택할 수 있음
const WhiteScreenExamples = () => {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const renderExample = () => {
    switch (selectedExample) {
      case "undefined":
        return <UndefinedAccessExample />;
      case "throw":
        return <ThrowErrorExample />;
      case "useEffect":
        return <UseEffectErrorExample />;
      case "infinite":
        return <InfiniteRenderExample />;
      case "undefinedFunction":
        return <UndefinedFunctionExample />;
      case "map":
        return <MapErrorExample />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>흰 화면 체험하기 🎯</h1>
      <p style={{ color: "red", fontWeight: "bold" }}>
        ⚠️ 주의: 버튼을 클릭하면 앱이 크래시되어 흰 화면이 나타납니다!
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setSelectedExample("undefined")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          1. Undefined 객체 접근 (data.user.name)
        </button>

        <button
          onClick={() => setSelectedExample("throw")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          2. 렌더링 중 throw Error
        </button>

        <button
          onClick={() => setSelectedExample("useEffect")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          3. useEffect에서 에러 (콘솔 확인)
        </button>

        <button
          onClick={() => setSelectedExample("infinite")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          4. 무한 리렌더링 (브라우저 멈춤)
        </button>

        <button
          onClick={() => setSelectedExample("undefinedFunction")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          5. 존재하지 않는 함수 호출 (버튼 클릭 필요)
        </button>

        <button
          onClick={() => setSelectedExample("map")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          6. null.map() 에러
        </button>

        <button
          onClick={() => setSelectedExample(null)}
          style={{
            padding: "10px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          초기화
        </button>
      </div>

      <div
        style={{ marginTop: "30px", padding: "20px", border: "2px solid #333" }}
      >
        <h3>선택된 예제:</h3>
        {renderExample()}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h3>💡 팁: Error Boundary 추가하기</h3>
        <p>
          Error Boundary를 추가하면 흰 화면 대신 에러 메시지를 보여줄 수
          있습니다.
        </p>
        <p>
          React 18+에서는 react-error-boundary 라이브러리를 사용할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default WhiteScreenExamples;
