
(function(root) {
    var _super = root.Serialize;
    var Game = root.Game = function(opts) {
        opts = opts || {};

        Game.super(this, opts);

        //private members

        //public members
        this.id             = Game.ID_BASE;
    };

    //Inherits Class
    root.inherits(Game, _super);

    //Extend Prototype
    root.extend(Game.prototype, {

    });

    Game.ID_BASE           = 0;
    Game.ID_LUCKY5         = 1;
    Game.ID_FRUIT          = 2;
}(Papaya));