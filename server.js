const path = require('path');
const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/send', function(req, res) {
  const output = `
    <p>You have a new Message</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    secure: false,
    auth: {
      user: keys.username,
      pass: keys.password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: '"JamesHanCPA Website" <james@jhancpa.com>',
    to: 'davidhan.5.25@gmail.com',
    subject: 'New message',
    text: 'Text here',
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    res.status(200);
  });
});

app.listen(process.env.PORT || 3000);
