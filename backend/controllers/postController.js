const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Post = require("../models/Post");
const User = require("../models/User");
const Reply=require('../models/Reply')
exports.getPosts = async (req, res, next) => {
  try {
   
    // const startIndex = req.query.startIndex || 0;
    const order = req.query.order === "asc" ?  1 :-1;
     const limit = req.query.limit || 10;
     const page = req.query.page || 1;
     const skip = (page - 1) * limit;
 
    const posts = await Post.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.author_id && { author_id: req.query.author_id }),
      ...(req.query.category && { category:  req.query.category }),
    })
      .sort({ createdAt: order })
      .skip(skip)
      .limit(limit)
      .populate("category")
    .populate("author_id")  
    // .populate("comments.author_id")
   
 
    
    
      // .limit(limit);
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
exports.createComment = async (req, res, next) => {
  const { post_id, comment, author_id } = req.body;
   
  try {
    const post = await Post.findOne({ _id: post_id });
    if (!post) {
      const err = new Error("Post not found!");
      err.status = 404;
      return next(err);
    }
    const commentId = crypto.randomBytes(16).toString("hex");
    const newComment = {
      author_id: author_id,
      post_id: post_id,
      comment: comment,
      _id: commentId,
    };
   await Post.updateOne(
      { _id: post_id },
      { $push: { comments: newComment }, $inc: { commentsCount: 1 } }
    );

     const savedPost = await Post.findOne({ _id: post_id });
    
    res.status(200).json({
      message: "Comment added",
      status: 200,
      comments :savedPost.comments,
  
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
}

exports.getReplies = async(req,res,next)=>{
  const { comment_id } = req.query;
   
  try {
    const replies = await Reply.find({comment_id}).populate("author_id");
    
    if (!replies) {
      const err = new Error("Reply not found!");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({
      message: "Replies list",
      status: 200,
      data: { replies },
    });
  } catch (error) {
    console.log(error)
  }
}
 
exports.createReply = async (req, res, next) => {
const { post_id, reply,comment_id, author_id } = req.body;
const beforeSavedReply = await Reply({
  author_id: author_id,
  post_id: post_id,
  comment_id: comment_id,
  reply: reply,

})
try {
  const savedReply = await beforeSavedReply.save();
const populatedReply = await Reply.findOne({ _id: savedReply._id }).populate("author_id");
 
  await Post.updateOne(
    { _id: post_id },
    { $inc: { commentsCount: 1 } }
  )
  res.status(201).json({
    message: "Comment Replyed",
    data : populatedReply,
    status: 200,
  });
  
} catch (error) {
  
}
   
}
exports.getSinglePost = async (req, res, next) => {
   
  try {
    const post = await Post.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.id && { _id: req.query.id }),
      
    }).populate("author_id").populate('category')
    if (!post) {
      const err = new Error("Post not found!");
      err.status = 404;
      return next(err);
    }
     

     
    res.status(200).json({
      message: "Post found",
      status: 200,
      data: { post : post[0] },
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
    tags : req.body.tags
     
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
exports.likeComment=async(req,res,next)=>{
  const {commentId,userId} =req.query;
  
  try {
  if (!commentId || !userId) {
    return res.status(400).json({
    message: "Comment ID and User ID are required",
    status: 400,
    }); 
  }
  
  const post = await Post.findOne({
    "comments._id": commentId,
    
  });
  const comment = post.comments.id(commentId);
  const isLiked = comment.likes.includes(userId);
  if (isLiked) {
    await Post.updateOne(
      { "comments._id": commentId },
      { $pull: { "comments.$.likes": userId } }
    );
    console.log("unliked");
    res.status(200).json({
      message: "Comment unliked",
      status: 200,
    });
  } else {
    await Post.updateOne(
      { "comments._id": commentId },
      { $push: { "comments.$.likes": userId } }
    );
    console.log("Liked");
    res.status(200).json({
      message: "Comment liked",
      status: 200,
    });
  }
    
  } catch (error) {
    console.log(error)
    
  }
}
exports.likeReply=async(req,res,next)=>{
  const {replyId,userId} =req.query;
 console.log(replyId)
  try {
  if (!replyId || !userId) {
    return res.status(400).json({
    message: "Reply ID and User ID are required",
    status: 400,  
    });
  }
  const isLiked = await Reply.findOne({
    _id: replyId,
    likes: { $in: [userId] },
  });
  console.log(isLiked)
  

  if (isLiked) {
   const isSucced= await Reply.updateOne(
    { _id: replyId },
    { $pull: { likes: userId } }
    );
    
    res.status(200).json({
    message: "Reply unliked",
    status: 200,
    });
  } else {
    const isLiked=await Reply.updateOne(
    { _id: replyId },
    { $push: { likes: userId } }
    );
    
    res.status(200).json({
    message: "Reply liked",
    status: 200,
    });
  }
   
    
  } catch (error) {
    
  }
}

exports.savePost = async (req, res, next) => {
  const userId = req.query.userId;
  const postId = req.query.postId;
  
  try {
    if (!userId || !postId) {
      return res.status(400).json({
        message: "User ID and Post ID are required",
        status: 400,
      });
    }
    const isSaved = await User.findOne({
      _id: userId,
      favourites: { $in: [postId] },
    });
    
    const findUser = await User.findOne({_id :userId});
    if(!findUser){
      const err = new Error("User not found!");
      err.status=404;
      return next(err);
    }
    if (isSaved) {
      await User.updateOne({ _id: userId }, { $pull: { favourites: postId } });
      console.log("Post unsaved");
      res.status(200).json({
        message: "Post unsaved",
        status: 200,
      });
    } else {
      await User.updateOne({ _id: userId }, { $push: { favourites: postId } });
      console.log("post saved")

      res.status(200).json({
        message: "Post saved",
        status: 200,
      });
    }
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
}