const nodemailer = require('nodemailer');
const {user} = require('../Config/config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function sendEmail(email,token){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user.email, // Your Gmail email address
          pass: user.password, // Your Gmail password or an App Password
        },
      });
      
      const mailOptions = {
          from: user.email,
          to: email,
          subject: 'Welcome to E-commerce App',
          text: `http://127.0.0.1:5000/users/verify?token=${token}`,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
}

module.exports = sendEmail;