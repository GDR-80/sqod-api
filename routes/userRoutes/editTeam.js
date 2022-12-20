const express = require("express");
const { updateAddress, updateTeam } = require("../../mySql/queries");
const router = express.Router();

router.put("/", async (req, res) => {
  const { userInput, teamId, addressId } = req.body;

  const address = await req.getQuery(updateAddress(), [
    userInput.line1,
    userInput.line2,
    userInput.city,
    //   userInput.county,
    //   userInput.country,
    userInput.postCode,
    teamId,
  ]);

  const teams = await req.getQuery(updateTeam(), [
    userInput.name,
    userInput.ageGroup,
    addressId,
  ]);

  res.send({ status: 1 });
});

module.exports = router;
