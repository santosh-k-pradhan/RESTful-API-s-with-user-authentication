var express     = require('express');
var passport	= require('passport');

module.exports = function(app) {

    var apiRoutes = express.Router();

    apiRoutes.post('/signup', require('../controllers/signUpController'));
    apiRoutes.post('/authenticate', require('../controllers/authenticateController'));
    apiRoutes.get('/userInfo', passport.authenticate('jwt', {session: false}), require('../controllers/userInfoController'));

    app.use('/api', apiRoutes);

};