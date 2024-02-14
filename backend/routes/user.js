const express = require("express");
const { z, ZodError } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/db");
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
      },
      JWT_SECRET
    );

    res.status(200).json({
      newUser,
      token,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
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

module.exports = router;
