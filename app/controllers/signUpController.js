var User        = require('../models/user');

module.exports = function signUpControllr(req, res) {
    if (!req.body.name || !req.body.password) {
        res.json({
            success: false,
            msg: 'Please pass name and password.'
        });
    } else {
        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        newUser.save(function(err) {
            if (err) {
                res.json({
                    success: false,
                    msg: 'username already exists.'
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Successfully created user!'
                });
            }      
        });
    }
};