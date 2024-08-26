(async () => {
  const rest = await fetch("https://www.naver.com");
  const text = await rest.text();

  console.log(text);
})();
