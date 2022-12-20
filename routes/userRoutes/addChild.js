const express = require("express");
const { addChild } = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  let { userInput, currentUserId } = req.body;
  let results;
  for (let i = 0; i < userInput.length; i++) {
    results = await req.getQuery(addChild(), [
      userInput[i].name,
      userInput[i].age,
      userInput[i].ageGroup,
      currentUserId,
      userInput[i].team,
    ]);
  }

  res.send({ status: 1 });

  if (results.length === 0) {
    res.send({ status: 0 });
    return;
  }
});

module.exports = router;
