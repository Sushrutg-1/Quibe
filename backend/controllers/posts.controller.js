import Post from "../models/post.model.js";
import User from "../models/Users.model.js";
import { UserSchema } from "../Schema/user.schema.js";

export const activeCheck = (req, res) => {
  res.status(200).json({ message: "Server is running" });
};

export const createPost = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const post = new Post({
      userId: user._id,
      body: req.body.body,
      media: req.file != undefined ? req.file.filename : "",
      fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
    });

    await post.save();
    return res.status(200).json({ message: "Post Created!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    return res.status(200).json({ allPosts });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { token, postId } = req.body;

    const user = await User.findOne({ token: token }).select("_id");
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(400).json({ message: "Post not found!" });
    }

    if (post.userId.toString() !== user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized!" });
    }

    await Post.deleteOne({ _id: post._id });
    return res.status(200).json({ message: "Post delete successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const incrementLikes = async (req, res) => {
  try {
    const { token, postId } = req.body;
    const user = await User.findOne({ token: token }).select("_id");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const post = await findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    post.likes += 1;

    await post.save();
    return res.status(200).json({ message: "Like Increments!" });
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------Comments Controllers--------------------------------------------------------
