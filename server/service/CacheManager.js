
var fs = require('fs');
var path = require('path');
var async = require('async');

var debug = require('debug')('service:service:cache');

var CacheManager = module.exports = {};

CacheManager.name = "CacheManager";

CacheManager.init = function(cb) {
    var self = this;

    this.games = {};
    this.players = {};

    async.series([
    ], function(err, results) {
        if (err != null) {
            debug("cacheManager init error: ", err);
            return;
        }

        debug("%s inited...", self.name);
        process.nextTick(cb);
    });
};

CacheManager.getGame = function(userId, gameId) {
    if (this.games[userId] == null || this.games[userId][gameId] == null) {
        return null;
    }

    return this.games[userId][gameId];
};

CacheManager.setGame = function(userId, game) {
    if (this.games[userId] == null) {
        this.games[userId] = {};
    }

    this.games[userId][game.id] = game;
};

CacheManager.delGame = function(userId, gameId) {
    if (this.games[userId] == null) {
        return;
    }

    delete this.games[userId][gameId];
};

CacheManager.getPlayer = function(userId) {
    return this.players[userId];
};

CacheManager.setPlayer = function(player) {
    this.players[player.id] = player;
};

CacheManager.delPlayer = function(userId) {
    delete this.players[userId];
};

CacheManager.start = function(cb) {
    debug("%s started...", this.name);
    process.nextTick(cb);
};

CacheManager.stop = function(cb) {
    debug("%s stopped...", this.name);
    process.nextTick(cb);
};

CacheManager.load = function() {

};
