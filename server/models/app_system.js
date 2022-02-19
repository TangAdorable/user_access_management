const mongoose = require("mongoose");

const app_system = mongoose.Schema(
  {
    app_name: {
      type: String,
      require: true,
      unique: true,
    },
    name_access: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("app_system", app_system);
/* The above code is creating a schema for the app_system collection. */
