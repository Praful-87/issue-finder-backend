const { Router } = require("express");
const { UserModel } = require("../models/user.model");

const user = Router();

user.post("/register", async (req, res) => {
  try {
    let result = await UserModel.create(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("username already taken or something went wrong");
    // console.log(error.message);
  }
});

user.post("/login", async (req, res) => {
  let { username, type, password } = req.body;
  // console.log(req.body);
  try {
    let [result] = await UserModel.find({ username, password });
    if (result.type !== type)
      return res.status(404).send(` Please login as ${result.type}`);
    res.status(200).send("Login Successfull");
  } catch (error) {
    res.status(404).send(" something went wrong");
    // console.log(error.message);
  }
});

module.exports = { user };
