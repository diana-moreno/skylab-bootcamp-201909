const { env: { userEmail, passwordEmail } } = process
var nodemailer = require('nodemailer');

module.exports = async function(to) { // añadir subject
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: passwordEmail
    }
  });

  var mailOptions = {
    from: userEmail,
    to,
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  }

  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
