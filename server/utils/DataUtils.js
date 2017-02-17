
var env = process.env.NODE_ENV || "development";
var Code = require('../consts/code');
var AccountDB = require('../models/account/index');
var cacheManager = require('../service/CacheManager');
var debug = require('debug')('service:service:cache');

var DataUtils = module.exports = {};

DataUtils.updatePlayer = function(userId, opts) {
    var player = cacheManager.getPlayer(userId);
    if (player == null) {
        return;
    }

    player.update(opts);

    var User = AccountDB.models.user;
    User.findOne({
        where: {id: userId}
    }).then(function(user) {
        if (user != null) {
            user.balance = opts.balance;
            user.save();
        }
    }).catch(function(e) {
        debug(e);
    })
};
