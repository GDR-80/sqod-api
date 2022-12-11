const express = require("express");
const { deleteSingleFixtureById } = require("../../mySql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  if (req.headers.token) {
    const result = await req.getQuery(deleteSingleFixtureById(), [
      req.body.fixtureId,
    ]);

    result.affectedRows === 1
      ? res.send({ status: 1 })
      : res.send({ status: 0, error: "error while trying to delete" });
    return;
  }

  res.send({ status: 0, error: "error while trying to delete" });
});

module.exports = router;
