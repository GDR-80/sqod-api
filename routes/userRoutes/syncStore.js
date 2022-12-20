const express = require("express");
const {
  getUser,
  getChildren,
  getAllChildren,
  getTeams,
  getUserTeams,
  getTeamById,
  getTeamAddress,
  getFixtures,
} = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const userData = await req.getQuery(getUser(), [req.headers.token]);
  if (userData[0].userType === 1) {
    const childrenData = await req.getQuery(getChildren(), [userData[0].id]);
    userData[0].children = childrenData;
  }
  if (userData[0].userType === 0) {
    const teamData = await req.getQuery(getUserTeams(), [userData[0].id]);
    const t = [];
    teamData.forEach((item) => {
      t.push(item.id);
    });

    userData[0].teams = t;

    const children = await req.getQuery(getAllChildren());

    const c = [];
    children.forEach((child) => {
      if (t.includes(child.teamId)) {
        c.push(child);
      }
    });

    userData[0].children = c;
  }

  // Get initial team data
  const teams = await req.getQuery(getTeams());

  for (let i = 0; i < teams.length; i++) {
    const [address] = await req.getQuery(getTeamAddress(), [
      teams[i].addressId,
    ]);

    teams[i].venue = { address };
  }

  const fixtures = await req.getQuery(getFixtures());

  for (let f = 0; f < fixtures.length; f++) {
    const [home] = await req.getQuery(getTeamById(), [fixtures[f].homeTeamId]);

    const [away] = await req.getQuery(getTeamById(), [fixtures[f].awayTeamId]);

    fixtures[f].managers = { home, away };
  }

  res.send({ status: 1, currentUser: userData[0], teams, fixtures });
});

module.exports = router;
