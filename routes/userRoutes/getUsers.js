const express = require("express");
const { getUsers } = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const results = await req.getQuery(getUsers());

  res.send({ status: 1, result: results });
});

module.exports = router;
