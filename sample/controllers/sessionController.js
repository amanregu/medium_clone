var User = require('../models/user');

exports.isUserLogged = (req, res, next) => {
    console.log("asda");
    if(req.session && req.session.userid) {
        next();
    } else {
        res.redirect('/users/login');
        console.log("####");
    }
}