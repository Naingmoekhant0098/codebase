const express = require('express');
const {prevent} = require('../utils/prevent')
const { getCategory, createCategory, updateCategory, deleteCategory, updateFavouriteUser } = require('../controllers/categoryController');
const router = express.Router();
router.get('/get-category',prevent,getCategory)
router.post('/create-category',prevent,createCategory)
router.put('/update-category/:slug',prevent,updateCategory)
router.delete('/delete-category/:slug',prevent,deleteCategory)
router.put('/update-favouriteUser',prevent,updateFavouriteUser)
module.exports=router;