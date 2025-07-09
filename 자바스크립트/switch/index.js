const foo = (value) => {
  switch (value) {
    case 1:
      const msg = "hi"; // 여기서 선언하면
      break;
    case 2:
      console.log(msg); // 여기서 접근 시도하면 ReferenceError 🔥
      break;
  }
};

foo(1);
foo(2);

// eslint rules : no-case-declarations 사용하시오!
