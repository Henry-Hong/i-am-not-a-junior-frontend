/**
 * @fileoverview my rule
 * @author devheerim
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/my-custom-rule"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("my-custom-rule", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: `helloworld`,
    },
  ],

  invalid: [
    {
      code: `/*what time is it*/`,
      errors: [{ messageId: "my-custom-rule-id1" }],
    },
  ],
});
