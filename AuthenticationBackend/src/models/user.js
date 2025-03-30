const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      
    },
    email: {
      type: String,
     
    },
    password: {
      type: String,
     
        },
    googleId: {
        type:String,
    },
    resetToken: {
      type: String,
    },
     resetTokenExpiry: {
        type: Date,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
