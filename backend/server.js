const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const nodemailer = require("nodemailer");
const cors = require("cors");
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(process.env.PORT || port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Listening on ${port}`);
  }
});

// Create a transporter
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "your-email@gmail.com",
    pass: "your-password",
  },
});

app.post("/api/sent", (req, res, next) => {
  let { email, subject, body } = req.body;
  // Email details
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject,
    text: body,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(new HttpError(error, 500));
    } else {
      res.status(200).json({ data: info.response });
    }
  });
});
