const express = require("express");
const { getTeam } = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userInput, currentUser } = req.body;

  // NEEDS TEAM ID
  const address = await req.getQuery(
    `INSERT INTO addresses
  (line1, line2, city, postcode)
  VALUES (?,?,?,?)
  `,
    [
      userInput.line1,
      userInput.line2,
      userInput.city,
      userInput.postCode,
      // teams.insertId, <<<<<< can't access before it's created
    ]
  );
  const teams = await req.getQuery(
    `INSERT INTO teams
    (name, age_group, address_id, user_id)
    VALUES (?,?,?,?)
    `,
    [userInput.name, userInput.ageGroup, address.insertId, currentUser]
  );

  res.send({ status: 1 });
});

module.exports = router;
