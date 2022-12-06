const express = require("express");
const { deleteTeam } = require("../../mySql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  if (req.headers.token) {
    const results = await req.getQuery(deleteTeam(), [req.body.teamId]);

    results.affectedRows === 1
      ? res.send({ status: 1 })
      : res.send({ status: 0, error: "error while trying to delete" });
    return;
  }

  res.send({ status: 0, error: "error while trying to delete" });
});

module.exports = router;
