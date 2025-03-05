const crypto = require('crypto')

const otpData = {};
const OTP_Expire_Date = 60*5*1000;//will expire after 5 min
const generateOtp = ()=>{
const otp = crypto.randomInt(100000,999999)
return otp;
}

exports.login = async (req, res, next) => {
 const {email,password} = req.body;
  res.status(200).json({
    message:  req.body,
    status : 200,
  });
};

// app.post('/verify-otp', (req, res) => {
//     const { email, otp } = req.body;
  
//     if (!email || !otp) {
//       return res.status(400).send('Email and OTP are required');
//     }
  
//     const storedData = otpData[email];
  
//     if (!storedData) {
//       return res.status(404).send('OTP not found or expired');
//     }
  
//     // Check if OTP is expired
//     if (Date.now() > storedData.expiration) {
//       return res.status(400).send('OTP has expired');
//     }
  
//     // Check if OTP is correct
//     if (storedData.otp !== otp) {
//       return res.status(400).send('Invalid OTP');
//     }
  
//     // OTP is valid
//     delete otpData[email]; // Clear the OTP after successful verification
//     res.status(200).send('OTP verified successfully!');
//   });

  
exports.signup = async (req, res, next) => {
    const {email} = req.body;
    const otp = generateOtp();
    const opt_expire_date = Date.now()+OTP_Expire_Date;
    otpData[email]={
        OTP : otp,
        expiration : opt_expire_date
    }
  res.status(200).json({
    message: "signup success",
  });
};
