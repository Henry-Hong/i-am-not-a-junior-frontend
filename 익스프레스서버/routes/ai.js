var express = require("express");
var router = express.Router();

router.get("/chat", async function (req, res, next) {
  const { num } = req.query;
  await new Promise((res) => setTimeout(res, 500));
  res.json(`llm generated chat, number is ${num}`);
});

module.exports = router;
