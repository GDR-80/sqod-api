const express = require("express");
const { test } = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = 1;
  const results = await req.getQuery(test(), [userId]);

  res.send({ status: 1, results: results });
});

module.exports = router;
