
var moment = require('moment');
var UUID = require('uuid');
var CryptoJS = require('crypto-js');
var Channel = require('../models').models.channel;

var data = {
    name: "独角鲸官网",
    appID: 10001,
    platformID: 1,
    enablePay: 1
};

Channel.create(data).then(function(channel) {
    return channel;
}).then(function(channel) {
    console.log(channel.get());
});
