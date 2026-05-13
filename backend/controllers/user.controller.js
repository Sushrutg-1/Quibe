import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../models/Users.model.js";
import Profile from "../models/profile.model.js";

export const register = async (req, res) => {
  try {
    let { username, email, password, name } = req.body;
    if (!name || !username || !password || !name) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.json({ message: "User already Exist!" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.json({ message: "User already Exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    const profile = new Profile({
      userId: user._id,
    });

    await profile.save();

    return res.status(200).json({ message: "User register successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All field requred!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = await crypto.randomBytes(32).toString("hex");
    user.token = token;
    await user.save();

    // (await User.updateOne({ _id: user._id }), { token });

    return res.status(200).json({ token: token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
