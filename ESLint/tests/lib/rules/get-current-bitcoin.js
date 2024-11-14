/**
 * @fileoverview get current bitcoin price
 * @author devheerim
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/get-current-bitcoin"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("get-current-bitcoin", rule, {
  valid: [
    {
      code: "helloworld"
    }
  ],

  invalid: [
    {
      code: `// bitcoin`,
      errors: [{ messageId: "message-id-1" }],
    },
  ],
});
