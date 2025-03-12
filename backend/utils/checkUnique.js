const Category = require("../models/Category");
const User = require("../models/User");
exports.isCatgoryUnique = async (slug) => {
  const category = await Category.findOne({ slug });
  return category ? false : true;
};

exports.isUserUnique = async (email) => {
    const user = await User.findOne({ email });
    return user==null ? false : true;
  };
  
