const express = require("express");
// const { getTeam } = require("../../mySql/queries");
const router = express.Router();

router.put("/", async (req, res) => {
  const { userInput, currentUser, teamId, addressId } = req.body;
  const address = await req.getQuery(
    `UPDATE addresses
        SET
            line1 = ?,
            line2 = ?,
            city = ?,
            postcode = ?
                WHERE team_id = ?;
  `,
    [
      userInput.line1,
      userInput.line2,
      userInput.city,
      //   userInput.county,
      //   userInput.country,
      userInput.postCode,
      teamId,
    ]
  );
  const teams = await req.getQuery(
    `UPDATE teams
        SET
         name = ?,
         age_group = ?
         WHERE address_id = ?;
    `,
    [userInput.name, userInput.ageGroup, addressId]
  );

  res.send({ status: 1 });
});

module.exports = router;
