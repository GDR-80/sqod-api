const express = require("express");
const { getChildren } = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const results = await req.getQuery(getChildren(), [req.headers.id]);
  res.send({ status: 1, children: results });
});

module.exports = router;
