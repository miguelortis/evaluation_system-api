require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkRequiredFields } = require("../utils/validationUtils");

/**
 * Register a new user
 * URL: POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    checkRequiredFields(req.body, ["name", "lastName", "email", "password"]);

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res.status(400).send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, lastName, email, password: hashedPassword });
    await user.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Login a user
 * URL: POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    checkRequiredFields(req.body, ["email", "password"]);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Invalid login credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).send("Invalid login credentials");
    }
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        name: user.name,
        lastName: user.lastName,
      },
      `${process.env.SECRET_KEY}`,
      {
        expiresIn: "30d",
      }
    );
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  login,
  register,
};
