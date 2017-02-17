
var async = require('async');

var app = require('../app');
var masterDB = require('../models/master');

if (app.get('env') == "production") {
    console.error("Don't do this in production environment!!!");
    process.exit(-1);
}

var keys = Object.keys(masterDB.models);
var iterator = function(name, callback) {
    var Model = masterDB.models[name];

    Model.sync({ force: true }).then(function() {
        console.log("Model %s synced...", name);
        callback();
    }).catch(function(e) {
        callback(e);
    })
};

async.eachSeries(keys, iterator, function(err) {
    if (err != null) {
        console.error("models init error", err);
        process.exit(-1);
    }

    console.log("models init sucess!");
});

