const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'JaineSaconiSecundario@gmail.com',
    pass: '925ac3A7x'
  },
  tls: {
    rejectUnauthorized: false
}
});

let mailOptions = {
  from: 'JaineSaconiSecundario@gmail.com',
  to: 'jaine.saconi@gmail.com',
  subject: 'Test',
  text: 'Hello World!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error.message);
  }
  console.log('success');
});
module.exports = transporter;