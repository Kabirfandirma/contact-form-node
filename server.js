const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the form submission
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  // Create reusable transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kabirabbaalmustapha@gmail.com',
      pass: 'xgvlruilyfsflnma' // Use environment variables for security in production!
    }
  });

  const mailOptions = {
    from: email,
    to: 'kabirabbaalmustapha@gmail.com',
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending mail:', err);
      return res.redirect('/index.html?success=0');
    } else {
      console.log('Email sent:', info.response);
      return res.redirect('/index.html?success=1');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
