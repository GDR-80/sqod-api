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
const sha256 = require("sha256");
const { v4: uuid } = require("uuid");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(process.env.SALT + password);

  const results = await req.getQuery(checkCreds(), [email, password]);

  if (results.length === 1) {
    const token = uuid();
    await req.getQuery(addToken(), [results[0].id, token]);

    const userData = await req.getQuery(getUser(), [token]);

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

    res.send({ status: 1, token, userData: userData[0], teams, fixtures });
  } else {
    res.send({ status: 0, message: "something is broken 😵‍💫" });
  }
});

module.exports = router;
