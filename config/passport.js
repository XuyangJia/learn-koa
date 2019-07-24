const Jwt = require('passport-jwt')
const JwtStrategy = Jwt.Strategy
const ExtractJwt = Jwt.ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const secretOrKey = require('./keys').secretOrKey

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
}

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async function (jwtPayload, done) {
    User.findOne({ name: jwtPayload.name })
      .then(user => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
      .catch(err => {
        return done(err, false)
      })
  }))
}
