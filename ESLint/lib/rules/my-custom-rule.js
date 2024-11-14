/**
 * @fileoverview my rule
 * @author devheerim
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", 
    docs: {
      description: "my rule",
      recommended: false,
      url: null, 
    },
    fixable: null, 
    schema: [], 
    messages: {
      "my-custom-rule-id": "Current time is {{time}} 😊",
    },
  },

  create(context) {
    function checkCommentsWithAskingTime() {
      const sourceCode = context.sourceCode;
      const comments = sourceCode.getAllComments();
      comments.forEach((comment) => {
        if (comment.value.includes("what time is it")) {
          context.report({
            node: comment,
            messageId: "my-custom-rule-id",
            data: { time: new Date().toLocaleTimeString() },
          });
        }
      });
    } 

    return {
      Program: () => {
        checkCommentsWithAskingTime();
      },
    };
  },
};
