const express = require("express");
const auth = require("./middleware/auth");
const getQuery = require("./mysql/connection");
const app = express();
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//utility middleware
app.use((req, res, next) => {
  req.getQuery = getQuery;
  next();
});

app.use("/login", require("./routes/userRoutes/logins"));
app.use("/createUser", require("./routes/userRoutes/createUser"));
app.use("/setUserType", require("./routes/userRoutes/setUserType"));

// Protected Routes
app.use("/setApproved", auth, require("./routes/userRoutes/setApproved"));
app.use("/syncStore", auth, require("./routes/userRoutes/syncStore"));
app.use("/createFixture", auth, require("./routes/userRoutes/createFixture"));
app.use("/logOut", auth, require("./routes/userRoutes/logOut"));
app.use("/addChild", auth, require("./routes/userRoutes/addChild"));
app.use("/editTeam", auth, require("./routes/userRoutes/editTeam"));
app.use("/deleteTeam", auth, require("./routes/userRoutes/deleteTeam"));
app.use("/deleteFixture", auth, require("./routes/userRoutes/deleteFixture"));
app.use("/createTeam", auth, require("./routes/userRoutes/createTeam"));

const port = process.env.PORT || 6005;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
