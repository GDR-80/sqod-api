const express = require("express");
// const { getTeamChildren } = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const results = await req.getQuery(
    `SELECT * FROM users
       WHERE id = ?;
  `,
    [req.headers.id]
  );

  res.send({ status: 1, fixtures: results });
});

module.exports = router;
