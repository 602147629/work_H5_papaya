
(function(root) {
    var _super = root.Game;
    var Fruit = root.Fruit;
    var Rotary = root.Fruit.Rotary;
    var Game = root.Fruit.Game = function(opts) {
        opts = opts || {};

        Game.super(this, opts);

        //private members
        this._fruitList     = [];//*临时储存

        //public members
        this.id             = root.Game.ID_FRUIT;

        this.baseLightNum   = 1;
        this.hadLuckFruit   = false;
        this.lowMultiple    = 10;
        this.highMultiple   = 20;
        this.betInfo        = {};
        this.betTotal       = 0;

        this.bonus          = 0;

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
                rotateFruit: [],
                luckFruit: [],
                rewardFruit: [],
                isEatLight: false,
                bonusWin: 0,
                betTotal: 0,
                lowMultiple: 10,
                highMultiple: 20
            };

            this.hadLuckFruit = false;
            this._fruitList = [];
            this.betInfo = {};
            this.betTotal = 0;

            if (typeof (betInfo) != "object"){
                console.log("数据错了");
                return;
            }

            //*检查是否没有押注
            var betSum = 0;
            var betNum = 0;
            for (var index in betInfo) {
                betNum = betInfo[index];
                betSum += betNum;
            }
            if (betSum <= 0) {
                console.log("没有押注");
                return;
            }
            this.betInfo = betInfo;
            this.betTotal = betSum;

            //*一开始转灯
            var giveLightNum = this.giveLights();
            var lightTotal = this.baseLightNum + giveLightNum;
            for (var i = 0; i < lightTotal; i++) {
                var fruit = this.randomFruit();
                //*存转灯的初始结果
                result.rotateFruit.push(fruit);
                this._fruitList.push(fruit);
            }

            //*解析第一次随机到的水果
            var finalResults = this.finalResult();
            result.luckFruit = finalResults.luckFruit;
            result.rewardFruit = finalResults.rewardFruit;
            result.isEatLight = finalResults.isEatLight;

            //*倍率区的随机
            this.randomMultiple();
            result.lowMultiple = this.lowMultiple;
            result.highMultiple = this.highMultiple;

            this.bonus = this.calcTotalBonusWin(result);
            //*结算
            result.bonusWin = this.bonus;
            result.betTotal = -this.betTotal;

            return result;
        },

        giveLights: function() {
            var isGiveLight = false;
            var giveLightNum = 0;

            var rand = this.randomNumber(99);
            if (rand < Rotary.PROBABILITY_GIVE_LIGHT_START) {
                //*开始的时候送灯
                isGiveLight = true;
            }
            else {
                rand = this.randomNumber(99);
                //*结束的时候送灯
                if (rand < Rotary.PROBABILITY_GIVE_LIGHT_END) {
                    isGiveLight = true;
                }
            }

            if (isGiveLight) {
                giveLightNum = this.randomNumber(4, 1);
            }

            return giveLightNum;
        },

        randomNumber: function (num, addNum) {
            num = num || 1;
            addNum = addNum || 0;
            return Math.floor(Math.random() * num) + addNum;
        },

        randomFruit: function () {
            var fruit = null;
            //*随机水果,如果已经有了luck，就再次随机
            var fruitList = Rotary.ROTARY_FRUITS;
            var fruitIndex = root.Utils.calcWeight(fruitList);
            var row = fruitList[fruitIndex];
            var fruitName = row.fruitName;
            var isLuckFruit = this.checkFruitIsLuck(fruitName);
            if (isLuckFruit) {
                if (!this.hadLuckFruit) {
                    this.hadLuckFruit = true;
                    fruit = row;
                }
                else {
                    //*一局只能有一个luck
                    fruit = this.randomFruit();
                }
            }
            else {
                fruit = row;
            }

            return fruit;
        },

        finalResult: function () {
            var result = {
                luckFruit: [],
                rewardFruit: [],
                isEatLight: false
            };

            var secondFruits = this.checkFruits(this._fruitList);
            var luckResult = secondFruits.luck;
            if (luckResult) {
                if (luckResult.isEatLight) {
                    result.isEatLight = true;
                }

                if (luckResult.luckFruits.length > 0) {
                    result.luckFruit = luckResult.luckFruits;
                }
            }
            var index = null;
            var fruit = null;
            var apples = secondFruits.apples;
            for (index in apples) {
                fruit = apples[index];
                result.rewardFruit.push(fruit);
            }
            var smallTriple = secondFruits.smallTriple;
            for (index in smallTriple) {
                fruit = smallTriple[index];
                result.rewardFruit.push(fruit);
            }
            var bigTriple = secondFruits.bigTriple;
            for (index in bigTriple) {
                fruit = bigTriple[index];
                result.rewardFruit.push(fruit);
            }

            return result;
        },

        checkFruits: function (fruitList) {
            var fruitListLength = fruitList.length;
            if (fruitListLength <= 0){
                return;
            }

            var firstFruits = fruitList;
            var secondFruitList = {
                luck: null,
                apples: [],
                smallTriple: [],
                bigTriple: []
            };
            var fruit = null;
            var fruitName = "";
            for (var fruitIndex = 0; fruitIndex < fruitListLength; fruitIndex++) {
                fruit = firstFruits[fruitIndex];
                fruitName = fruit.fruitName;
                if (this.checkFruitIsLuck(fruitName)) {
                    secondFruitList.luck = this.getLuckFruitResult();
                }
                else if (this.checkFruitIsApple(fruit)) {
                    secondFruitList.apples = this.getAppleRandResult();
                }
                else if (this.checkFruitIsSmallTriple(fruit)) {
                    secondFruitList.smallTriple = this.getSmallTripleResult();
                }
                else if (this.checkFruitIsBigTriple(fruit)) {
                    secondFruitList.bigTriple = this.getBigTripleResult();
                }
            }

            return secondFruitList;
        },

        randomMultiple: function () {
            //*清空倍率
            this.cleanMultiple();
            //*随机倍率区
            var rand = this.randomNumber(99);
            var lowMultipleIndex = this.getMultipleIndex(rand);
            this.lowMultiple = Rotary.RANDOM_MULTIPLE_LOW[lowMultipleIndex];

            rand = this.randomNumber(99);
            var highMultipleIndex = this.getMultipleIndex(rand);
            this.highMultiple = Rotary.RANDOM_MULTIPLE_HIGH[highMultipleIndex];
        },

        calcTotalBonusWin: function (result) {
            var bonus = 0;
            if (!result.isEatLight) {
                var rotateFruitBonus = this.calcBonus(result.rotateFruit);
                var luckFruitBonus = this.calcBonus(result.luckFruit);
                var rewardFruitBonus = this.calcBonus(result.rewardFruit);

                bonus = rotateFruitBonus + luckFruitBonus + rewardFruitBonus;
            }

            return bonus;
        },

        calcBonus: function (fruitList) {
            var bonus = 0;
            var fruit = null;
            var fruitName = "";
            var multiple = 10;
            var betFruitInfo = null;
            for (var index in fruitList) {
                fruit = fruitList[index];
                fruitName = fruit.fruitName;
                multiple = fruit.multiple;
                betFruitInfo = this.betInfo[fruitName];
                if (betFruitInfo <= 0) {
                    continue;
                }

                if (multiple <= 1) {
                    if (this.checkFruitIsSmallTriple(fruit)) {
                        multiple = this.lowMultiple;
                    }
                    else if (this.checkFruitIsSmallTriple(fruit)) {
                        multiple = this.highMultiple;
                    }
                    else if (this.checkFruitIsApple(fruit)){
                        multiple = Rotary.MULTIPLE_BY_APPLE;
                    }
                }

                bonus += betFruitInfo * multiple;
            }

            return bonus;
        },

        getMultipleIndex: function (rand) {
            var index = 0;
            if (rand >= 33 && rand < 66) {
                index = 1;
            }
            else if (rand >= 66 && rand <= 99) {
                index = 2
            }

            return index;
        },

        cleanMultiple: function () {
            this.lowMultiple = 10;
            this.highMultiple = 20;
        },

        checkFruitIsLuck: function (fruitName) {
            if (!fruitName) {
                return;
            }

            var isLuckFruit = false;
            var luckFruitNameList = Rotary.LUCK_NAME_LIST;
            if (luckFruitNameList.indexOf(fruitName) != -1) {
                isLuckFruit = true;
            }

            return isLuckFruit;
        },

        getLuckFruitResult: function () {
            //*存在luck，吃灯5%，送灯75%，小三元10%，大三元10%
            var result = {
                isEatLight: false,
                luckFruits: []
            };
            var luckNum = this.randomNumber(99);
            var fruit = null;
            if (luckNum >= 0 && luckNum < 5) {
                result.isEatLight = true;
            }
            else if (luckNum >= 5 && luckNum < 80){
                var giveLightNum = this.randomNumber(4, 1);
                for (var i = 0; i< giveLightNum; i++) {
                    fruit = this.randomFruit();
                    result.luckFruits.push(fruit);
                }
                var fruits = this.checkFruits(result.luckFruits);
                var index = null;
                var apples = fruits.apples;
                for (index in apples) {
                    fruit = apples[index];
                    result.luckFruits.push(fruit);
                }
                var smallTriple = fruits.smallTriple;
                for (index in smallTriple) {
                    fruit = smallTriple[index];
                    result.luckFruits.push(fruit);
                }
                var bigTriple = fruits.bigTriple;
                for (index in bigTriple) {
                    fruit = bigTriple[index];
                    result.luckFruits.push(fruit);
                }
            }
            else if (luckNum >= 80 && luckNum < 90) {
                result.luckFruits = this.getSpecialFruits(Rotary.SPECIAL_TYPE_NAME_LIST.SMALL_TRIPLE);
            }
            else {
                result.luckFruits = this.getSpecialFruits(Rotary.SPECIAL_TYPE_NAME_LIST.BIG_TRIPLE);
            }

            return result;
        },

        checkFruitIsApple: function (fruit) {
            if (!fruit) {
                return;
            }

            var isApple = false;
            var fruitName = fruit.fruitName;
            var multiple = fruit.multiple;

            if (fruitName == "Apple" && multiple == 1) {
                isApple = true;
            }

            return isApple;
        },

        getAppleRandResult: function () {
            //*5%大四喜
            var result = [];
            var rand = this.randomNumber(99);
            if (rand < Rotary.PROBABILITY_QUADRUPLE) {
                result = this.getSpecialFruits(Rotary.SPECIAL_TYPE_NAME_LIST.QUADRUPLE);
            }

            return result;
        },

        checkFruitIsSmallTriple: function (fruit) {
            if (!fruit) {
                return;
            }
            var fruitName = fruit.fruitName;
            var multiple = fruit.multiple;
            var isSmallTriple = false;

            if ((fruitName == "Bell" || fruitName == "Pomelo" || fruitName == "Orange") && multiple == 1) {
                isSmallTriple = true;
            }

            return isSmallTriple;
        },

        getSmallTripleResult: function () {
            var result = [];
            var rand = this.randomNumber(99);
            if (rand < Rotary.PROBABILITY_SMALL_TRIPLE) {
                result = this.getSpecialFruits(Rotary.SPECIAL_TYPE_NAME_LIST.SMALL_TRIPLE);
            }

            return result;
        },

        checkFruitIsBigTriple: function (fruit) {
            if (!fruit) {
                return;
            }
            var fruitName = fruit.fruitName;
            var multiple = fruit.multiple;
            var isBigTriple = false;

            if ( (fruitName == "Watermelon" || fruitName == "Star" || fruitName == "77") && multiple == 1) {
                isBigTriple = true;
            }

            return isBigTriple;
        },

        getBigTripleResult: function () {
            var result = [];
            var rand = this.randomNumber(99);
            if (rand < Rotary.PROBABILITY_BIG_TRIPLE) {
                result = this.getSpecialFruits(Rotary.SPECIAL_TYPE_NAME_LIST.BIG_TRIPLE);
            }

            return result;
        },

        getSpecialFruits: function (fruitType) {
            if (!fruitType) {
                return;
            }

            var specialFruitType = Rotary.SPECIAL_TYPE_NAME_LIST;
            var fruitListCopy = [];
            var result = [];
            for (var index = 0; index < this._fruitList.length; index++) {
                fruitListCopy[index] = JSON.stringify(this._fruitList[index]);
            }
            var fruit = null;
            switch (fruitType) {
                case specialFruitType.BIG_TRIPLE:
                {
                    var bigTripleFruits = Rotary.BIG_TRIPLE;
                    for (var i = 0; i < bigTripleFruits.length; i++) {
                        fruit = JSON.stringify(bigTripleFruits[i]);
                        if (fruitListCopy.indexOf(fruit) == -1) {
                            result.push(bigTripleFruits[index]);
                        }
                    }
                    break;
                }

                case specialFruitType.SMALL_TRIPLE:
                {
                    var smallTripleFruits = Rotary.SMALL_TRIPLE;
                    for (var smallIndex = 0; smallIndex < smallTripleFruits.length; smallIndex++) {
                        fruit = JSON.stringify(smallTripleFruits[smallIndex]);
                        if (fruitListCopy.indexOf(fruit) == -1) {
                            result.push(smallTripleFruits[smallIndex]);
                        }
                    }
                    break;
                }

                case specialFruitType.QUADRUPLE:
                {
                    var sum = 0;
                    var total = 4;
                    for (var fruitIndex in fruitListCopy) {
                        if (fruitListCopy[fruitIndex] == JSON.stringify(Rotary.QUADRUPLE)) {
                            sum ++;
                        }
                    }

                    for (sum; sum < total; sum++) {
                        result.push(Rotary.QUADRUPLE);
                    }
                    break;
                }
            }

            return result;
        }
    });


    guessTheSizeOf: function (betInfo) {
        var result = {
           randNum: 0,
           bonusWin: 0
        };
        
        var rand = this.randomNum(12, 1);

        if (rand >=1 && rand <= 6) {

        }
        else if (rand >= 8 && rand <= 13) {

        } 
        else {

        }
        

        return result;
    };

    Game.STATE = {};
    Game.STATE.READY            = 0;
    Game.STATE.STARTED          = 1;
    Game.STATE.SHUFFLED         = 2;
    Game.STATE.DEALED           = 3;
    Game.STATE.DRAWED           = 4;
    Game.STATE.ENDED            = 9;
}(Papaya));
