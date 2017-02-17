var window = window || global;

var Shark = window.Shark = (function(root) {
    Shark  = {
        designWidth: 1136,
        designHeight: 640,
        resource: {}
    };

    Shark.inherits = function(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });

        ctor.prototype._super = superCtor.prototype;
    };

    Shark.extend = function(origin, add) {
        if (add === null || typeof add !== 'object') return origin;

        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
            origin[keys[i]] = add[keys[i]];
        }
        return origin;
    };

    return Shark;
}(window));

(function(root) {
    var Event = Shark.Event = (function() {
        function Event() {}

        // class init events
        Event.INITED = "inited";
        Event.STARTED = "started";

        // loader work flow
        Event.LOADING = "loading";
        Event.PROGRESS = "progress";
        Event.LOADED = "loaded";

        Event.EATED_FISH = "Event_EatedFish";

        Event.SET_DATA_SOURCE = "Event_SetDataSource";       // 数据更新

        Event.SET_RECORD_HISTORY = "Event_SetRecordHistory"; // 更新历史记录

        Event.CLEAR_RECORD_HISTORY = "Event_ClearRecordHistory"; // 清空历史记录

        Event.INIT_VIEW_FISH = "Event_InitViewFish";         // 界面上的小鱼初始化
        Event.INIT_VIEW_ANI = "Event_InitViewAni";           // 界面上的动画初始化

        Event.GOLD_ROLL = "Event_GoldRoll";                  // 金币滚动动画

        Event.START_ROUND = "Event_StartRound";             // 开始回合
        Event.STOP_ROUND = "Event_StopRound";               // 回合结束
        Event.NEXT_ROUND = "Event_NextRound";               // 下一回合

        return Event;
    }());
}(Shark));