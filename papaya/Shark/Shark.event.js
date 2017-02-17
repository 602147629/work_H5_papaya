(function(root) {
    var Emitter = root.Emitter =  function() {
        this._events = {};
        this._eventsCount = 0;
    };

    Emitter.prototype.on =
        Emitter.prototype.addEventListener = function(event, fn,data) {
            this._events = this._events || {};

            (this._events[event] = this._events[event] || [])
                .push(fn);
            this._eventsCount++;
            return this;
        };

    Emitter.prototype.once = function(event, fn) {
        var self = this;
        this._events = this._events || {};

        function on() {
            self.off(event, on);
            fn.apply(this, arguments);
        }

        fn._off = on;
        this.on(event, on);
        return this;
    };

    Emitter.prototype.off =
        Emitter.prototype.removeListener =
            Emitter.prototype.removeAllListeners =
                Emitter.prototype.removeEventListener = function(event, fn) {
                    var events = this._events[event];
                    if (!events) return this;

                    // remove all handlers
                    if (1 == arguments.length) {
                        this._eventsCount -= this._events[event].length;
                        delete this._events[event];
                        return this;
                    }

                    if(!fn){
                        console.log("error fn is null Emitter.prototype.off event:" + event);
                    }

                    // remove specific handler
                    var i = events.indexOf(fn._off || fn);
                    if (~i) events.splice(i, 1);
                    if(~i) this._eventsCount--;
                    return this;
                };

    Emitter.prototype.emit = function(event) {
        this._events = this._events || {};
        var args = [].slice.call(arguments, 1)
            , events = this._events[event];

        if (events) {
            events = events.slice(0);
            for (var i = 0, len = events.length; i < len; ++i) {
                events[i].apply(this, args);
            }
        }

        return this;
    };

    Emitter.prototype.listeners = function(event){
        this._events = this._events || {};
        return this._events[event] || [];
    };

    Emitter.prototype.hasListeners = function(event){
        return !! this.listeners(event).length;
    };

    Emitter.prototype.clearAllListeners = function(){
        var fnNum = 0;
        for(var i in this._events){
            var event = this._events[i];
            for(var f in event){
                fnNum++;
            }
        }

        this._events = null;
        this._eventsCount -= fnNum;
    };
}(Shark));
