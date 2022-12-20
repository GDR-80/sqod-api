const express = require("express");
const {
  deleteTeam,
  deleteAddress,
  deleteFixture,
  deleteChildren,
} = require("../../mySql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  await req.getQuery(deleteAddress(), [req.headers.team_id]);
  await req.getQuery(deleteFixture(), [
    req.headers.team_id,
    req.headers.team_id,
  ]);
  await req.getQuery(deleteChildren(), [req.headers.team_id]);
  const results = await req.getQuery(deleteTeam(), [req.headers.team_id]);

  results.affectedRows === 1
    ? res.send({ status: 1 })
    : res.send({ status: 0 });
});

module.exports = router;
