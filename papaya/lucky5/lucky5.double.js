(function(root) {
    var _super = root.Serialize;
    var Lucky5 = root.Lucky5;
    var Logic = root.Lucky5.Logic;
    var Poker = root.Lucky5.Poker;
    var Double = root.Lucky5.Double = function(opts) {
        opts = opts || {};

        this.deck                   = []; // 一整副牌
        this.handPokers             = []; // 手牌
        this.dealerIndex            = 0;
        this.playerIndex            = -1;

        this.lastScore              = opts.lastScore;
        this.betAmount              = 0;
        this.score                  = 0;
        this.round                  = 0;
    };

    //Inherits Class
    root.inherits(Double, _super);

    //Constants
    Double.RESULT_WAIT      = 0;
    Double.RESULT_WIN       = 1;
    Double.RESULT_DRAW      = 2;
    Double.RESULT_LOST      = 3;

    Double.BET_ORIG         = 0;
    Double.BET_DOUBLE       = 1;
    Double.BET_HALF         = 2;

    //Extend Prototype
    root.extend(Double.prototype, {
        init: function () {
            // 初始押注
            this.betAmount              = this.lastScore;
            this.handPokers             = [];
            this.dealerIndex            = 0;
            this.playerIndex            = -1;

            // 初始化扑克牌
            var types = Object.keys(Lucky5.Poker.DECK);
            for (var tIndex = 0, size = types.length; tIndex < size; tIndex++) {
                var type = types[tIndex];
                var array = Lucky5.Poker.DECK[type];

                for (var cIndex = 0, size2 = array.length; cIndex < size2; cIndex++) {
                    var name = array[cIndex];
                    var poker = new Lucky5.Poker();

                    poker.type = type;
                    poker.name = name;
                    poker.value = Lucky5.Poker.DECK_VALUE[type][name];

                    this.deck.push(poker);
                }
            }

            // 洗牌
            this.shuffle();
        },

        shuffle: function () {
            var newDeck = [];

            while (this.deck.length) {
                var min = 0;
                var max = this.deck.length - 1;

                var index = Math.floor(Math.random() * (max - min) + min);
                newDeck.push(this.deck[index]);
                this.deck.splice(index, 1);
            }

            this.deck = newDeck;
        },

        bet: function (type) {
            if (type == Double.BET_HALF) {
                this.betAmount /= 2;
            } else if (type == Double.BET_DOUBLE) {
                this.betAmount *= 2;
            } else {

            }
        },

        deal: function () {
            for (var i = 0; i < Lucky5.MAX_HAND; i++) {
                this.handPokers.push(this.deck.shift());
            }
        },

        draw: function(selectIndex) {
            if (selectIndex < 1 || selectIndex >= 5) {
                return;
            }

            this.playerIndex = selectIndex;
        },
        
        end: function() {
            var result = 0;
            var score = 0;
            var lastScore = this.lastScore;
            var dealerPoker = this.handPokers[0];
            var playerPoker = this.handPokers[this.playerIndex];

            if (playerPoker.value > dealerPoker.value) {
                result = Double.RESULT_WIN;
                score = this.betAmount * 2;
                lastScore = score;
            } else if (playerPoker.value < dealerPoker.value) {
                result = Double.RESULT_LOST;
                score = 0;
                lastScore = 0;
            } else {
                result = Double.RESULT_DRAW;
                score = this.betAmount;
            }

            this.result = result;
            this.score  = score;
            this.lastScore = lastScore;
        }
    });
}(Papaya));