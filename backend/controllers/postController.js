const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Post = require("../models/Post");
exports.getPosts = async (req, res, next) => {
  try {
    const limit = req.query.limit || 6;
    const startIndex = req.query.startIndex || 0;
    const order = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.author_id && { author_id: req.query.author_id }),
      ...(req.query.category && { category: req.query.category }),
    })
      .sort({ createdAt: order })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json({
      message: "Post list",
      status: 200,
      data: { posts },
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
exports.createPost = async (req, res, next) => {
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");

  const beforeSave = await Post({
    title: req.body.title,
    slug: slug,
    cover_image: req.body.cover_image,
    author_id: req.body.author_id,
    category: req.body.category,
    short_description: req.body.short_description,
    description: req.body.description,
    email: req.body.email || "", // Ensure email is not null
  });
  try {
    const savedPost = await beforeSave.save();
    res.status(201).json({
      message: "Post created",
      status: 200,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Post Deleted",
      status: 200,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
exports.likePost = async (req, res, next) => {
  const userId = req.query.userId;
  const postId = req.query.postId;
  try {
    if (!userId || !postId) {
      return res.status(400).json({
        message: "User ID and Post ID are required",
        status: 400,
      });
    }
    const isLiked = await Post.findOne({
      _id: postId,
      likes: { $in: [userId] },
    });
    const findPost = await Post.findOne({_id :postId});
    if(!findPost){
      const err = new Error("Post not found!");
      err.status=404;
      return next(err);
    }
    if (isLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({
        message: "Post unliked",
        status: 200,
      });
    } else {
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      res.status(200).json({
        message: "Post liked",
        status: 200,
      });
    }
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
