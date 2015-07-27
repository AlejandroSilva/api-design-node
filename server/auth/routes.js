var router = require('express').Router();
var controller = require('./controller');
var auth = require('./auth');

// before we send back a jwt, lets check
// the password and username match what is in the DB
//router.use(auth.verifyUser());
router.post('/signin', auth.verifyUser(), controller.signin);

module.exports = router;
