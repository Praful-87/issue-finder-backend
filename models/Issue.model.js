const mongoose = require("mongoose");

const issueScema = mongoose.Schema(
  {
    product_type: { type: String, required: true },
    username: { type: String, required: true },
    issues: { type: Array, required: true },
    document: { type: String, required: true },
    description: { type: String, required: true },

    allocated_to: { type: String },
    date: { type: String, required: true },
    status: { type: String },
  },
  {
    versionKey: false,
  }
);

const IssueModel = mongoose.model("issue", issueScema);

module.exports = { IssueModel };
