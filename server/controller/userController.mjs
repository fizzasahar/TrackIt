import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";
import "dotenv/config";
import JWT from "jsonwebtoken";
import userSchema from "../schema/userSchema.mjs";
import chalk from "chalk";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        var token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET);

        res
          .status(200)
          .json({ status: 200, message: "Login Successfull", user, token });
      } else {
        res.status(401).json({ status: 401, message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err, status: 400 });
  }
};
const createUser = async (req, res) => {
  console.log(chalk.bgCyan("incoming call to signup api"));
  if (!req.body) {
    return req.status(400).json({ message: "Bad request" });
  }
  try {
    const user = await userSchema.validateAsync(req.body);
    const password = await bcrypt.hash(user.password, 10);
    const newUser = await User.create({ ...user, password: password });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "Duplicate email - Email already exists",
        error: error.message,
      });
    }
    console.error(chalk.bgRed("Signup Error:"), error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};





const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments();

    res.status(200).json({
      status: 200,
      total,
      page: Number(page),
      limit: Number(limit),
      users,
    });
  } catch (err) {
    res.status(400).json({ error: err, status: 400 });
  }
};

const getLoggedInUser = async (req, res) => {
  try {

    const { userId } = req.user
    // The tokenVerification middleware already decodes the token and attaches the user's email to `req.user`
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    res.status(200).json({ status: 200, user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err, status: 400 });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(400).json({ error: err, status: 400 });
  }
};



// forgot password
const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  login,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getLoggedInUser,
  forgotPassword
};

