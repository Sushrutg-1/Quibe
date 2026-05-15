import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/Users.model.js";

export const getAllCommentsByPost = async (req, res) => {
  try {
    const { token, postId } = req.body;
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const allComments = await Comment.find({ postId: postId });

    return res.status(200).json({ allComments });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCommentOfUser = async (req, res) => {
  try {
    const { token, commentId } = req.body;
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    if (user._id.toString() !== comment.userId.toString()) {
      return res.status(400).json({ message: "Unauthorized!" });
    }

    await Comment.deleteOne({ _id: commentId });
    return res.status(200).json({ message: "Comment Delete Successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
