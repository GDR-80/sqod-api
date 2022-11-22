const express = require("express");
const { addChild } = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  let { name, age, age_group, user_id, team_id } = req.body;
  const { token } = req.headers;
  const results = await req.getQuery(addChild(), [
    token,
    name,
    age,
    age_group,
    user_id,
    team_id,
  ]);
  console.log(results);
  if (results.length === 0) {
    res.send({ status: 0, error: "No one has been added to the database" });
    return;
  }

  res.send({ status: 1, result: results[0] });
});

module.exports = router;
