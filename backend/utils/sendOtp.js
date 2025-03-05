exports.sendOtp = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: "judd.tillman@ethereal.email",
      pass: "xUWsge6SFzCRZGuzac",
    },
  });

  const info = await transporter.sendMail({
    from: '"OTP Service" <your-email@gmail.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  });

  console.log("Message sent: %s", info.messageId);
};
