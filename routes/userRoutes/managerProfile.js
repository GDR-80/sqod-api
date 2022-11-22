const express = require("express");
const { getManagerProfile } = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await req.getQuery(getManagerProfile(), [req.headers.token]);
  if (result.length === 0) {
    res.send({ status: 0, error: "No user found" });
    return;
  }

  res.send({ status: 1, result: result[0] });
});

module.exports = router;
