const { Router } = require("express");
const { IssueModel } = require("../models/Issue.model");
const cloudinary = require("cloudinary");
const { date } = require("../middelweres/date");
const { upload } = require("../middelweres/upload");
require("../middelweres/cloudinary");
const issue = Router();

issue.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let result = await IssueModel.findById({ _id });
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: "Something went wrong" });
  }
});
issue.get("/user/:username", async (req, res) => {
  let { username } = req.params;
  try {
    let result = await IssueModel.find({ allocated_to: username });
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: "Something went wrong" });
  }
});
issue.get("/", async (req, res) => {
  try {
    let result = await IssueModel.find();
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: "Something went wrong" });
  }
});

issue.post("/", upload.single("document"), async (req, res) => {
  let payload = req.body;
  payload.date = date;
  payload.allocated_to = "";
  payload.status = "";
  try {
    let { secure_url } = await cloudinary.v2.uploader.upload(req.file.path);

    payload.document = secure_url;

    let result = await IssueModel.create(req.body);
    
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: err.message });
  }
});

issue.patch("/:_id", async (req, res) => {
  let payload = req.body;
  let { _id } = req.params;

  try {
    let result = await IssueModel.findByIdAndUpdate(
      { _id },
      {
        $set: payload,
      },
      {
        new: true,
        useFindAndModify: true,
      }
    );
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { issue };
