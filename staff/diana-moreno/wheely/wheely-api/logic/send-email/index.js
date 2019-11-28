require('dotenv').config()
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wheely.reservations@gmail.com',
    pass: passwordEmail // dotenv
  }
});

var mailOptions = {
  from: 'wheely.reservations@gmail.com',
  to: 'd7@hotmail.es',
  subject: 'Sending Email using Node.js',
  html: '<h1>Welcome</h1><p>That was easy!</p>'
}

let email = await transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});