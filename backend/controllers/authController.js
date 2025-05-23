const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Message = require("../models/Message");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const mongoose=require('mongoose')
const { sendOtp } = require("../utils/sendOtp");
const { isUserUnique } = require("../utils/checkUnique");
const { Types } = require('mongoose');
let otpData = {};
const OTP_Expire_Date = 60 * 5 * 1000; //will expire after 5 min
const generateOtp = () => {
  const otp = crypto.randomInt(100000, 999999);
  return otp;
};

exports.sendOtp = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      const err = new Error("Email is required");
      err.status = 400;
      err.code = "Email_notExist";
    }
    const isUser = await User.findOne({ email });

    if (isUser) {
      const err = new Error("This email is already have an account!");
      err.status = 404;
      err.code = "Email_AlreadyExist";
      return next(err);
    }
    const otp = generateOtp();
    const opt_expire_date = Date.now() + OTP_Expire_Date;
    console.log(otp);

    otpData[email] = {
      otp: otp,
      expiration: opt_expire_date,
    };

    sendOtp(email, otp);
    res.status(200).json({
      message: "Otp successfully sent",
      status: 200,
    });
  } catch (error) {}
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error("Email and Passwrod is required");
    err.status = 400;
    err.code = "Creditial_Required";
    return next(err);
  }
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      const err = new Error("User not found!");
      err.status = 404;
      err.code = "User_NotExist";
      return next(err);
    }
    const isMatchedPassword = bcrypt.compareSync(
      password,
      isUserExist.password
    );
    if (!isMatchedPassword) {
      const err = new Error("Password not matched!");
      err.status = 404;
      err.code = "PSW_NotMatched";
      return next(err);
    }

    const otp = generateOtp();
    const opt_expire_date = Date.now() + OTP_Expire_Date;
    otpData[email] = {
      otp: otp,
      expiration: opt_expire_date,
    };
    console.log(otp);
    sendOtp(email, otp);
    res
      .status(200)
      // .cookie("access_token", token, { httpOnly: true })
      .json({
        message: "Login  success and please comfirm your account !",
        status: 200,
      });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
