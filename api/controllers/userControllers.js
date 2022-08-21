const router = require("express").Router();

const registerHandler = (req, res) => {
  res.send("REGISTER PAGE");
  res.end();
};

router.get("/register", registerHandler);

module.exports = router;
