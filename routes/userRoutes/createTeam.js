const express = require("express");
const {
  createAddress,
  createTeam,
  updateAddressTeamId,
} = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userInput, currentUser } = req.body;

  // NEEDS TEAM ID
  const address = await req.getQuery(createAddress(), [
    userInput.line1,
    userInput.line2,
    userInput.city,
    userInput.postCode,
  ]);
  const teams = await req.getQuery(createTeam(), [
    userInput.name,
    userInput.ageGroup,
    address.insertId,
    currentUser,
  ]);

  await req.getQuery(updateAddressTeamId(), [teams.insertId]);
  res.send({ status: 1 });
});

module.exports = router;
