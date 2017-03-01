(function(root) {
    var Utils = Papaya.Utils;
    var Rotary = root.Rotary;
    var Logic = root.Logic = function() {
    };

    Logic.giveLights = function () {
        var isGiveLight = false;
        var giveLightNum = 0;

        var rand = Utils.random_number(100);
        if (rand < Rotary.PROBABILITY_GIVE_LIGHT_START) {
            //*开始的时候送灯
            isGiveLight = true;
        }
        else {
            rand = Utils.random_number(100);
            //*结束的时候送灯
            if (rand < Rotary.PROBABILITY_GIVE_LIGHT_END) {
                isGiveLight = true;
            }
        }

        if (isGiveLight) {
            //*送1-5个灯
            giveLightNum = this.getGiveLightTotal();
        }

        return giveLightNum;
    };

    Logic.getGiveLightTotal = function () {
        return Utils.range_value(1, 6);
    };

    Logic.getRandomRotaryFruits = function (lightTotal) {
        lightTotal = lightTotal || 1;

        this.hasLuckFruit = false;
        this.hasBigTriple = false;
        this.hasSmallTriple = false;
        this.hasQuadruple = false;

        this.luckFruitIndex = 0;
        this.rotaryFruits = [];
        this.luckRewardFruits = [];
        this.normalRewardFruits = [];

        var fruits = {
            rotaryFruits: null,
            luckRewardFruits: null,
            normalRewardFruits: null
        };

        var wasSaveLightNum = 0;
        var fruitIndex = 0;

        for (wasSaveLightNum; wasSaveLightNum < lightTotal; wasSaveLightNum ++) {
            fruitIndex = this.getRandomFruitIndex();
            this.rotaryFruits.push(fruitIndex);
        }

        if (this.hasLuckFruit) {
            var isEatLight = this.getLuckRewardFruits();
            if (isEatLight) {
                this.rotaryFruits = [this.luckFruitIndex];
                fruits.rotaryFruits = this.rotaryFruits;
                return fruits;
            }
        }

        fruits.rotaryFruits = this.rotaryFruits;
        fruits.luckRewardFruits = this.luckRewardFruits;
        fruits.normalRewardFruits = this.normalRewardFruits;

        return fruits;
    };

    Logic.getRandomFruitIndex = function () {
        var fruitIndex = 0;
        var rotaryFruits = Rotary.ROTARY_FRUITS;
        var luckFruitIndexList = Rotary.LUCK_INDEX_LIST;

        fruitIndex = Utils.calcWeight(rotaryFruits);
        if (luckFruitIndexList.indexOf(fruitIndex) != -1) {
            if (!this.hasLuckFruit) {
                fruitIndex = this.getRandomFruitIndex();
            }
            else {
                this.hasLuckFruit = true;
                this.luckFruitIndex = fruitIndex;
            }
        }

        return fruitIndex;
    };

    Logic.getLuckRewardFruits = function () {
        var isEatLight = false;

        //*吃灯5%，送灯75%，小三元10%，大三元10%
        var rand = Utils.random_number(100);
        var index = 0;
        var fruitIndex = 0;

        if (rand < 5) {
            result.isEatLight = true;
        }
        else if (rand >= 5 && rand < 80) {
            var giveLightTotal = this.getGiveLightTotal();
            for (index; index < giveLightTotal; index ++) {
                fruitIndex = this.getRandomFruitIndex();
                this.luckRewardFruits.push(fruitIndex);
            }
        }
        else if (rand >= 80 && rand < 90) {
            var smallTriple = Rotary.SMALL_TRIPLE;
            for (var name in smallTriple) {
                var fruitList = smallTriple[name];
                var tempNum = 0;
                for (index; index < fruitList.length; index ++) {
                    fruitIndex = fruitList[index];
                    if (this.rotaryFruits.indexOf(fruitIndex) != -1) {
                        break;
                    }
                    tempNum ++;
                    if (tempNum == fruitList.length) {
                        rand = Utils.random_number(2);
                        this.luckRewardFruits.push(fruitList[rand]);
                    }
                }
            }
            this.hasSmallTriple = true;
        }
        else {
            var bigTriple = Rotary.BIG_TRIPLE;
            for (index; index < bigTriple.length; index ++) {
                fruitIndex = bigTriple[index];
                if (this.rotaryFruits.indexOf(fruitIndex) == -1) {
                    this.luckRewardFruits.push(fruitIndex);
                }
            }

            this.hasBigTriple = true;
        }

        return isEatLight;
    };

    Logic.getNormalRewardFruits = function (fruitList) {
        fruitList = fruitList || this.rotaryFruits;

        var index = 0;
        var fruitIndex = 0;
        var fruitListLength = fruitList.length;
        var bigTripleFruits = Rotary.BIG_TRIPLE;
        var quadruple = Rotary.QUADRUPLE;
        var smallTripleFruits = Rotary.SMALL_TRIPLE_ALL_FRUITS;

        for (index; index < fruitListLength; index ++) {
            fruitIndex = fruitList[index];

            if (bigTripleFruits.indexOf(fruitIndex) != -1) {
                this.bigTripleBingo();
                continue;
            }

            if (quadruple.indexOf(fruitIndex) != -1) {
                this.quadrupleBingo();
                continue;
            }

            if (smallTripleFruits.indexOf(fruitIndex) != -1) {
                this.smallTripleBingo();
            }
        }
    };

    Logic.smallTripleBingo = function () {
        if (this.hasSmallTriple) {
            return;
        }

        var rand = Utils.random_number(100);
        if (rand < Rotary.PROBABILITY_SMALL_TRIPLE) {

        }

        this.hasSmallTriple = true;
    };

    Logic.bigTripleBingo = function () {
        if (this.hasBigTriple) {
            return;
        }

        var rand = Utils.random_number(100);
        if (rand < Rotary.PROBABILITY_BIG_TRIPLE) {
            var bigTripleList = Rotary.BIG_TRIPLE;
            var fruitIndex = 0;
            for (var index = 0; index < bigTripleList.length; index ++) {
                fruitIndex = bigTripleList[index];
                if (this.rotaryFruits.indexOf(fruitIndex) == -1 && this.luckRewardFruits.indexOf(fruitIndex) == -1) {
                    this.normalRewardFruits.push(fruitIndex);
                }
            }
        }

        this.hasBigTriple = true;
    };

    Logic.quadrupleBingo = function () {
        if (this.hasQuadruple) {
            return;
        }

        var rand = Utils.random_number(100);
        if (rand < Rotary.PROBABILITY_QUADRUPLE) {
            var appleList = Rotary.QUADRUPLE;
            var appleIndex = 0;
            for (var index = 0; index < appleList.length; index ++) {
                appleIndex = appleList[index];
                if (this.rotaryFruits.indexOf(appleIndex) == -1 && this.luckRewardFruits.indexOf(appleIndex) == -1) {
                    this.normalRewardFruits.push(appleIndex);
                }
            }
        }

        this.hasQuadruple = true;
    };

    Logic.randomMultiple = function () {
        var multiple = {
            low: 10,
            high: 20
        };

        var lowMultipleList = Rotary.RANDOM_MULTIPLE_LOW;
        var highMultipleList = Rotary.RANDOM_MULTIPLE_HIGH;

        var randLowIndex = Utils.random_number(3);
        var randHighIndex = Utils.random_number(3);

        multiple.low = lowMultipleList[randLowIndex];
        multiple.high = highMultipleList[randHighIndex];

        return multiple;
    };

    Logic.getGuessNum = function () {
        var randNum = 1;
        randNum = Utils.random_number(12) + 1;
        return randNum;
    };

    Logic.getGuessNumType = function (randNum) {
        randNum = randNum || 1;
        var randType = Rotary.GUESS_SIZE_TYPE.LOW;

        if (randNum >=1 && randNum <= 6) {
            randType = Rotary.GUESS_SIZE_TYPE.LOW;
        }
        else if (randNum >= 8 && randNum <= 13) {
            randType = Rotary.GUESS_SIZE_TYPE.HIGH;
        }
        else {
            randType = Rotary.GUESS_SIZE_TYPE.ZERO;
        }

        return randType;
    }

}(Papaya.Fruit));