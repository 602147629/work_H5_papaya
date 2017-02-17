var express = require('express');
var router = express.Router();
var debug = require('debug')('service:account:index');
var Code = require('../consts/code');
var app = require('../app');

module.exports = {
    path: "/",
    route: router
};

router.get('/', function(req, res) {
    res.JSONP(Code.OK);
});
