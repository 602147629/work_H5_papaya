/*
 * Base Dependencies
 */
var util = require('util');

/*
 * Server Dependencies
 */
var debug = require('debug')('papaya:agent:base');
var PapayaDB = require('../models/papaya');
var Agent = require('./Agent');

/*
 * Papaya Dependencies
 */
var Papaya = require('../../papaya/');
var Code = Papaya.Code;

var AgentNW = module.exports = function() {
    
};

util.inherits(AgentNW, Agent);

var proto = AgentNW.prototype;

proto.getBalance = function(token, callback) {
    var userID = token.userID;
    var Credit = PapayaDB.models.credit;

    Credit.findOne({
        where: { userID: userID }
    }).then(function(record) {
        if (record == null) {
            return Credit.create({
                userID:    userID,
                currency:  "TOKEN",
                balance:   100000
            })
        }

        return record;
    }).then(function(record) {
        callback(null, record.balance);
    }).catch(function(e) {
        debug(e);
        callback(Code.INTERNAL.MySQL_ERROR);
    });
};

proto.deposit = function(token, amount, callback) {
    var userID = token.userID;
    var Credit = PapayaDB.models.credit;

    Credit.findOne({
        where: { userID: userID }
    }).then(function(record) {
        record.balance += Number(amount);

        return record.save();
    }).then(function(record) {
        callback(null, record.balance);
    }).catch(function(e) {
        debug(e);
        callback(Code.INTERNAL.MySQL_ERROR);
    })
};

proto.withdraw = function(token, amount, callback) {
    var userID = token.userID;
    var Credit = PapayaDB.models.credit;

    Credit.findOne({
        where: { userID: userID }
    }).then(function(record) {
        if (record.balance < amount) {
            callback(Code.RESPONSE.BALANCE_INSUFFICIENT);
            return;
        }

        record.balance -= Number(amount);
        return record.save();
    }).then(function(record) {
        callback(null, record.balance);
    }).catch(function(e) {
        debug(e);
        callback(Code.INTERNAL.MySQL_ERROR);
    })
};
