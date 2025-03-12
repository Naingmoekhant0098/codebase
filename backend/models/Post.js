
const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    favauritedUserLists : {
      type:Array,
      default:[]
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
