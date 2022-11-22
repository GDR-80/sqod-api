const express = require("express");
const {
  checkCreds,
  addToken,
  getUser,
  getChildren,
  getTeam,
  getUserTeams,
} = require("../../mySql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.headers.token);
  const userData = await req.getQuery(getUser(), [req.headers.token]);

  if (userData[0].user_type === 1) {
    const childrenData = await req.getQuery(getChildren(), [userData[0].id]);
    userData[0].children = childrenData;
  }
  if (userData[0].user_type === 0) {
    const teamData = await req.getQuery(getUserTeams(), [userData[0].id]);
    const t = [];
    teamData.forEach((item) => {
      t.push(item.id);
    });

    userData[0].teams = t;
  }
  // Get initial team data
  const teams = await req.getQuery(getTeam());

  const fixtures = await req.getQuery(`SELECT * FROM fixtures;
    `);

  res.send({ status: 1, userData: userData[0], teams, fixtures });
});

module.exports = router;
