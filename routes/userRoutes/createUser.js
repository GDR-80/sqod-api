const express = require("express");
const { createUser } = require("../../mySql/queries");
const router = express.Router();
const sha256 = require("sha256");

router.post("/", async (req, res) => {
  let { name, email, phone, password } = req.body.currentUser;
  const { user_type } = req.body;

  //check we have all the data
  if (name && email && password && phone) {
    password = sha256(process.env.SALT + password);

    const result = await req.getQuery(createUser(), [
      name,
      email,
      phone,
      password,
      user_type,
    ]);

    if (result.affectedRows === 1) {
      res.send({ status: 1, result });
    } else {
      res.send({ status: 0, error: "Duplicate entry" });
    }

    return;
  }

  res.send({ status: 0, error: "Some data missing" });
});

module.exports = router;
