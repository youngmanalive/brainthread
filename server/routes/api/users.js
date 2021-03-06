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
            const payload = {
              id: user.id,
              username: user.username,
              clientExp: (Date.now() / 1000 + 2700)
            };
            jwt.sign(payload, keys.secret, { expiresIn: 4500 }, (err, token) => {
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

  const name = req.body.name;
  const password = req.body.password;

  const type = (/.*@.*/.test(name)) ? "email" : "username";

  User.findOne({ [type]: name }).then(user => {
    if (!user) return res.status(404).json({ name: "User not found" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
          clientExp: (Date.now() / 1000 + 2700)
        };

        jwt.sign(payload, keys.secret, { expiresIn: 4500 }, (err, token) => {
          res.json({success: true, token: "Bearer " + token});
        });
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

// GET CURRENT USER - Auth testing route
router.get("/current",
  passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
      id: req.user.id,
      token: req.user.token,
    });
  }
);

// CHECK FOR EXISTING USERNAME
router.get("/username", (req, res) => {
  const { username } = req.query;

  if (keys.reserved.includes(username)) {
    res.json({ username: null });
  } else {
    User.findOne({ username }).then(user => {
      if (!user) {
        // username available, send back to client
        res.json({ username });
      } else {
        // username unavailable
        res.json({ username: null });
      }
    });
  }
});

module.exports = router;
