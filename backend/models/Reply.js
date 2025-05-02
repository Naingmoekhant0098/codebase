const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  author_id: {
    type: String,
    ref: "User",
    required: true,
  },
  post_id : {
    type: String,
    required: true,
  },
  comment_id:{
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  likes : {
    type : Array,
    default :[]
  },
  
},{timestamps : true});

const reply = mongoose.model("reply", replySchema);
module.exports = reply;