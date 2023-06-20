const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("DRDOCUSER");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const requirelogin = require("../middleware/requirelogin");

router.post("/api/signup", (req, res) => {
  const { name, userName, email, password, account } = req.body;
  console.log(account, name);

  if (!name || !userName || !password || !email || !account) {
    return res.status(422).json({ error: "Please add all fields" });
  }

  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then(
    (SavedUser) => {
      if (SavedUser) {
        return res
          .status(422)
          .json({ error: "User already exist with user name or email" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new USER({
          name,
          userName,
          email,
          account,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "Registered Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
}),
  router.post("/api/signin", (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(422).json({ error: "Please add all fields" });
    }
    USER.findOne({ email: email }).then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((match) => {
          if (match) {
            const token = jwt.sign(
              { _id: savedUser.id },
              process.env.JWT_SECRET
            );
            const { _id, name, email, userName, account, Photo } = savedUser;
            // Check if Photo is null and set it to an empty string
        const userPhoto = Photo || "";
            res.json({
              token,
              user: { _id, name, email, userName, account, Photo:userPhoto },
            });
          } else {
            return res.status(422).json({ error: "Invalid Pasword" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }),
  //update account type
  // Route to change the account type of a user
  router.put("/api/change/account", requirelogin, (req, res) => {
    const { accountType } = req.body;
    const { _id } = req.user;

    USER.findByIdAndUpdate(
      _id,
      { $set: { account: accountType } },
      { new: true }
    )
      .then((updatedUser) => {
        console.log(updatedUser.Photo);
        return res.status(200).json(updatedUser);
      })
      .catch((err) => {
        return res.status(422).json({ error: "Failed to update account" });
      });
  });

//upload profile pic
router.put("/uploadProfilePic", requirelogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    { $set: { Photo: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err }); // corrected typo
      } else {
        res.json(result);
      }
    }
  );
});
//remove Profile Pic
router.put("/removeProfilePic", requirelogin, (req, res) => {
  const { _id } = req.user;

  USER.findByIdAndUpdate(_id, { $set: { Photo: "" } }, { new: true })
    .then((updatedUser) => {
      console.log(updatedUser.Photo);
      return res.status(200).json(updatedUser);
    })
    .catch((err) => {
      return res.status(422).json({ error: "Failed to update Profile" });
    });
});
// Endpoint to check username availability
router.post("/api/check-username", (req, res) => {
  const { username } = req.body;

  // Check if the username is already taken
  USER.findOne({ userName: username })
    .then((user) => {
      if (user) {
        // Username is taken
        return res.json({ available: false });
      } else {
        // Username is available
        return res.json({ available: true });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});
// Endpoint to check email availability
router.post("/api/check-email", (req, res) => {
  const { Email } = req.body;

  // Check if the username is already taken
  USER.findOne({ email: Email })
    .then((user) => {
      if (user) {
        // Username is taken
        return res.json({ available: false });
      } else {
        // Username is available
        return res.json({ available: true });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});
//sending email to verify the user
router.post("/api/sendemail", (req, res) => {
  const { to, name } = req.body;
  const subject = "Your One-Time Password (OTP) for Verification";

  const otp = Math.floor(100000 + Math.random() * 900000);

  const message = `Dear ${name},

Thank you for choosing our platform. As part of the registration process, we require you to verify your account using a One-Time Password (OTP). Please find your OTP below:

OTP: ${otp}

Please enter this OTP in the designated field to complete your account verification. Please note that the OTP is valid for a limited time and should be kept confidential. Do not share this OTP with anyone.

If you did not initiate this registration process or have any concerns, please disregard this email.

Thank you for your cooperation.

Best regards,
DrDoc`;

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL, // Replace with your own email address
      pass: process.env.EMAIL_PASSWORD, // Replace with your own email password
    },
  });

  // Set up email data
  let mailOptions = {
    from: `"DrDoc" <${process.env.EMAIL}>`, // Replace with your own name and email address
    to: to,
    subject: subject,
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to send email" });
    }
    console.log("Email sent: %s", info.messageId);
    res.json({ message: "Email sent successfully", otp: otp });
  });
});

//api for android app
//api to get users Profile Photo 
// Get User Profile Photo
router.get("/api/user/:userId/profilephoto", (req, res) => {
  const { userId } = req.params;

  USER.findById(userId)
    .select("Photo")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ photo: user.Photo });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});
module.exports = router;
