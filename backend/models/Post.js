
const mongoose = require("mongoose");
const { type } = require("os");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    commentsCount : {
      type : Number,
      default :0

    },
    tags : {
      type : Array,
      default : []
    },
    comments :[
      {
        _id : String,
        author_id: {
          type: String,
          // type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        repliesCount : {
          type : Number,
          default :0
        },
        post_id : String,
        comment: String,
        likes : [],
        createdAt : {
          type: Date,
          default: Date.now,
        },
        updatedAt : {
          type: Date,
          default: Date.now,
        }
      }
    ],
    cover_image: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
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
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
