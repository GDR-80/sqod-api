const express = require("express");
const {
  deleteTeam,
  deleteAddress,
  deleteFixture,
} = require("../../mySql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  if (req.headers.token) {
    const address = await req.getQuery(deleteAddress(), [req.body.teamId]);
    const results = await req.getQuery(deleteTeam(), [req.body.teamId]);
    const fixture = await req.getQuery(deleteFixture(), [
      req.body.teamId,
      req.body.teamId,
    ]);

    results.affectedRows === 1 &&
    address.affectedRows === 1 &&
    fixture.affectedRows === 1
      ? res.send({ status: 1 })
      : res.send({ status: 0, error: "error while trying to delete" });
    return;
  }

  console.log(status);

  res.send({ status: 0, error: "error while trying to delete" });
});

module.exports = router;
