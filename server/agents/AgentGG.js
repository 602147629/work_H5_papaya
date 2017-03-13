/*
 * Base Dependencies
 */
var util = require('util');
var request = require('request');
var CryptoJS = require('crypto-js');

/*
 * Server Dependencies
 */
var debug = require('debug')('papaya:agent:base');
var PapayaDB = require('../models/papaya');
var Agent = require('./Agent');
var signUtils = require('../utils/SignUtils');

/*
 * Papaya Dependencies
 */
var Papaya = require('../../papaya/');
var Code = Papaya.Code;

function encryptParams(params) {
    var split = "/\\\\/";
    var plaintext = "";

    var keys = Object.keys(params);
    for (var i = 0, size = keys.length; i < size; i++) {
        plaintext += keys[i] + '=' + params[keys[i]];
        if (i < size - 1) {
            plaintext += split;
        }
    }

    console.log(plaintext);

    var keyHex = CryptoJS.enc.Utf8.parse('12345678');
    var encrypted = CryptoJS.DES.encrypt(plaintext, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

var AgentGG = module.exports = function() {

};

util.inherits(AgentGG, Agent);

var proto = AgentGG.prototype;

proto.getBalance = function(token, callback) {
    var host = "http://testapi.gg626.com/api/doExternalReading.do";
    var plaintext = {
        cagent:    token.agent,
        sid:       token.sessionId,
        method:    "gb",
        cur:       token.currency
    };

    var encrypted = encryptParams(plaintext);
    var md5key = CryptoJS.MD5(encrypted + '123456').toString();
    var params = {
        params: encrypted,
        key: md5key
    };

    console.log(params);

    var url = signUtils.formatURL(host, params);
    var options = {
        url: url
    };

    console.log(url);

    request(options, function(error, response, body) {
        callback(null);
        console.log(error, response.statusCode, body);
    });
};

proto.deposit = function(token, amount, callback) {
    var host = "";
    var plaintext = {
        cagent:    token.agent,
        sid:       token.sessionId,
        method:    "gb",
        cur:       token.currency,
        credit:    100,
        type:      "OUT",
        billno:    ""
    };
};

proto.withdraw = function(token, amount, callback) {
    var host = "";
    var plaintext = {
        cagent:    token.agent,
        sid:       token.sessionId,
        method:    "gb",
        cur:       token.currency,
        credit:    100,
        type:      "OUT",
        billno:    ""
    };
};

// var host = "http://testapi.gg626.com/api/doLink.do";
// var params = {
//     method:    "tr",
//     sessionId: req.token.sessionId,
//     cagent:    req.token.agent,
//     loginname: req.token.nickname,
//     billno:    "操作序列号，唯一，30位以内",
//     type:      "1为存款 2为取款",
//     credit:    INT "操作金额",
//     gameId
//     sectionId
//     closeFlag
//     ip
//     turnover
//     winloss
// };
//
// var url = signUtils.formatURL(host, params);
// console.log(url);
// var options = {
//     url: url
// };
//
// request(options, function(error, response, body) {
//     console.log(error, response.statusCode, body);
// });
