const express = require("express");
const { removeToken } = require("../../mySql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  const results = await req.getQuery(removeToken(), [req.headers.token]);
  results.affectedRows === 1
    ? res.send({ status: 1 })
    : res.send({ status: 0 });
});

module.exports = router;
