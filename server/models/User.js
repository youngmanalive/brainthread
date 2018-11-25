const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      required: [true, "can't be blank"],
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    headline: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);
