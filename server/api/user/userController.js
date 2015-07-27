var User = require('./userModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;

exports.params = function(req, res, next, id) {
  User.findById(id)
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(new Error('invalid ID'));
    });
};

exports.get = function(req, res, next) {
  User.find({})
    .then(function(users){
      res.json(users);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var user = req.user;
  res.json(user);
};

exports.put = function(req, res, next) {
  var user = req.user;

  var update = req.body;

  _.merge(user, update);

  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newUser = new User(req.body);
  // check if the user already exist
  User.findOne({username: newUser.username})
      .then(function (user) {
          if(user){
              return next(new Error('user already exist'));
          }else{
              // create it
              newUser.save(function(err, user) {
                  if(err){
                      return next(err);
                  }
                  return;

                  var token = signToken(user._id);
                  res.json({token: token});
              });
          }
      }, function (err) {
          next( err );
      })
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
