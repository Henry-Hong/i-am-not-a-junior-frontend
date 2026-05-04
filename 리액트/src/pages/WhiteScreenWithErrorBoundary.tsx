import React, { Component, ErrorInfo, ReactNode, useState } from "react";

/**
 * Error Boundary를 사용해서 흰 화면 대신 에러 UI를 보여주는 예제
 */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error Boundary 클래스 컴포넌트
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary가 에러를 잡았습니다:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: "20px",
          backgroundColor: "#ffebee",
          border: "2px solid #f44336",
          borderRadius: "8px",
          margin: "20px"
        }}>
          <h2 style={{ color: "#d32f2f" }}>⚠️ 에러가 발생했습니다!</h2>
          <p style={{ fontFamily: "monospace", color: "#c62828" }}>
            {this.state.error?.message}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px"
            }}
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 에러를 발생시키는 컴포넌트
const BuggyComponent = () => {
  const data: any = null;

  return (
    <div>
      <h3>이 컴포넌트는 에러를 발생시킵니다</h3>
      <p>{data.something.that.does.not.exist}</p>
    </div>
  );
};

// 비교 예제: Error Boundary 없이
const WithoutErrorBoundary = () => {
  const [showBuggy, setShowBuggy] = useState(false);

  return (
    <div style={{ padding: "20px", border: "2px solid #ff9800" }}>
      <h2>❌ Error Boundary 없음</h2>
      <p>버튼을 클릭하면 <strong>흰 화면</strong>이 나타납니다!</p>
      <button
        onClick={() => setShowBuggy(true)}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        에러 발생시키기
      </button>
      {showBuggy && <BuggyComponent />}
    </div>
  );
};

// 비교 예제: Error Boundary 사용
const WithErrorBoundary = () => {
  const [showBuggy, setShowBuggy] = useState(false);
  const [reset, setReset] = useState(0);

  return (
    <div style={{ padding: "20px", border: "2px solid #4caf50" }}>
      <h2>✅ Error Boundary 사용</h2>
      <p>버튼을 클릭해도 <strong>에러 메시지</strong>가 나타납니다!</p>
      <button
        onClick={() => setShowBuggy(true)}
        style={{ padding: "10px", cursor: "pointer", marginRight: "10px" }}
      >
        에러 발생시키기
      </button>
      <button
        onClick={() => {
          setShowBuggy(false);
          setReset(reset + 1);
        }}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        초기화
      </button>

      <ErrorBoundary key={reset}>
        {showBuggy && <BuggyComponent />}
      </ErrorBoundary>
    </div>
  );
};

// 메인 컴포넌트
const WhiteScreenWithErrorBoundary = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Error Boundary로 흰 화면 방지하기 🛡️</h1>

      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "30px"
      }}>
        <h3>📚 Error Boundary란?</h3>
        <ul>
          <li>자식 컴포넌트 트리에서 발생한 JavaScript 에러를 catch</li>
          <li>에러를 로깅하고, fallback UI를 표시</li>
          <li>전체 앱이 크래시되는 것을 방지</li>
          <li><strong>클래스 컴포넌트로만 구현 가능</strong> (현재)</li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <WithoutErrorBoundary />
        </div>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <WithErrorBoundary />
        </div>
      </div>

      <div style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#fff3e0",
        borderRadius: "8px"
      }}>
        <h3>⚠️ Error Boundary의 한계</h3>
        <p>다음과 같은 에러는 잡지 못합니다:</p>
        <ul>
          <li>이벤트 핸들러 내부의 에러</li>
          <li>비동기 코드 (setTimeout, Promise 등)</li>
          <li>서버 사이드 렌더링</li>
          <li>Error Boundary 자체에서 발생한 에러</li>
        </ul>
      </div>
    </div>
  );
};

export default WhiteScreenWithErrorBoundary;
