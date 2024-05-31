// @ts-nocheck
// index.d.ts 파일을 직접 만들어줘야함
import "./style.css";

import { $ } from "mini-query";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <button class='btn'>button1</button>
    <button class='btn'>button2</button>
    <button class='btn'>button3</button>
    <button class='btn'>button4</button>
    <button class='btn'>button5</button>
  </div>
`;

console.log($(".btn").length());
$(".btn").click(() => console.log("clicked!"));
$(".btn").mouseover(() => console.log("over"));
