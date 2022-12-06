const express = require("express");
const { getTeam } = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userInput, currentUser } = req.body;
  const address = await req.getQuery(
    `INSERT INTO addresses
  (line1, line2, city, postcode)
  VALUES (?,?,?,?)
  `,
    [
      userInput.line1,
      userInput.line2,
      userInput.city,
      //   userInput.county,
      //   userInput.country,
      userInput.postCode,
    ]
  );
  const teams = await req.getQuery(
    `INSERT INTO teams
    (name, age_group, address_id, user_id)
    VALUES (?,?,?,?)
    `,
    [userInput.name, userInput.ageGroup, address.insertId, currentUser]
  );

  //   const newTeams = await req.getQuery(getTeam());

  res.send({ status: 1 });
});

module.exports = router;
