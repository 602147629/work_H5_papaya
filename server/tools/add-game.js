
var moment = require('moment');
var UUID = require('uuid');
var CryptoJS = require('crypto-js');
var app = require('../app');
var Game = require('../models').models.game;

if (app.get('env') == "production") {
    console.error("Don't do this in production environment!!!");
    process.exit(-1);
}

if (process.argv.length < 4) {
    console.log("Usage: node add-game appID name");
    process.exit(-1);
}

var appID = process.argv[2];
var appName = process.argv[3];
var appKey = CryptoJS.MD5(appID + appName + moment().format('X') + UUID.v1()).toString();
var appSecret = CryptoJS.MD5(UUID.v4()).toString();

Game.create({
    appID: appID,
    name: appName,
    appKey: appKey,
    appSecret: appSecret
}).then(function(game) {
    if (game != null) {
        console.log("game create sucess...", game.get());
    }
}).catch(function(e) {
    console.log("game create failed...", e);
});
