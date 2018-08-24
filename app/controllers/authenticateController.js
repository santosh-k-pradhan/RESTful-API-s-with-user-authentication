var config      = require('../../config/database');
var User        = require('../models/user');
var jwt         = require('jwt-simple');

module.exports = function authenticateController(req, res) {
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            return res.status(403).send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.encode(user, config.secret);
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    return res.status(403).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
};