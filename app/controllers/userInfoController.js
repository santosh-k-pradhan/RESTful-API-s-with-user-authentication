var config      = require('../../config/database');
var User        = require('../models/user');
var jwt         = require('jwt-simple');

module.exports = function userInfoController(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        },function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });        
            } else {
                return res.json({
                    success: true,
                    msg: 'Welcome ' + user.name + '!'
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
}

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parsed = headers.authorization.split(' ');
        if (parsed.length === 2) {
            return parsed[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}