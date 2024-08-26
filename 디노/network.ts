// const res = await fetch("https://www.githubstatus.com/api/v2/status.json");
const res = await fetch("https://www.naver.com");
const text = await res.text();

console.log(text);
