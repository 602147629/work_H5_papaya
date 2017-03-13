/*
 * Base Dependencies
 */
var express = require('express');
var router = express.Router();
var async = require('async');

/*
 * Server Dependencies
 */
var debug = require('debug')('papaya:route:fruit');
var PapayaDB = require('../models/papaya');
var cacheManager = require('../service/CacheManager');

/*
 * Papaya Dependencies
 */
var Papaya = require('../../papaya/');
var Code = Papaya.Code;
var Fruit = Papaya.Fruit;
var gameID = Papaya.Game.ID_FRUIT;

module.exports = {
    path: "/fruit",
    route: router
};

router.use(function(req, res, next) {
    var userID = req.user.id;
    var Profile = PapayaDB.models.profile;

    Profile.findOne({
        where: { userID: userID, gameID: gameID }
    }).then(function(record) {
        if (record == null) {
            var game = new Fruit.Game();

            return Profile.create({
                userID: userID,
                gameID: gameID,
                data: game.toString()
            });
        }

        return record;
    }).then(function(record) {

        req.profile = record;
        req.game    = new Fruit.Game(record.data);

        next();
    }).catch(function(e) {
        debug(e);
        res.JSONP(Code.Failed, Code.INTERNAL.MySQL_ERROR);
    });
});

router.get('/enter', function(req, res) {
    var data = {};
    var game = req.game;

    switch (game.state) {
        case Fruit.Game.STATE.READY:
        case Fruit.Game.STATE.STARTED:
        case Fruit.Game.STATE.SHUFFLED:
            break;
        case Fruit.Game.STATE.DEALED:
            break;
        case Fruit.Game.STATE.DRAWED:
            break;
        case Fruit.Game.STATE.ENDED:
            break;
    }

    res.JSONP(Code.OK, null, data);
});

router.get('/betOn', function(req, res, next) {
    var bet = req.query.bet;

    var data = {};
    var game = req.game;
    var profile = req.profile;
    var agent = cacheManager.getAgent(req.user.agent);

    async.series([
        // 转起来
        function(callback) {
            data = game.betOn(bet);

            callback(null);
        },

        // 调用上分接口
        function(callback) {
            agent.withdraw(req.token, game.betTotal - game.bonusWin, function(err, balance) {
                if (err != null) {
                    callback(err);
                    return;
                }

                data.balance = balance;
                callback(null);
            });
        },

        // 数据存盘
        function(callback) {
            profile.data = game.toString();
            profile.save().then(function() {
                callback(null);
            }).catch(function(e) {
                debug(e);
                callback(Code.INTERNAL.MySQL_ERROR);
            })
        }
    ], function(err) {
        if (err != null) {
            res.JSONP(Code.Failed, err);
            return;
        }

        res.JSONP(Code.OK, null, data);
    });
});

router.get('/guessTheSizeOf', function(req, res) {
    var betInfo = {
        bet: req.query.bet,
        betType: req.query.betType
    };

    var data = {};
    var game = req.game;
    var profile = req.profile;
    var agent = cacheManager.getAgent(req.user.agent);

    async.series([
        function(callback) {
            data = game.guessTheSizeOf(betInfo);

            callback(null);
        },

        // 调用下分接口
        function(callback) {
            if (game.score > 0) {
                agent.deposit(req.token, game.betTotal - game.bonusWin, function(err, balance) {
                    if (err != null) {
                        callback(err);
                        return;
                    }

                    data.balance = balance;
                    callback(null);
                });
            } else {
                callback(null);
            }
        },

        //游戏存盘
        function(callback) {
            profile.data = game.toString();
            profile.save().then(function() {
                callback(null);
            }).catch(function(e) {
                debug(e);
                callback(Code.INTERNAL.MySQL_ERROR);
            })
        }

    ], function(err) {
        if (err != null) {
            res.JSONP(Code.Failed, err);
            return;
        }

        res.JSONP(Code.OK, null, data);
    });
});
