while (true) {
  const shouldProceed = confirm("계속할까요?");
  console.log("답변:", shouldProceed);
  if (!shouldProceed) break;
}

const name = prompt("이름이 뭐에요?"); // shows prompt
const age = prompt("몇살이에요?"); // shows prompt

alert(`당신은 ${name}, ${age}살입니다.`); // need to press Enter
