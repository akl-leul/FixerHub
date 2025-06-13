const nodemailer = require('nodemailer');
const transporter = require('../config/email');

   const sendVerificationEmail = async (email, otp) => {
       const mailOptions = {
           from: process.env.NODEMAILER_USER,
           to: email,
           subject: 'FixerHub Email Verification',
           text: `Your verification code is: ${otp}`
       };

       await transporter.sendMail(mailOptions);
   };

   module.exports = { sendVerificationEmail };