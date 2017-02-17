
var moment = require('moment');
var UUID = require('uuid');
var CryptoJS = require('crypto-js');
var Platform = require('../models').models.platform;

if (app.get('env') == "production") {
    console.error("Don't do this in production environment!!!");
    process.exit(-1);
}

if (process.argv.length < 4) {
    console.log("Usage: node add-platform name sdk");
    process.exit(-1);
}

var name = process.argv[2];
var sdk = process.argv[3];

var data = {
    name: "独角鲸游戏",
    sdk: "narwhale",
    authURL: "",
    orderURL: "",
    payCallbackURL: ""
};

Platform.create(data).then(function(platform) {
    if (platform) {
        return platform;
    }
}).then(function(platform) {
    console.log(platform.get());
});
