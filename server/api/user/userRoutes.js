var router = require('express').Router();
var logger = require('../../util/logger');
var userController = require('./userController');


router.route('/')
  .get(userController.get);

router.param('id', userController.params);
router.route('/:id')
  .get(userController.getOne);

module.exports = router;