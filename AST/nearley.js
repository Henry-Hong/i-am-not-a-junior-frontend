// https://gajus.medium.com/parsing-absolutely-anything-in-javascript-using-earley-algorithm-886edcc31e5e
const nearley = require("nearley");
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed("foo\n");

// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results)); // [[[[["foo"],"\n"]]]]
