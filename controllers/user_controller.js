module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'UserProfile'
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
    //todo
}

module.exports.createSession = function (req, res) {
    //todo
}