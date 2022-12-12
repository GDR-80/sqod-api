const express = require("express");
const {
  deleteTeam,
  deleteAddress,
  deleteFixture,
} = require("../../mySql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  const results = await req.getQuery(deleteTeam(), [req.body.teamId]);
  await req.getQuery(deleteAddress(), [req.body.teamId]);
  await req.getQuery(deleteFixture(), [req.body.teamId, req.body.teamId]);

  results.affectedRows === 1
    ? res.send({ status: 1 })
    : res.send({ status: 0 });
});

module.exports = router;
