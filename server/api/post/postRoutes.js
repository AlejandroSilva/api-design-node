var router = require('express').Router();
var logger = require('../../util/logger');
var postController = require('./postController');
// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', postController.params);

router.route('/')
    .get(postController.get)
    .post(postController.post);

router.route('/:id')
    .get(postController.getOne)
    .put(postController.put)
    .delete(postController.delete);

module.exports = router;
