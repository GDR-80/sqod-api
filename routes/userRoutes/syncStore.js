const express = require("express");
const {
  checkCreds,
  addToken,
  getUser,
  getChildren,
  getTeams,
  getUserTeams,
  getUsers,
  getFixtures,
} = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const userData = await req.getQuery(getUser(), [req.headers.token]);
  console.log(userData[0].userType, "<<<<<<<>>>>>>");
  if (userData[0].userType === 1) {
    const childrenData = await req.getQuery(getChildren(), [userData[0].id]);
    userData[0].children = childrenData;
    console.log("*******", userData[0].children);
  }
  if (userData[0].user_type === 0) {
    const teamData = await req.getQuery(getUserTeams(), [userData[0].id]);
    const t = [];
    teamData.forEach((item) => {
      t.push(item.id);
    });

    userData[0].teams = t;

    const children = await req.getQuery(
      `SELECT * FROM children
      ;
    `
    );

    const c = [];
    children.forEach((child) => {
      if (t.includes(child.team_id)) {
        c.push(child);
      }
    });

    userData[0].children = c;
  }

  // Get initial team data
  const teams = await req.getQuery(getTeams());

  for (let i = 0; i < teams.length; i++) {
    const [address] =
      await req.getQuery(`SELECT id, line1, line2, city, postcode AS postCode FROM addresses
                          WHERE id = ${teams[i].address_id}
                          LIMIT 1;                                      
  `);

    teams[i].venue = { address };
  }

  const fixtures = await req.getQuery(getFixtures());

  for (let f = 0; f < fixtures.length; f++) {
    const [home] =
      await req.getQuery(`SELECT users.name, phone, teams.id FROM users
                                        JOIN teams
                                            ON teams.user_id = users.id
                                          WHERE teams.id = ${fixtures[f].homeTeamId}`);

    const [away] =
      await req.getQuery(`SELECT users.name, phone, teams.id FROM users
                                        JOIN teams
                                            ON teams.user_id = users.id
                                              WHERE teams.id = ${fixtures[f].awayTeamId}`);
    fixtures[f].managers = { home, away };
  }

  res.send({ status: 1, currentUser: userData[0], teams, fixtures });
});

module.exports = router;
