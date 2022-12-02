const express = require("express");
const { setApproved } = require("../../mySql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  const results = await req.getQuery(setApproved(), [
    req.body.isApproved,
    req.body.id,
  ]);

  if (results.changedRows === 0) {
    res.send({ status: 0 });
    return;
  }
  res.send({ status: 1 });
});

module.exports = router;
