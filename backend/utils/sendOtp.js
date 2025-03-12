const nodemailer = require('nodemailer')
require("dotenv").config();
exports.sendOtp = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codebase622@gmail.com',  
        pass: process.env.EMAIL_TOKEN_PASSWORD
    }
});

// Email options
let mailOptions = {
    from: 'codebase622@gmail.com', // Sender address
    to:  email, // List of recipients
    subject: `${otp} is your codebase login code.`, // Subject line
    html: '<h3>Verification Code</h3><p>To verify your account, plase enter the following code in code base</p><br><b>'+otp+'</b><br><p>Verification will be expire in 5 minutes.</p><br><p>CodeBase Support Team</p>' // HTML body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log(`Message Sent`);
});
};
