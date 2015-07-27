var Category = require('./categoryModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  // ToDo: use the id and attach the category to req
  Category.find({_id: id})
      .then(function (category) {
          req.category = category;
          next();
      }, function (err) {
          next(new Error('category not found'));
      });
};

exports.getAll = function(req, res, next) {
    Category.find({})
        .then(function (categories) {
            res.send(categories)
        }, function (err) {
            next(err)
        });
};

exports.getOne = function(req, res, next) {
  var category = req.category;
  res.json(category);
};

exports.put = function(req, res, next) {
  var category = req.category;

  var update = req.body;

  _.merge(category, update);

  category.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newcategory = req.body;

  Category.create(newcategory)
    .then(function(category) {
      res.json(category);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.category.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