exports.verifyOtp = async (req, res, next) => {
  const { email, otp, state } = req.body;
  if (!otp) {
    const err = new Error("Otp is required");
    err.status = 400;
    err.code = "Otp_notExist";
    return next(err);
  }
  const storedData = otpData[email];
  if (!storedData) {
    const err = new Error("Otp not found or expired");
    err.status = 400;
    err.code = "Otp_Expired";
    return next(err);
  }
  const currentDate = Date.now();
  if (currentDate > storedData.expiration) {
    const err = new Error("Otp has expired");
    err.status = 404;
    err.code = "Otp_Expired";
    return next(err);
  }
  if (storedData.otp !== parseInt(otp)) {
    const err = new Error("Invalid Otp");
    err.status = 400;
    err.code = "Invalid_Otp";
    return next(err);
  }
  delete otpData[email];
  if (state == "login") {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      const err = new Error("User not found!");
      err.status = 404;
      err.code = "User_NotExist";
      return next(err);
    }
    const token = jwt.sign({ id: isUserExist._id,username : isUserExist.username }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });
    const { password: pass, isAdmin, ...rest } = isUserExist._doc;
    res.status(200).json({
      message: "Otp verified successfully",
      status: 200,
      data: {
        user: { ...rest, token },
      },
    });
  } else {
    res.status(200).json({
      message: "Otp verified successfully",
      status: 200,
    });
  }
};
exports.signup = async (req, res, next) => {
  const { email, password,username } = req.body;
  console.log(email, password,username);
  const hashPassword = bcrypt.hashSync(password, 10);
  if (!email || !password) {
    const err = new Error("Email and password is required");
    (err.status = 404), (err.code = "Creditial_Required");
    return next(err);
  }
  const isUserExist = await isUserUnique(email);
  if (isUserExist) {
    const err = new Error("Email is already exist please try another one");
    err.status = 409;
    err.code = "Duplicated_Email";
    return next(err);
  }
  const user = new User({
    email: email,
    password: hashPassword,
    username:username
   
  });
  try {
    const savedUser = await user.save();
    const tokenExpireDate = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const token = jwt.sign({ id: savedUser._id,username:username }, process.env.JWT_TOKEN, {
      expiresIn: tokenExpireDate,
    });
    const { password: pass, ...rest } = savedUser._doc;
    res
      .status(201)
      // .cookie("access_token", token, { httpOnly: true })
      .json({
        message: "Successfully created",
        user: { ...rest, token: token },
        status: 201,
      });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
exports.updatName = async (req, res, next) => {
  const { email} = req.body;
  
  if (!email) {
    const err = new Error("Email is required to update user");
    err.status = 400;
    err.code = "Creditial_Required";
    return next(err);
  }
  try {
    const updatedUser = await User.updateOne(
      { email: email },
      {
        $set: req.body,
      }
    );

    if (updatedUser.matchedCount == 0) {
      res.status(404).json({
        message: "Failed to updated username , please ensure your email",
        status: 404,
      });
    }
    res.status(201).json({
      message: "Username updated",
      status: 201,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
exports.followUser = async (req, res, next) => {
  const userId = req.query.userId;
  const followedUserId = req.query.followedUserId;
  try {
    const isFllowing = await User.findOne({
      _id: followedUserId,
      followers: { $in: [userId] },
    });

    if (isFllowing) {
      await User.updateOne(
        { _id: followedUserId },
        { $pull: { followers: userId } }
      );
      await User.updateOne(
        { _id: userId },
        { $pull: { followings: followedUserId } }
      );
      res.status(200).json({
        message: "User unfollowed",
        status: 200,
      });
    } else {
      await User.updateOne(
        { _id: followedUserId },
        { $push: { followers: userId } }
      );
      await User.updateOne(
        { _id: userId },
        { $push: { followings: followedUserId } }
      );
      res.status(200).json({
        message: "User followed",
        status: 200,
      });
    }
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
exports.getUser = async (req, res, next) => {
 
  try {
    const user = await User.findOne({
      ...(req.query.username && { username: req.query.username }),
      ...(req.query.author_id && { _id: req.query.author_id }),
    });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    const { password: pass, isAdmin, ...rest } = user._doc;
    const authorId = new mongoose.Types.ObjectId(user._id);
    const userPosts = await Post.find({author_id : authorId}).populate("author_id");
    
  
    // const favouritePosts = await Post.find({
    //   favauritedUserLists: { $in: [user._id] },
    // });
    res.status(200).json({
      message: "User ",
      status: 200,
      data: {
        user: rest,
        posts: userPosts,
        // favourites: favouritePosts,
      },
    });
  } catch (error) {
    console.log(error)
  }
};
exports.requestToAcceptMessages= async (req, res, next) => {
  const { userId, requestUserId } = req.body;
  
  try {
    const isRequestedUserExist = await User.findOne({ _id: requestUserId });
    if (!isRequestedUserExist) {
      const err = new Error("Requested user not found");
      err.status = 404;
      return next(err);
    }
    const isRequestedUserExistInList = await User.findOne({
      _id: userId,
      requestedUserList: { $elemMatch: { userId: requestUserId } },
    });
    if (isRequestedUserExistInList) {
      const err = new Error("Already requested");
      err.status = 404;
      return next(err);
    }
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          requestedUserList: {
            userId: requestUserId,
            status: "pending",
          },
        },
      }
    );
    res.status(200).json({
      message: "Request sent successfully",
      status: 200,
    });
    
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
    
  }
}
exports.acceptRequest = async(req,res,next)=>{
  const {userId,status,acceptedBy} = req.query;
    
  if (!userId || !status || !acceptedBy) {
    const err = new Error("UserId, status and acceptedBy is required");
    err.status = 400;
    err.code = "Creditial_Required";
    return next(err);
  }
  try {

    const isSucced=await User.updateOne({_id:acceptedBy,"requestedUserList.userId":userId},
      {
        $set: {
          "requestedUserList.$.status": status,
        },
      }
    )

    if(isSucced.modifiedCount == 0){
      res.status(404).json({
        message: "Failed to accept the request",
        status: 404,
      });
    }
    res.status(200).json({
      message: "Request accepted successfully",
      status: 200,
    });
    
  } catch (error) {
    
  }
  // res.status(200).json({data:req.query});
}
exports.sendMessage = async (req, res, next) => {
  const { senderId, receiverId, message } = req.body;
  
  if (!senderId || !receiverId || !message) {
    const err = new Error("SenderId, receiverId and message is required");
    err.status = 400;
    err.code = "Creditial_Required";
    return next(err);
  }
  try {
    const isUserExist = await User.findOne({ _id: senderId });
    if (!isUserExist) {
      const err = new Error("Sender not found");
      err.status = 404;
      return next(err);
    }
    const isReceiverExist = await User.findOne({ _id: receiverId });
    if (!isReceiverExist) {
      const err = new Error("Receiver not found");
      err.status = 404;
      return next(err);
    }
    const messageData = new Message({
      senderId,
      receiverId,
      message,
    });
    await messageData.save();
    res.status(200).json({
      message: "Message sent successfully",
      status: 200,
    });
  } catch (error) {
    
  }
}
exports.getMessages = async(req,res,next)=>{
  const { senderId, receiverId } = req.query;
 try {
  const messages = await Message.find({
    $or: [
      { senderId: senderId, receiverId: receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ createdAt: 1 });
  res.status(200).json(messages);
  
 } catch (error) {
  
  const err = new Error(error.message);
  err.status = error.status;
  return next(err);
 }
 
}
