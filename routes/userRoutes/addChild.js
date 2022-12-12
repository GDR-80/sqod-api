const express = require("express");
const { addChild } = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  let { userInput, currentUserId } = req.body;

  for (let i = 0; i < userInput.length; i++) {
    const results = await req.getQuery(
      `INSERT INTO children
  (name, age, age_group, user_id, team_id)
  VALUES (?,?,?,?,?);
  `,
      [
        userInput[i].name,
        userInput[i].age,
        userInput[i].ageGroup,
        currentUserId,
        userInput[i].team,
      ]
    );
  }

  res.send({ status: 1 });

  if (results.length === 0) {
    res.send({ status: 0, error: "No one has been added to the database" });
    return;
  }

  // res.send({ status: 1, result: results[0] });
});

module.exports = router;
