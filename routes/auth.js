const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("DRDOCUSER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../key");
const requirelogin = require("../middleware/requirelogin");


  router.post("/signup", (req, res) => {
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
  router.post("/signin", (req, res) => {
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
            const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
            const { _id, name, email, userName, account, Photo } = savedUser;
            res.json({
              token,
              user: { _id, name, email, userName, account, Photo },
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

module.exports = router;
