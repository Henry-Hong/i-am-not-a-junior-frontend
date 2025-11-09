/* eslint-disable */
// @ts-nocheck

// Case 3: 검증(Validation) 로직을 계산으로
// - **문제**: 검증 로직이 UI 이벤트 핸들러에 섞임
// - **해결**: 검증 로직을 컴포넌트 바깥 순수 함수로 분리

// ❌ Before: 검증이 액션에 섞임
function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value; // 액션
    const password = e.target.password.value; // 액션

    // 검증 로직이 이벤트 핸들러 안에
    const errors = {};
    if (!email.includes("@")) {
      errors.email = "Invalid email";
    }
    if (password.length < 8) {
      errors.password = "Too short";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors); // 액션
      return;
    }

    login(email, password); // 액션
  };
}
