const mongoose = require("mongoose");

const employees = mongoose.Schema(
  {
    UserID: {
      type: String,
      require: true,
      unique: true,
    },
    FirstName: {
      type: String,
      require: true,
    },
    LastName: {
      type: String,
      require: true,
    },
    JobTitle: {
      type: String,
      require: true,
    },
    Department: {
      type: String,
      require: true,
    },
    CreatorBy: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employees", employees);