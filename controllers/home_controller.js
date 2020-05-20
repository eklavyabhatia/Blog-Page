const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = function (req, res) {
    // console.log(req.cookies)
    // res.cookie('userid',26)

    Post.find({}).populate('user').exec(function (err, posts) {
        return res.render('home', { 'title': 'Home', posts: posts })

    })
}