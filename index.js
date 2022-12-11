const express = require("express");
const auth = require("./middleware/auth");
const getQuery = require("./mysql/connection");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//utility middleware
app.use((req, res, next) => {
  req.getQuery = getQuery;
  next();
});

app.use("/createTeam", require("./routes/userRoutes/createTeam"));
app.use("/setApproved", require("./routes/userRoutes/setApproved"));
app.use("/syncStore", require("./routes/userRoutes/syncStore"));
app.use("/login", require("./routes/userRoutes/logins"));
app.use("/createUser", require("./routes/userRoutes/createUser"));
app.use("/createFixture", require("./routes/userRoutes/createFixture"));
app.use("/setUserType", require("./routes/userRoutes/setUserType"));
app.use("/logOut", require("./routes/userRoutes/logOut"));
app.use("/addChild", require("./routes/userRoutes/addChild"));
app.use("/editTeam", require("./routes/userRoutes/editTeam"));

// Protected Routes

app.use("/", auth, require("./routes/userRoutes/getUsers"));
app.use("/deleteTeam", auth, require("./routes/userRoutes/deleteTeam"));
app.use("/deleteFixture", auth, require("./routes/userRoutes/deleteFixture"));

const port = process.env.PORT || 6005;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
