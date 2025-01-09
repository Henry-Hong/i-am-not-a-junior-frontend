/**
 * moo is highily-optimised tokenizer / lexer generator.
 * moo 로 토큰화 한다음, 토큰을 파싱해서 트리를 만든다.
 */
const moo = require("moo");

let lexer = moo.compile({
  lparen: "(",
  rparen: ")",
  number: /0|-?[1-9][0-9]*/,
  alphabet: /[a-zA-Z]+/,
  WS: /[ \t]+/,
});

lexer.reset("while(10) cows moo");

while (true) {
  const output = lexer.next();
  if (output === undefined) break;
  console.log(output);
}
