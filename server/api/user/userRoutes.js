var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./userController');
var auth = require('../../auth/auth');

// lock down the right routes :)
router.param('id', controller.params);

router.get('/me', auth.decodeToken(), auth.getFreshUser(), controller.me);
router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;
