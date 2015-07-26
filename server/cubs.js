'use strict';

var cubsRouter = require('express').Router({
    mergeParams:true    // default false, catch the id(tigers.js) and cubid(cubs.js)
});
var _ = require('lodash');


// path /tigers/3/cubs
cubsRouter.route('/')
    .get(function (req, res) {
        // Todo: add cubs to the tigers
        res.send(req.tiger.cubs)
    });

// path /tigers/3/cubs/54
cubsRouter.route('/:cubId')
    .get(function (req, res) {
        res.json({
            tiger: req.tiger,
            cub: req.cub,
            params: req.params
        } );
    });

cubsRouter.param('cubId', function (req, res, next, cubId) {
    req.cub = {
        name: "cub name",
        age: 4,
        cubId: cubId
    };
    next();
});

module.exports = cubsRouter;