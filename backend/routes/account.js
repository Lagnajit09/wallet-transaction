const express = require("express");
const { Accounts, User } = require("../db/db");
const { authMiddleware } = require("../middleware/auth");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userAccount = await Accounts.findOne({ userId: req.user.userId });
  res.json({
    balance: userAccount.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { to, amount } = req.body;

  console.log(to, amount);

  // Fetch the accounts within the transaction
  const account = await Accounts.findOne({ userId: req.user.userId }).session(
    session
  );

  parsedAmount = parseInt(amount);

  if (!account || account.balance < parsedAmount) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      message: "Insufficient balance",
    });
  }

  const toAccount = await User.findOne({ username: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Accounts.updateOne(
    { userId: req.user.userId },
    { $inc: { balance: -parsedAmount } }
  ).session(session);
  await Accounts.updateOne(
    { userId: toAccount._id },
    { $inc: { balance: parsedAmount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    success: true,
    message: "Transfer successful",
  });
});

module.exports = router;
