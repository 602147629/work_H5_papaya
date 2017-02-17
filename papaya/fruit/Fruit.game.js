
(function(root) {
    var _super = root.Game;
    var Fruit = root.Fruit;
    var Game = root.Fruit.Game = function(opts) {
        opts = opts || {};

        Game.super(this, opts);

        //private members

        //public members
        this.id                     = root.Game.ID_FRUIT;

        this.init();
    };

    //Inherits Class
    root.inherits(Game, _super);

    //Extend Prototype
    root.extend(Game.prototype, {
        init: function() {

        },

        //*
    });

    Game.STATE = {};
    Game.STATE.READY            = 0;
    Game.STATE.STARTED          = 1;
    Game.STATE.SHUFFLED         = 2;
    Game.STATE.DEALED           = 3;
    Game.STATE.DRAWED           = 4;
    Game.STATE.ENDED            = 9;
}(Papaya));