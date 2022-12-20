const express = require("express");
const { deleteSingleFixtureById } = require("../../mySql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  const result = await req.getQuery(deleteSingleFixtureById(), [
    req.headers.fixture_id,
  ]);

  result.affectedRows === 1 ? res.send({ status: 1 }) : res.send({ status: 0 });
});

module.exports = router;
