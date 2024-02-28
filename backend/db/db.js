const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: { type: String, required: true, trim: true, maxLength: 30 },
  lastName: { type: String, required: true, trim: true, maxLength: 30 },
  password: { type: String, required: true, minLength: 6 },
});

const AccountsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accounts", AccountsSchema);

module.exports = {
  User,
  Accounts,
};
