const JwtStrategy = require('passport-jwt').Strategy;

const { ExtractJwt } = require('passport-jwt');

const mongoose = require('mongoose');

const User = mongoose.model('User');

require('custom-env').env('dev');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = process.env.JWT_KEY;

module.exports = (passport) => {
  passport.use(
    // eslint-disable-next-line camelcase
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.find({ email: jwt_payload.email })

        .then((user) => {
          if (user.length >= 1) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
