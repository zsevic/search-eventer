const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../app/models/user')
const configAuth = require('./auth')

module.exports = passport => {
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['displayName', 'emails']
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'facebook.id': profile.id }, async (err, user) => {
        if (err) { return done(err) }
        if (user) {
          user.facebook.token = accessToken
          await user.save()
          return done(null, user)
        } else {
          const newUser = new User()
          newUser.facebook.id = profile.id
          newUser.facebook.token = accessToken
          newUser.facebook.name = profile.displayName
          newUser.facebook.email = profile.emails[0].value
          await newUser.save()
          return done(null, newUser)
        }
      })
    })
  }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (obj, done) {
    done(null, obj)
  })
}
