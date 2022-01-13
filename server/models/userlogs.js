const mongoose = require("mongoose");

const userlogs = mongoose.Schema(
  {
    UserID: {
        type: String,
        require: true,
      },
    App_name: {
      type: String,
      require: true,
    },
    Access: [],
    App_status: {
        type:String,
        default:"Enable"
    },
    TicketID: String,
    Note:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("userlogs", userlogs);