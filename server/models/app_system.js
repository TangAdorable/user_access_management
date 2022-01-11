const mongoose = require("mongoose");

const app_system = mongoose.Schema(
  {
    app_name: {
      type: String,
      require: true,
      unique: true,
    },
    Access: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("app_system", app_system);
