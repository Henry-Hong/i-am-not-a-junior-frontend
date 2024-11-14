/**
 * @fileoverview get current bitcoin price
 * @author devheerim
 */
"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', 
    docs: {
      description: "get current bitcoin price",
      recommended: false,
      url: null, 
    },
    fixable: null, 
    schema: [], 
    messages: {
      "message-id-1": "🪙 Current bitcoin price is {{price}}"
    },
  },

  create(context) {
    async function getCurrentBitcoinPrice() {

      const options = {method: 'GET', headers: {accept: 'application/json'}};
      const URL = "https://api.bithumb.com/public/ticker/ALL";
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      const response = await fetch(URL, options);
      const {data} = await response.json();

      const sourceCode = context.sourceCode;
      const comments = sourceCode.getAllComments();
      comments.forEach((comment) => {
        if (comment.value.includes("bitcoin")) {

          context.report({
            node: comment,
            messageId: "message-id-1",
            data: { price:  JSON.stringify(data)},
          });
        }
      });
    }
    return {
      Program: async () => {
        await getCurrentBitcoinPrice();
      }
    };
  },
};
