const express = require("express");
const { addChild } = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  let { userInput, currentUserId } = req.body;

  console.log(req.body);

  for (let i = 0; i < userInput.length; i++) {
    const results = await req.getQuery(
      `INSERT INTO children
  (name, age, age_group, user_id, team_id)
  VALUES (?,?,?,?);
  `,
      [
        userInput.name,
        userInput.age,
        userInput.ageGroup,
        currentUserId,
        userInput.team,
      ]
    );
    console.log(results[i]);
  }

  res.send({ status: 1 });

  return;

  // if (results.length === 0) {
  //   res.send({ status: 0, error: "No one has been added to the database" });
  //   return;
  // }

  // res.send({ status: 1, result: results[0] });
});

module.exports = router;
