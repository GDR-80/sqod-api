const express = require("express");
const { createFixture } = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userInput, teamId } = req.body;
  const meetTime = `${userInput.date} ${userInput.meetTime}`;
  const kickOff = `${userInput.date} ${userInput.kickOff}`;
  let homeTeamId;
  let awayTeamId;

  if (userInput.venue === "home") {
    homeTeamId = teamId;
    awayTeamId = userInput.opposition;
  } else if (userInput.venue === "away") {
    homeTeamId = userInput.opposition;
    awayTeamId = teamId;
  }

  const result = await req.getQuery(createFixture(), [
    meetTime,
    kickOff,
    homeTeamId,
    awayTeamId,
  ]);

  result.affectedRows === 1 ? res.send({ status: 1 }) : res.send({ status: 0 });

  return;
});

module.exports = router;
