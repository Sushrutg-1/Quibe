import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";

import User from "../models/Users.model.js";
import Profile from "../models/profile.model.js";

const convertUserDataToPDF = (userData) => {
  const doc = new PDFDocument();
  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("/uploads" + outputPath);

  doc.pipe(stream);

  doc.image(`uploads/${userData.userId.profilePicture}`, {
    align: "center",
    width: 200,
  });
  doc.fontSize(16).text(`Name : ${userData.userId.name}`);
  doc.fontSize(16).text(`Username : ${userData.userId.username}`);
  doc.fontSize(16).text(`Email : ${userData.userId.email}`);
  doc.fontSize(16).text(`Bio : ${userData.bio}`);
  doc.fontSize(16).text(`Current Position : ${userData.currentPost}`);

  doc.fontSize(16).text(`Past Work : `);
  userData.pastWork.forEach((work, index) => {
    doc.fontSize(16).text(`Company : ${work.company}`);
    doc.fontSize(16).text(`Position : ${work.position}`);
    doc.fontSize(16).text(`Years : ${work.years}`);
  });

  doc.fontSize(16).text(`Education : `);
  userData.education.forEach((edu, index) => {
    doc.fontSize(16).text(`school : ${edu.school}`);
    doc.fontSize(16).text(`Degree : ${edu.degree}`);
    doc.fontSize(16).text(`field Of Study : ${edu.fieldOfStudy}`);
  });

  doc.end();
  return outputPath;
};

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

export const uploadProfilePicture = async (req, res) => {
  try {
    let { token } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    user.profilePicture = req.file.filename;
    await user.save();

    return res.status(200).json({ message: "Profile pictute updated!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    let { token, ...newUserData } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const { email, username } = newUserData;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser || String(existingUser._id) !== String(user._id)) {
        return res.json({ message: "User already exist!" });
      }
    }

    Object.assign(user, newUserData);
    await user.save();

    return res.status(200).json({ message: "User update successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserAndProfile = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name email username profilePicture",
    );

    return res.status(200).json({ userProfile: userProfile });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const profileToUpdate = await Profile.findOne({ userId: user._id });

    Object.assign(profileToUpdate, newProfileData);

    await profileToUpdate.save();

    return res.status(200).json({ message: "Profile update successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ messge: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let allProfiles = await Profile.find().populate(
      "userId",
      "name username email profilePicture",
    );

    return res.status(200).json(allProfiles);
  } catch (error) {}
};

export const downloadResume = async (req, res) => {
  try {
    let userId = req.query.id;

    const userProfile = await Profile.findOne({ userId: userId }).populate(
      "userId",
      "name username email profilePicture",
    );

    const outputPath = await convertUserDataToPDF(userProfile);

    return res.status(200).json({ message: outputPath });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
