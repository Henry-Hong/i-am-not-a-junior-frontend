var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.headers["user-agent"]);
  res.send(req.headers["user-agent"]);
});

module.exports = router;
