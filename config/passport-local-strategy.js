const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user - Passportjs')
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password')
                return done(null, false)
            }

            return done(null, user)
        })
    }


))


//serializing the user to decide which key is to be kept in cookie
passport.serializeUser(function (user, done) {
    done(null, user.id)
})



//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Errot in finding user-Passport')
            return done(err)
        }
        return done(null, user)

    })
})

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in, then pass on the req to the next funtion(controllers action)
    if (req.isAuthenticated()) {
        return next()
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from session cookie and we are sending it to locals for view
        res.locals.user = req.user
    }
    next()
}

passport.blockAccessIfAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    next()
}

module.exports = passport
