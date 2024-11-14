/**
 * @fileoverview -
 * @author devheerim
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "-",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      "default": "Use const instead of let / var"
    }, // Add messageId and message
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      VariableDeclaration: (node) => {
        if(node.kind !== 'let') return;
        const firstToken = context.sourceCode.getFirstToken(node);
        context.report({
          node: node,
          messageId: 'default',
          fix: function(fixer) {
            console.log(node);
            return fixer.replaceText(firstToken, "const");
          }
        })
      }
    };
  },
};
