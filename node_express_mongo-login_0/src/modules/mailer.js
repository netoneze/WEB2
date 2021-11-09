const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "JaineSaconiSecundario@gmail.com",
    pass: "925ac3A7x",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
