var User = require('./userModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;

exports.params = function(req, res, next, id) {
  User.findById(id)
    .select('name') // avoid to show the password
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  User.find({})
    .then(function(users){
      res.json(
          users.map(function (user) {
              // map toJson to delete the password on each user
              return user.toJson();
          })
      );
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var user = req.user;
  res.json(user.toJson());
};

exports.put = function(req, res, next) {
  var user = req.user;

  var update = req.body;

  _.merge(user, update);

  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved.toJson());
    }
  })
};

exports.post = function(req, res, next) {
  var newUser = new User(req.body);
  console.log(newUser.encryptPassword);
  newUser.hashedPassword = newUser.encryptPassword(newUser.password);
  newUser.save(function(err, user) {
      if(err){
          next(err);
      }else {
          var token = signToken(user._id);
          res.json({token: token});
      }
  });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed.toJson());
    }
  });
};

exports.me = function (req, res, next) {
    res.json("req.user");
};