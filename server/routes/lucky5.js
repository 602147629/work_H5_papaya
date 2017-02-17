var express = require('express');
var router = express.Router();
var UUID = require('uuid');
var app = require('../app');
var debug = require('debug')('service:account:user');
var Code = require('../consts/code');
var DataUtils = require('../utils/DataUtils');
var paramFilter = require('../middleware/ParamFilter');
var userData = require('../middleware/UserData');
var cacheManager = require('../service/CacheManager');
var Game = require('../../papaya/index');
var Lucky5 = Game.Lucky5;

module.exports = {
    path: "/lucky5",
    route: router
};

router.use(paramFilter.verifyDeviceID);
router.use(userData.queryInfo);

router.get('/deal', function(req, res, next) {
    var bet = req.query.bet || 10;
    var player = cacheManager.getPlayer(req.userInfo.id);
    if (player == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var game = cacheManager.getGame(req.userInfo.id, Game.Game.ID_LUCKY5);
    if (game == null) {
        game = new Lucky5.Game();
        cacheManager.setGame(req.userInfo.id, game);
    }

    var data = {};

    game.bet(bet);
    game.deal();

    data.pokers = game.handPokers;
    data.player = {
        balance: player.balance - bet
    };

    //更新服务器的player信息
    DataUtils.updatePlayer(req.userInfo.id, data.player);

    res.JSONP(Code.OK, null, data);
});

router.get('/draw', function(req, res, next) {
    var data = {};
    var player = cacheManager.getPlayer(req.userInfo.id);
    if (player == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var game = cacheManager.getGame(req.userInfo.id, Game.Game.ID_LUCKY5);
    if (game == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var hold = req.query.hold;

    game.hold(hold);
    game.draw();
    game.end();

    data.pokers     = game.handPokers;
    data.holds      = game.holdPokers;
    data.marks      = game.markPokers;
    data.result     = game.result;
    data.score      = game.score;
    data.player     = {
        balance: player.balance + game.score
    };

    //更新服务器的player信息
    DataUtils.updatePlayer(req.userInfo.id, data.player);

    res.JSONP(Code.OK, null, data);
});

router.get('/double', function(req, res, next) {
    var data = {};
    var player = cacheManager.getPlayer(req.userInfo.id);
    if (player == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var game = cacheManager.getGame(req.userInfo.id, Game.Game.ID_LUCKY5);
    if (game == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var double = game.createDouble();

    data.lastScore = double.lastScore;

    res.JSONP(Code.OK, null, data);
});

router.get('/double/deal', function(req, res, next) {
    var data = {};
    var player = cacheManager.getPlayer(req.userInfo.id);
    if (player == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var game = cacheManager.getGame(req.userInfo.id, Game.Game.ID_LUCKY5);
    if (game == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var double = game.double();

    double.init();
    double.bet(req.query.type);
    double.deal();

    data.pokers = double.handPokers;
    data.player = {
        balance: player.balance - double.betAmount
    };

    //更新服务器的player信息
    DataUtils.updatePlayer(req.userInfo.id, data.player);

    res.JSONP(Code.OK, null, data);
});

router.get('/double/draw', function(req, res, next) {
    var data = {};
    var player = cacheManager.getPlayer(req.userInfo.id);
    if (player == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var game = cacheManager.getGame(req.userInfo.id, Game.Game.ID_LUCKY5);
    if (game == null) {
        res.JSONP(Code.Failed, Code.USER.RECORD_NULL);
        return;
    }

    var double = game.double();

    double.draw(req.query.selected);
    double.end();

    data.result = double.result;
    data.score  = double.score;
    data.player = {
        balance: player.balance + double.score
    };

    //更新服务器的player信息
    DataUtils.updatePlayer(req.userInfo.id, data.player);

    res.JSONP(Code.OK, null, data);
});
