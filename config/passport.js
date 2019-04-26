const Jwt = require('passport-jwt'),
    JwtStrategy = Jwt.Strategy,
    ExtractJwt = Jwt.ExtractJwt,
    mongoose = require('mongoose'),
    User = mongoose.model('users'),
    secretOrKey = require('./keys').secretOrKey,
    opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey
    }

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        User.findOne({name: jwt_payload.name})
        .then(user => {
            if (user) {
                return done(null, user)
            }
            else {
                return done(null, false);
                // or you could create a new account
            }
        })
        .catch(err => {
            return done(err, false)
        })
    }));
}