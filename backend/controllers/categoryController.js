const Category = require("../models/Category");
const User = require("../models/User");
const { isCatgoryUnique } = require("../utils/checkUnique");
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      message: "Category list",
      status: 200,
      data: { category },
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    return next(err);
  }
};
exports.createCategory = async (req, res, next) => {
  const { name: category } = req.body;
  if (!category) {
    const err = new Error("Category field is required");
    err.status = 404;
    err.code = "Invalid_Category";
    return next(err);
  }
  const slug = category
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");
  const isUnique = await isCatgoryUnique(slug);
  if (!isUnique) {
    const err = new Error(
      "Category name is already exit please try another name"
    );
    err.status = 409;
    err.code = "Duplicated_Category";
    return next(err);
  }
  const beforeSaved = new Category({ name: category, slug });
  try {
    const savedCategory = await beforeSaved.save();
    res.status(201).json({
      message: "Category created",
      status: 201,
      data: {
        category: savedCategory,
      },
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    err.code = error.code;
    return next(error);
  }
};
exports.updateCategory = async (req, res, next) => {
  const { category } = req.body;
  const { slug: category_slug } = req.params;

  if (!category_slug || !category) {
    const err = new Error("Category Slug and Category field is required");
    err.status = 404;
    err.code = "Invalid_Category";
    return next(err);
  }
  try {
    const isExist = await Category.findOne({ slug: category_slug });
    if (!isExist) {
      const err = new Error("Category not found");
      err.status = 404;
      err.code = "Invalid_Category";
      return next(err);
    }
    const updatedSlug = category
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-");
    await Category.updateOne(
      { slug: category_slug },
      { $set: { name: category, slug: updatedSlug } }
    );
    res.status(200).json({
      message: "Category Updated",
      status: 200,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    err.code = error.code;
    return next(error);
  }
};
exports.deleteCategory = async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) {
    const err = new Error("Slug field is required");
    err.status = 404;
    err.code = "Invalid_Slug";
    return next(err);
  }
  try {
    const isExist = await Category.findOne({ slug });
    if (!isExist) {
      const err = new Error("Category not found with this slug");
      err.status = 404;
      err.code = "Invalid_Category";
      return next(err);
    }
    await Category.findOneAndDelete({ slug });
    res.status(200).json({
      message: "Category Deleted",
      status: 200,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.status;
    err.code = error.code;
    return next(error);
  }
};
exports.updateFavouriteUser = async (req, res, next) => {
  const { slug, userId } = req.query;
  if (!slug || !userId) {
    const err = new Error("Slug & User Id is required");
    err.status = 404;
    err.code = "Invalid_Slug";
    return next(err)
  }
    try {
      const isExist = await Category.findOne({ slug });
      const isUserExist = await User.findById({_id : userId})
      if (!isExist) {
        const err = new Error("Category not found with this slug");
        err.status = 404;
        err.code = "Invalid_Category";
        return next(err);
      }
      if (!isUserExist) {
        const err = new Error("User not found");
        err.status = 404;
        err.code = "Invalid_UserId";
        return next(err);
      }
      const isLiked = await Category.findOne({
        slug,
        followedUserLists: { $in: [userId] },
      });

      if (isLiked) {
        await Category.updateOne({slug}, { $pull: { followedUserLists: userId } });
        res.status(200).json({
          message: "Category unfavourited",
          status: 200,
        });
      } else {
        await Category.updateOne({slug}, { $push: { followedUserLists: userId } });
        res.status(200).json({
          message: "Category favourited",
          status: 200,
        });
      }
    } catch (error) {
        const err = new Error(error.message);
        err.status = error.status;
        err.code = error.code;
        return next(error);
    }
  
};
