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
app.use("/syncStore", require("./routes/userRoutes/syncStore"));
app.use("/login", require("./routes/userRoutes/logins"));
app.use("/createUser", require("./routes/userRoutes/createUser"));
app.use("/setUserType", require("./routes/userRoutes/setUserType"));

app.use("/test", require("./routes/userRoutes/testRoute"));

// Protected Routes
app.use("/", auth, require("./routes/userRoutes/getUsers"));
app.use("/managerProfile", auth, require("./routes/userRoutes/managerProfile"));
app.use("/parentProfile", auth, require("./routes/userRoutes/parentProfile"));
app.use("/addChild", auth, require("./routes/userRoutes/addChild"));

const port = process.env.PORT || 6005;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
