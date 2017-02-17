
var AnimationManager = (function(_super) {
    var Animations = {
        //"ani.poker.blink": {
        //    urls: [
        //        "ani.images/10001.png",
        //        "ani.images/10002.png"
        //    ],
        //    interval: 480
        //},
        //
        //"ani.blue.light": {
        //    urls: [
        //        "ani.images/10003.png",
        //        "ani.images/10004.png"
        //    ],
        //    interval: 480
        //},
        //
        //"ani.table.win": {
        //    urls: [
        //        "ani.images/10005.png",
        //        "ani.images/10006.png",
        //        "ani.images/10007.png",
        //        "ani.images/10008.png",
        //        "ani.images/10009.png",
        //        "ani.images/10010.png"
        //    ],
        //    interval: 480
        //},
        //
        //"ani.royal.flush": {
        //    urls:  [
        //        "ani.images/10011.png",
        //        "ani.images/10012.png",
        //        "ani.images/10013.png",
        //        "ani.images/10014.png",
        //        "ani.images/10015.png"
        //    ],
        //    interval: 480
        //},
        //
        //"ani.blink.star": {
        //    urls: [
        //        "ani.images/10016.png",
        //        "ani.images/10017.png"
        //    ],
        //    interval: 480
        //},
        //
        //"ani.table.five": {
        //    urls: [
        //        "ani.images/10018.png",
        //        "ani.images/10019.png"
        //    ],
        //    interval: 480
        //}
    };

    var AnimationManager = function() {
        AnimationManager.super(this);
    };

    Laya.class(AnimationManager, "AnimationManager", _super);

    AnimationManager.prototype.init = function(callback) {
        var keys = Object.keys(Animations);
        for (var i = 0, size = keys.length; i < size; i++) {
            var name = keys[i];
            var urls = Animations[name].urls;
            var anim = new Laya.Animation();

            anim.loadImages(urls, name);
        }

        callback && callback();
    };

    AnimationManager.prototype.get = function(name) {
        var anim = new Laya.Animation();
        var interval = Animations[name] && Animations[name].interval || 30;

        anim._play = anim.play;
        anim._name = name;
        anim.interval = interval;
        anim.play = function() {
            this._play(0, true, this._name);
        };

        return anim;
    };

    return AnimationManager;
}(laya.events.EventDispatcher));