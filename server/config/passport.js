const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");

const jwt = require("jsonwebtoken");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secret
};

const updateToken = payload => 
  jwt.sign(payload, keys.secret, { expiresIn: 4500 });

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      let refreshToken = false;

      if (payload.clientExp < (Date.now() / 1000)) {
        const newPayload = {
          id: payload.id,
          username: payload.username,
          clientExp: (Date.now() / 1000 + 2700)
        };
        refreshToken = `Bearer ${updateToken(newPayload)}`;
      }

      const items = {
        token: refreshToken,
        id: payload.id
      };

      User.findById(payload.id)
        .then(user => done(null, (user ? items : false)))
        .catch(err => console.log(err));
    })
  );
};
