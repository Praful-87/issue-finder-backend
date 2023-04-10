const mongoose = require("mongoose");

const userScema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userScema);

module.exports = { UserModel };
