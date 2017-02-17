var express = require('express');
var router = express.Router();
var UUID = require('uuid');
var app = require('../app');
var debug = require('debug')('service:account:user');
var Code = require('../consts/code');
var AccountDB = require('../models/account/index');
var paramFilter = require('../middleware/ParamFilter');
var userData = require('../middleware/UserData');
var cacheManager = require('../service/CacheManager');
var Game = require('../../papaya/index');

module.exports = {
    path: "/user",
    route: router
};

router.use(paramFilter.verifyDeviceID);
router.use(userData.queryInfo);

//auth enter 三个功能都可以由userData.queryInfo完成 需要特殊处理之时再进行区分优化
router.get('/auth', function(req, res, next) {
    res.JSONP(Code.OK, null, req.userInfo);
});

//这里要发送player信息过去
router.get('/sync', function(req, res, next) {
    var player = cacheManager.getPlayer(req.userInfo.id);
    if (player == null) {
        var opts = {
            id: req.userInfo.id,
            balance: req.userInfo.balance,
            name: req.userInfo.name
        };
        player = new Game.Player(opts);
        cacheManager.setPlayer(player);
    }
    res.JSONP(Code.OK, null, {player: player.clone()});
});

router.get('/enter', function(req, res, next) {
    res.JSONP(Code.OK, null, req.userInfo);
});
