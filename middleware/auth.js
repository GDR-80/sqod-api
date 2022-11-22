const { checkToken } = require("../mySql/queries");

module.exports = auth = async (req, res, next) => {
  const { token } = req.headers;
  const results = await req.getQuery(checkToken(), [token]);
  if (results.length === 1) {
    next();
    return;
  }

  res.send({ status: 0, message: "Hey! invalid token" });
  console.log(results);
};
