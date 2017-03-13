
var fs = require('fs');
var path = require('path');
var async = require('async');

var debug = require('debug')('papaya:service:cache');
var PapayaDB = require('../models/papaya');

var defaultAgent = "gg";
var CacheManager = module.exports = {};

CacheManager.name = "CacheManager";

CacheManager.init = function(cb) {
    var self = this;

    this.agents = {};
    this.agentClass = {};

    async.series([
        function(callback) {
            self.load(callback)
        }
    ], function(err, results) {
        if (err != null) {
            debug("cacheManager init error: ", err);
            return;
        }

        debug("%s inited...", self.name);
        process.nextTick(cb);
    });
};

CacheManager.start = function(cb) {
    debug("%s started...", this.name);
    process.nextTick(cb);
};

CacheManager.stop = function(cb) {
    debug("%s stopped...", this.name);
    process.nextTick(cb);
};

CacheManager.load = function(callback) {
    var self = this;
    var Agent = PapayaDB.models.agent;

    Agent.findAll().then(function(records) {
        records.forEach(function(record) {
            var filename = path.resolve(__dirname, "../agents", record.ctor);

            self.agents[record.id] = record;
            self.agentClass[record.name] = require(filename);

            debug("agent:%s:%d loaded", record.name, record.id);
        });

        callback(null);
    }).catch(function(e) {
        debug(e);
        callback(e);
    })
};

CacheManager.getAgent = function(ag) {
    var name = ag || defaultAgent;
    var names = Object.keys(this.agentClass);
    if (names.indexOf(name) == -1) {
        name = defaultAgent;
    }

    var Constructor = this.agentClass[name];
    return new Constructor();
};
