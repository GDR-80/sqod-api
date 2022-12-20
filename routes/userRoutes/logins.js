const express = require("express");
const { checkCreds, addToken } = require("../../mySql/queries");
const router = express.Router();
const sha256 = require("sha256");
const { v4: uuid } = require("uuid");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(process.env.SALT + password);

  const results = await req.getQuery(checkCreds(), [email, password]);

  if (results.length === 1) {
    const token = uuid();
    await req.getQuery(addToken(), [results[0].id, token]);

    res.send({ status: 1, token });
  } else {
    res.send({ status: 0, message: "something is broken 😵‍💫" });
  }
});

module.exports = router;
