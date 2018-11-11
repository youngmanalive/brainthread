const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const User = require("../../models/User");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    console.log("USER:", user);
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

      console.log(newUser.password);

      bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(userData => res.json(userData))
          .catch(error => console.log(error));
      });
    }
  });
});

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;
