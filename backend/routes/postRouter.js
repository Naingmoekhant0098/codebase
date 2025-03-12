const express = require('express');
const {getPosts,createPost,deletePost, likePost} = require('../controllers/postController');
const {prevent} = require('../utils/prevent')
const router = express.Router();
router.get('/get-posts',prevent,getPosts)
router.post('/create-post',prevent,createPost)
router.delete('/delete-post/:id',prevent,deletePost)
router.put('/like-post',prevent,likePost)

module.exports = router;