const express = require("express");
const { getParentProfile } = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const results = await req.getQuery(getParentProfile(), [req.headers.token]);
  console.log(results);
  if (results.length === 0) {
    res.send({ status: 0, error: "No user found" });
    return;
  }

  res.send({ status: 1, result: results[0] });
});

module.exports = router;
