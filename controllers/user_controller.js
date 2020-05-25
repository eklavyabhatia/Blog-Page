const User = require('../models/user')

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: 'UserProfile',
            profile_user:user
        })
    })
}

module.exports.signin = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Linkster | SignIn'
    })
}

module.exports.signup = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Linkster | SignUp'
    })
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmpassword) {

        return res.redirect('back')
    }



    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding user in signing up')
            return
        }

        if (!user) {

            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Error in creating user while signing up')
                    return
                }

                return res.redirect('/users/sign-in')
            })
        } else {
            return res.redirect('back')
        }
    })


}


module.exports.createSession = function (req, res) {

    return res.redirect('/')
}

module.exports.destroySession = function (req, res) {
    req.logout()
    return res.redirect('/')
}