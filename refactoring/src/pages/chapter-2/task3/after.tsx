/* eslint-disable */
// @ts-nocheck

// Case 3: 검증(Validation) 로직을 계산으로
// - **문제**: 검증 로직이 UI 이벤트 핸들러에 섞임
// - **해결**: 검증 로직을 컴포넌트 바깥 순수 함수로 분리

// (data) email, password
// (calc1) email, password
// (calc2) validation
// (action) 로그인 API 쏴야함

/**
 * 검증 로직이 이벤트 핸들러 안에 있어도 되는거 아닌가?
 * 왜 굳이 빼야 하는가?
 * 1. 다른곳에 재사용 하기 위해서?
 * 2. 글처럼 읽히는 코드를 위해서?
 * 3. "응집도를 위해서" -> 검증 로직은 핵심 비즈니스 로직이잖아~
 */

/**
 * Object.keys(errors).length > 0 이 못생겨 보이는 이유?
 * setError 라는게, 좀 걱정된다.
 *
 * 아래 로직이랑 멀어보일것 같아서?
 * const [error, setError] = useState("");
 *
 * 해결방법
 * - 글쎄다. 이방법밖에 없어보이는데
 *
 */

const validateEmail = (email: string): string | null => {
  if (!email.includes("@")) {
    return "Invalid email";
  }
  return null;
};

const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Too short";
  }
  return null;
};

function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    login(email, password);
  };
}
