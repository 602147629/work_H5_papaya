(function(root) {
    var _super = root.Game;
    var Rotary = root.Fruit.Rotary;
    var Logic = root.Fruit.Logic;

    var Game = root.Fruit.Game = function(opts) {
        opts = opts || {};

        Game.super(this, opts);

        //private members

        //public members
        this.id             = root.Game.ID_FRUIT;

        this.baseLightNum   = 1;
        this.multiples      = {low: 10, high: 20};
        this.betInfo        = {};
        this.betTotal       = 0;

        this.bonusWin       = 0;

        this.init();
    };

    //Inherits Class
    root.inherits(Game, _super);

    //Extend Prototype
    root.extend(Game.prototype, {
        init: function() {
        },

        betOn: function (betInfo) {
            var result = {
                errCode: null,
                fruits: {},
                multiples: {
                    low: 10,
                    high: 20
                },
                betTotal: 0,
                bonusWin: 0
            };

            betInfo = betInfo || {};

            var betTotal = 0;
            for (var betIndex in betInfo) {
                betTotal += betInfo[betIndex];
            }
            if (betTotal <= 0) {
                result.errCode = Game.ERR_CODE.NOT_BET;
                return result;
            }

            this.betInfo = betInfo;

            var giveLights = Logic.giveLights();
            var lightTotal = this.baseLightNum + giveLights;

            result.fruits = Logic.getRandomRotaryFruits(lightTotal);

            result.multiples = Logic.randomMultiple();
            this.multiples = result.multiples;

            result.betTotal = betTotal;
            this.betTotal = result.betTotal;

            result.bonusWin = this.calcBonusWin(result.fruits);
            this.bonusWin = result.bonusWin;

            return result;
        },

        calcBonusWin: function (fruitList) {
            var bonus = 0;
            this.bonusWin = 0;

            var rotaryFruits = Rotary.ROTARY_FRUITS;
            var bigTripleFruits = Rotary.BIG_TRIPLE;
            var smallTripleFruits = Rotary.SMALL_TRIPLE_ALL_FRUITS;
            var quadruple = Rotary.QUADRUPLE;

            var fruit = null;
            var fruitId = 0;
            var fruitIndex = 0;

            for (var listName in fruitList) {
                var singleFruitList = fruitList[listName];
                var length = singleFruitList.length;
                for (var index = 0; index < length; index ++) {
                    fruitIndex = singleFruitList[index];
                    fruit = rotaryFruits[fruitIndex];
                    var fruitName = fruit.fruitName;
                    var multiple = fruit.multiple;
                    var id = fruit.id;
                    var bet = Number(this.betInfo[fruitName]);

                    if (Rotary.LUCK_INDEX_LIST.indexOf(id) == -1) {
                        if (multiple <= 1) {
                            if (bigTripleFruits.indexOf(id) != -1) {
                                multiple = this.multiples.high;
                            }
                            else if (smallTripleFruits.indexOf(id) != -1) {
                                multiple = this.multiples.low;
                            }
                            else if (quadruple.indexOf(id) != -1){
                                multiple = Rotary.MULTIPLE_BY_APPLE;
                            }
                        }

                        bonus += bet * multiple;
                    }
                }
            }

            return bonus;
        },

        guessTheSizeOf: function (betInfo) {
            var result = {
                errCode: null,
                randNum: 1,
                bonusWin: 0
            };

            var bonus = 0;
            var betNum = betInfo.bet;
            var betType = betInfo.betType || Rotary.GUESS_SIZE_TYPE.LOW;
            var betLimit = betNum * 2;

            if (betNum == 0) {
                result.errCode = Game.ERR_CODE.NOT_BET;
                return result;
            }

            if (betNum > betLimit) {
                result.errCode = Game.ERR_CODE.EXCEED_BETS;
                return result;
            }

            var randNum = Logic.getGuessNum();
            var randType = Logic.getGuessNumType(randNum);

            if (betType == randType) {
                bonus = betNum * 2;
            }
            else {
                bonus = -betNum;
                betNum = 0;
            }

            result.bonusWin = bonus;
            this.bonusWin = bonus;

            result.randNum = randNum;

            this.betTotal = betNum;

            return result;
        }
    });

    Game.STATE = {};
    Game.STATE.READY            = 0;
    Game.STATE.STARTED          = 1;
    Game.STATE.SHUFFLED         = 2;
    Game.STATE.DEALED           = 3;
    Game.STATE.DRAWED           = 4;
    Game.STATE.ENDED            = 9;

    Game.ERR_CODE = {
        NOT_BET: 10001, //*没有下注
        EXCEED_BETS: 10002 //*超过下注金额
    };
}(Papaya));
