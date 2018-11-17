const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


// REGISTER
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user has already registered with this address" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        headline: req.body.headline
      });

      bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => {
            const payload = { id: user.id, username: user.username, email: user.email };
            jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
              res.json({success: true, token: "Bearer " + token});
            });
          })
          .catch(error => console.log(error));
      });
    }
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) return res.status(404).json({ email: "Email not found" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username, email: user.email };
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({success: true, token: "Bearer " + token});
        });
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

// GET CURRENT USER
router.get("/current",
  passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ id: req.user.id, user: req.user.username, email: req.user.email });
  }
);

module.exports = router;
