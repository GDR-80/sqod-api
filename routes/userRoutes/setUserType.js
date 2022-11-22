const express = require("express");
const { checkCreds, setUserType } = require("../../mySql/queries");
const router = express.Router();
const sha256 = require("sha256");

router.put("/", async (req, res) => {
  let { email, password } = req.body;

  const userType = 1;

  password = sha256(process.env.SALT + password);

  const results = await req.getQuery(checkCreds(), [email, password]);

  if (results.length === 1) {
    await req.getQuery(setUserType(), [userType, email, password]);
    res.send({ status: 1 });
  } else {
    res.send({ status: 0 });
  }

  return;
});

module.exports = router;
