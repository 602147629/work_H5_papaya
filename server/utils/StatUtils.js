
var moment = require('moment');
var stats = require('../dbc/stats');

var StatUtils = module.exports = {};

StatUtils.getKey = function(appID, channelID, channelSDK, keyword, date) {
    var channel = channelID;
    // if (channelSDK != null && channelSDK != "") {
    //     channel = channel + '-' + channelSDK;
    // }

    return appID + '.' + channel + '.' + keyword + '.' + date;
};

StatUtils.getNewUserKey = function(appID, channelID, channelSDK, date) {
    return this.getKey(appID, channelID, channelSDK, 'new_users', date);
};

StatUtils.getActiveUserKey = function(appID, channelID, channelSDK, date) {
    return this.getKey(appID, channelID, channelSDK, 'activity_users', date);
};

StatUtils.getPayUserKey = function(appID, channelID, channelSDK, date) {
    return this.getKey(appID, channelID, channelSDK, 'pay_users', date);
};

StatUtils.statNewUsers = function(appID, channelID, channelSDK, uuid) {
    var newKey = this.getNewUserKey(appID, channelID, channelSDK, moment().format('YYYY-MM-DD'));
    var activityKey = this.getActiveUserKey(appID, channelID, channelSDK, moment().format('YYYY-MM-DD'));

    stats.SADD(newKey, uuid);
    stats.SADD(activityKey, uuid);
};

StatUtils.statActiveUsers = function(appID, channelID, channelSDK, uuid) {
    var activityKey = this.getActiveUserKey(appID, channelID, channelSDK, moment().format('YYYY-MM-DD'));
    stats.SADD(activityKey, uuid);
};

StatUtils.statPayUsers = function(appID, channelID, channelSDK, uuid) {
    var payKey = this.getPayUserKey(appID, channelID, channelSDK, moment().format('YYYY-MM-DD'));
    stats.SADD(payKey, uuid);
};
