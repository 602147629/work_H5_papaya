
var NetManager = (function(_super) {
    var CODE = Papaya.Code;

    function NetManager() {
        NetManager.super(this);

        // 游戏服务器地址
        this.service           = null;

        // 游戏服务器连接
        this.socket            = null;

        // 消息序列号
        this.msgIndex          = 0;

        // 回调队列
        this.handlers          = {};

        // 服务器唯一标识
        this.uuid              = null;

        // 认证令牌
        this.token             = null;

        this.init();
    }

    Laya.class(NetManager, "NetManager", _super);

    NetManager.prototype.init = function() {
        this.socket = new SocketIO();

        this.socket.on(SocketIO.CONNECTED, this, this.onServerConnected);
        this.socket.on(SocketIO.DICONNECTED, this, this.onServerDisconnected);
        this.socket.on(SocketIO.ERROR, this, this.onServerError);
        this.socket.on(SocketIO.CLOSED, this, this.onServerClosed);
        this.socket.on(SocketIO.MESSAGE, this, this.onServerMessage);
    };

    NetManager.prototype.encode = function() {
        var key;
        var keys = [];
        for (key in params) {
            if (key == 'signature') {
                continue;
            }

            keys.push(key);
        }

        keys.sort();

        var url = '';
        for (var i = 0, size = keys.length; i < size; i++) {
            key = keys[i];
            url += key + '=' + encodeURIComponent(params[key]);
            if (i < keys.length - 1) {
                url += '&';
            }
        }

        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(url, App.config.appKey + 'papaya&'));
    };

    NetManager.prototype.formatURL = function(uri, params) {
        params = params || {};

        params.appID        = App.config.appID;
        params.udid         = App.storageManager.getDeviceId();
        params.signature    = this.encode(params);

        var url = uri + '?';

        for (var key in params) {
            url += key + '=' + encodeURIComponent(params[key]) + '&';
        }

        return url.substring(0, url.length-1);
    };

    NetManager.prototype.resolve = function(path) {
        if (path.charAt(path.length - 1) == "/") {
            return path.substr(0, path.length - 1);
        }

        return path;
    };

    NetManager.prototype.get = function(url, handler) {
        var http = new Laya.HttpRequest();

        var onHttpRequestComplete = function() {
            if (http.data.code == CODE.OK) {
                handler.runWith([null, http.data.data]);
            }
            else {
                var error = {
                    number: http.data.subcode,
                    message: http.data.message
                };
                handler.runWith(error);
            }
        };

        var onHttpRequestError = function(e) {
            var error = {
                number: CODE.HTTP.REQUEST_ERROR,
                message: e
            };
            handler.runWith(error, {});
        };

        // var onHttpRequestProgress = function(e) {
        //     if (progress) {
        //         progress.runWith(e);
        //     }
        // };

        //http.on(Laya.Event.PROGRESS, null, onHttpRequestProgress);
        http.once(Laya.Event.ERROR, null, onHttpRequestError);
        http.once(Laya.Event.COMPLETE, null, onHttpRequestComplete);
        http.send(url, null, 'get', 'json');
    };

    NetManager.prototype.post = function() {

    };

    NetManager.prototype.request = function(api, params, handler) {
        params = params || {};

        var self = this;
        var url = this.formatURL(this.service + api, params);

        var complete = function(err, data) {
            if (handler) {
                handler.runWith([err, data]);
            }
        };
        this.get(url, Laya.Handler.create(null, complete));
    };

    NetManager.prototype.send = function(router, data, handler) {
        var msg = {};

        msg.id = ++this.msgIndex;
        msg.router = router;
        msg.data = data;

        if (handler != undefined) {
            this.handlers[msg.id] = handler;
        }

        this.socket.send(msg);
    };

    NetManager.prototype.connectServer = function() {
        this.socket.connect(this.service);
    };

    NetManager.prototype.onServerConnected = function() {
        this.event(SocketIO.CONNECTED);
    };

    NetManager.prototype.onServerDisconnected = function() {
        this.event(SocketIO.DICONNECTED);
    };

    NetManager.prototype.onServerError = function() {
        this.event(SocketIO.ERROR);
    };

    NetManager.prototype.onServerClosed = function() {
        this.event(SocketIO.CLOSED);
    };

    NetManager.prototype.onServerMessage = function(data) {
        try {
            var msg = JSON.parse(data);
            var handler = this.handlers[msg.id];

            if (handler != undefined) {
                if (msg.code == CODE.OK) {
                    handler.runWith([null, msg.data]);
                }
                else {
                    var error = {
                        number: msg.err,
                        message: msg.msg
                    };
                    handler.runWith(error);
                }

                delete this.handlers[msg.id];
            }
        }
        catch (e) {
            console.log(e.stack);
        }
    };

    return NetManager;
}(laya.events.EventDispatcher));

var SingleAlone = (function(_super) {
    var Fruit = Papaya.Fruit;

    function SingleAlone() {
        SingleAlone.super(this);
    }

    Laya.class(SingleAlone, "SingleAlone", _super);

    // @Override
    SingleAlone.prototype.init = function() {
    };

    SingleAlone.prototype.encode = function() {
    };

    SingleAlone.prototype.formatURL = function() {
    };

    SingleAlone.prototype.resolve = function() {
    };

    SingleAlone.prototype.get = function() {
    };

    SingleAlone.prototype.post = function() {
    };

    SingleAlone.prototype.send = function() {
    };

    SingleAlone.prototype.connectServer = function() {
        Laya.timer.once(1000, this, this.onServerConnected);
    };

    SingleAlone.prototype.onServerConnected = function() {
        this.event(SocketIO.CONNECTED);
    };

    SingleAlone.prototype.request = function(api, params, handler) {
        var data = {};
        var resp = SingleAlone.response[api];

        if (typeof resp === 'object') {
            data = resp;
        }
        else if (typeof resp == "function") {
            data = resp(params);
        }
        else {
            data = {};
        }

        handler.runWith([null, data]);
    };

    SingleAlone.response = {};
    SingleAlone.response['/user/auth'] = {};
    SingleAlone.response['/user/sync'] = {};
    SingleAlone.response['/user/enter'] = {};

    SingleAlone.response['/fruit/betOn'] = function(params) {
        var data = {};
        var game = App.game = new Fruit.Game();

        data = game.betOn(params.bet);
        data.player = {
            balance: App.player.balance - game.betTotal + game.bonusWin
        };

        return data;
    };

    SingleAlone.response['/fruit/guessTheSizeOf'] = function(params) {
        var data = {};
        var game = App.game = new Fruit.Game();

        var betInfo = {
            bet: params.bet,
            betType: params.betType
        };

        data = game.guessTheSizeOf(betInfo);
        data.player = {
            balance: App.player.balance + game.bonusWin - game.betTotal
        };

        return data;
    };
    return SingleAlone;
}(NetManager));
