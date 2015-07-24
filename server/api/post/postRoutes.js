var router = require('express').Router();
var logger = require('../../util/logger');
var postController = require('./postController');

router.route('/')
    .get(postController.getAll)
    .post(postController.post);

router.param('postId', postController.params);
router.route('/:postId')
    .get(postController.getOne)
    .put(postController.put)
    .delete(postController.delete)

module.exports = router;