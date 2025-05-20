const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the form submission
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kabirabbaalmustapha@gmail.com',
      pass: 'xgvlruilyfsflnma' // Consider using environment variables
    }
  });

  // Email content
  const mailOptions = {
    from: 'kabirabbaalmustapha@gmail.com',
    to: 'kabirabbaalmustapha@gmail.com',
    subject: `New message from ${name}`,
    text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending mail:', err);
      return res.redirect('/?success=0');
    } else {
      console.log('Email sent:', info.response);
      return res.redirect('/?success=1');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
