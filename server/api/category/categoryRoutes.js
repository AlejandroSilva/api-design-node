var router = require('express').Router();
var logger = require('../../util/logger');
var categoryController = require('./categoryController');


router.route('/')
    .get(categoryController.getAll)
    .post(categoryController.post);

router.param('categoryID', categoryController.params);
router.route('/:categoryID')
    .get(categoryController.getOne)
    .post(categoryController.post)
    .put(categoryController.put)
    .delete(categoryController.delete);

module.exports = router;
