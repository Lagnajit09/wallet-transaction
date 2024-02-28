const express = require("express");
const { z, ZodError } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Accounts } = require("../db/db");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = z.object({
  username: z.string().email(),
  firstName: z.string().max(30),
  lastName: z.string().max(30),
  password: z.string().min(8),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
  //   .regex(
  //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
  //     {
  //       message:
  //         "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number",
  //     }
  //   ),
});

const updateBody = z.object({
  firstName: z.string().max(30).optional(),
  lastName: z.string().max(30).optional(),
  password: z.string().min(8).optional(),
});

router.post("/signup", async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    res.status(405).json({
      message: "User already exists!",
    });
  }
  try {
    const userData = signupSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await new User({
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: hashedPassword,
    });

    await newUser.save();

    const userId = newUser._id;

    const token = jwt.sign(
      {
        userId,
        username,
      },
      JWT_SECRET
    );

    //11
    const balance = Math.floor(Math.random() * 10001);
    const newUserBalance = await new Accounts({
      userId,
      balance,
    });
    await newUserBalance.save();

    res.status(200).json({
      newUser,
      token,
      balance,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(411).json({
        success: false,
        message: "Invalid input!",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Oh! Something went wrong...",
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  if (!user) {
    return res.status(411).json({
      message: "User doesn't exist! Please Signup.",
    });
  }

  try {
    const userId = user._id;
    const token = jwt.sign({ userId, username }, JWT_SECRET);

    return res.json({
      token,
    });
  } catch (error) {
    return res.status(411).json({
      message: "Error while logging in!",
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information.",
    });
  }

  const { password, firstName, lastName } = req.body;
  const username = req.user.username;

  const user = await User.findOne({ username });
  // console.log(user);

  const hashedPassword = password ? await bcrypt.hash(password, 10) : password;

  await User.updateOne(
    { username },
    {
      $set: {
        username: user.username,
        password: hashedPassword || user.password,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
      },
    }
  );
  res.json({
    message: "Updated successfully!",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });
  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
