const express = require("express");
const { connection } = require("./config/db");
const app = express();
const cors = require("cors");
const { user } = require("./routes/user.router");
const { issue } = require("./routes/issues.route");

app.listen(8000, async () => {
  try {
    await connection;
    console.log("connected to db and listening on port 8000");
  } catch (er) {
    console.log("not connected to db");
    console.log(er.message);
  }
});

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("issue homepage");
});

app.use("/user", user);
app.use("/issue", issue);
