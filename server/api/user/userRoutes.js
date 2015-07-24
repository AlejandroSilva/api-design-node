var router = require('express').Router();
var logger = require('../../util/logger');
var userController = require('./userController');
// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', userController.params);

router.route('/')
    .get(userController.get)
    .post(userController.post);

router.route('/:id')
    .get(userController.getOne)
    .put(userController.put)
    .delete(userController.delete);

module.exports = router;
