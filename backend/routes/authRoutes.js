const express = require('express');
const {prevent} = require('../utils/prevent')
const { login,signup,sendOtp,verifyOtp,updatName, followUser, getUser} = require('../controllers/authController');
const router = express.Router();
router.post('/login',login)
router.post('/send-otp',sendOtp)
router.post('/verify-otp',verifyOtp)
router.post('/create-password',signup)
router.post('/update-username',updatName)
router.put('/follow-user',prevent,followUser)
router.get('/get-user',prevent,getUser)
module.exports = router;