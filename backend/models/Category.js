
const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    slug: {
        type: String,
        required: true,
      },
    followedUserLists : {
      type:Array,
      default:[]
    }
  },
  { timeStamps: true }
);

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
