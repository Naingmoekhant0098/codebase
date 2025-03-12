const { timeStamp } = require("console");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique : true
    },
    bio: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default:
        "https://www.dexerto.com/cdn-cgi/image/width=828,quality=60,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/10/25/jujutsu-kaisen-yuji.jpeg",
    },
    favourites: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
