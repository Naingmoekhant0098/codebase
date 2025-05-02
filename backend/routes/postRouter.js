const express = require('express');
const {getPosts,createPost,deletePost, likePost,savePost, getSinglePost,createComment, createReply , getReplies,likeComment,likeReply} = require('../controllers/postController');
const {prevent} = require('../utils/prevent')
const router = express.Router();
router.get('/get-posts',prevent,getPosts)
router.get('/get-single-post',prevent,getSinglePost)
router.post('/create-post',prevent,createPost)
router.delete('/delete-post/:id',prevent,deletePost)
router.put('/like-post',prevent,likePost)
router.put('/save-post',prevent,savePost)
router.post('/add-comment',prevent,createComment)
router.post('/add-reply',prevent,createReply)
router.get('/get-replies',prevent,getReplies)
router.put('/like-comment',prevent,likeComment)
router.put('/like-reply',prevent,likeReply)
module.exports = router;