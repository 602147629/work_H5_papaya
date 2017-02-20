
(function(root) {
    var _super = root.Game;
    var Fruit = root.Fruit;
    var Rotary = root.Fruit.Rotary;
    var Game = root.Fruit.Game = function(opts) {
        opts = opts || {};

        Game.super(this, opts);

        //private members
        this._baseLightNum = 1;
        this._totalWeight = 0;
        this._hadLuckFruit = false;
        this._fruitList = [];

        //public members
        this.id = root.Game.ID_FRUIT;

        this.init();
    };

    //Inherits Class
    root.inherits(Game, _super);

    //Extend Prototype
    root.extend(Game.prototype, {
        init: function() {
            this._totalWeight = this.calcFruitTotalWeight();
        },

        calcFruitTotalWeight: function () {
            //*总权重计算
            var fruits = Rotary.ROTARY_FRUITS;
            var fruitListLength = fruits.length;
            var totalWeight = 0;
            for (var index = 0; index < fruitListLength; index++) {
                var fruitInfo = fruits[index];
                totalWeight += fruitInfo.weight;
            }

            return totalWeight;
        },

        betOn: function (info) {
            var isGiveLightOnStart = false;
            var isGiveLightOnEnd = false;

            var rand = this.randomNumber(99);
            if (rand < Rotary.PROBABILITY_GIVE_LIGHT_START) {
                isGiveLightOnStart = true;
            }
            else {
                rand = this.randomNumber(99);
                if (rand < Rotary.PROBABILITY_GIVE_LIGHT_END) {
                    isGiveLightOnEnd = true;
                }
            }

            var giveLightNum = 0;
            if (isGiveLightOnEnd || isGiveLightOnStart) {
                giveLightNum = this.randomNumber(4, 1);
            }

            var lightTotal = this._baseLightNum + giveLightNum;
            this._hadLuckFruit = false;
            for (var i = 0; i < lightTotal; i++) {
                this.randomFruit();
            }
        },

        randomNumber: function (num, addNum) {
            num = num || 1;
            addNum = addNum || 0;
            return Math.floor(Math.random() * num) + addNum;
        },

        randomFruit: function () {
            //*随机水果,如果已经有了luck，就再次随机
            var rand = this.randomNumber(this._totalWeight);
            var fruitList = Rotary.ROTARY_FRUITS;
            for (var i = 0; i < fruitList.length; i++) {
                var row = fruitList[i];
                if (rand < row.weight) {
                    var isLuckFruit = this.checkFruitIsLuck();

                    if (isLuckFruit) {
                        if (!this._hadLuckFruit) {
                            this._hadLuckFruit = true;
                            this._fruitList.push(row);
                        }
                        else {
                            //*已经有luck就再次随机抽取一下水果，直到不是luck
                            this.randomFruit();
                        }
                    }
                    else {
                        this._fruitList.push(row);
                    }

                    break;
                }

                rand -= row.weight;
            }
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
        }
    });

    Game.STATE = {};
    Game.STATE.READY            = 0;
    Game.STATE.STARTED          = 1;
    Game.STATE.SHUFFLED         = 2;
    Game.STATE.DEALED           = 3;
    Game.STATE.DRAWED           = 4;
    Game.STATE.ENDED            = 9;
}(Papaya));


var fruitType = [
//         {fruitName: "Apple", multiple:1, weight: 1750},
//         {fruitName: "Bell", multiple:3, weight: 1000},
//         {fruitName: "Orange", multiple:1, weight: 500},
//         {fruitName: "Bell", multiple:1, weight: 500},
//         {fruitName: "GG", multiple: 50, weight: 2},
//         {fruitName: "GG", multiple: 100, weight: 4},
//         {fruitName: "Apple", multiple:1, weight: 1750},
//         {fruitName: "Apple", multiple:3, weight: 1000},
//         {fruitName: "Pomelo", multiple:1, weight: 500},
//         {fruitName: "Watermelon", multiple:1, weight: 700},
//         {fruitName: "Watermelon", multiple:3, weight: 1000},
//         {fruitName: "BlueLuck", multiple:1, weight: 350},
//         {fruitName: "Apple", multiple:1, weight: 1750},
//         {fruitName: "Orange", multiple:3, weight: 1000},
//         {fruitName: "Orange", multiple:1, weight: 500},
//         {fruitName: "Bell", multiple:1, weight: 500},
//         {fruitName: "77", multiple:3, weight: 1000},
//         {fruitName: "77", multiple:1, weight: 700},
//         {fruitName: "Apple", multiple:1, weight: 1750},
//         {fruitName: "Pomelo", multiple:3, weight: 1000},
//         {fruitName: "Pomelo", multiple:1, weight: 500},
//         {fruitName: "Star", multiple:1, weight: 700},
//         {fruitName: "Star", multiple:3, weight: 1000},
//         {fruitName: "GoldenLuck", multiple:1, weight: 350}
//     ];

// var rangeList_1 = [10,15,20];
// var rangeList_2 = [20,30,40];

// var xiaosanyuanFruit = [
//     {fruitName: "Bell", multiple:1, weight: 500},
//     {fruitName: "Pomelo", multiple:1, weight: 500},
//     {fruitName: "Orange", multiple:1, weight: 500}
// ];
// var dasanyuanFruit = [
//     {fruitName: "Watermelon", multiple:1, weight: 700},
//     {fruitName: "Star", multiple:1, weight: 700},
//     {fruitName: "77", multiple:1, weight: 700}
// ];
// var dasixiFruit = {fruitName: "Apple", multiple:1, weight: 1750};

// var totalWeight = 0;

// var hadLuck = false;
// var _hadDasixi = false;//*已经是大四喜
// var _hadDasanyuan = false;//*已经是大三元
// var _hadXiaosanyuan = false;//*已经是小三元

// var fruitList = [];

// var jieguoList = [];//*最终的中奖结果

// //*概率
// var light_start = 1;
// var light_end = 5;
// var xiaosanyuan = 5;
// var dasanyuan = 3;
// var dasixi = 5;

// var betOnfunc = function () {
    
//     var lightBase = 1;//*基础灯是一个

//     var isLightStart = false;//*是否一开始就送灯，如果一开始送灯，那结束就送灯
//     var isLightEnd = false;//*是否是在结束的时候送灯
//     var randomNum = Math.floor(Math.random() * 99);
//     if (randomNum < light_start) {
//     	isLightStart = true;
//     }
//     else{
//     	randomNum = Math.floor(Math.random() * 99);
//     	if (randomNum < isLightEnd) {
//     		isLightEnd = true;
//     	}
//     }

//     var songdeng = 0;
//     //*两个送灯是互斥的
//     if (isLightStart || isLightEnd) {
//     	//*一开始就送灯，随机灯1-5
//         //*结束的时候送灯，随机1-5
//     	songdeng = songdengRand();
//     }

//     var lightSum = lightBase + songdeng;//*总共的灯数

//     //*计算总的权重
//     for (var index in fruitType) {
//         var fruitsInfo = fruitType[index];
//         totalWeight += fruitsInfo.weight;
//     }

//     hadLuck = false;
//     _hadXiaosanyuan = false;
//     _hadDasanyuan = false;
//     _hadDasixi = false;

//     //*随机结果,如果随机到luck中的一个之后就不可以随机到了
//     for (var index = 0 ; index < lightSum; index ++) {
//         rangeFruit();    	
//     }

//     console.log("开始的灯：");
//     console.log(fruitList);
//     //*第一次水果结果分析
//     checkFruit();

//     console.log("之后的灯：");
//     console.log(fruitList);

//     var range1 = 0;
//     var range2 = 0;
//     //*随机倍率
//     var rangeNum = Math.floor(Math.random() * 89);
//     if (rangeNum < 30) {
//     	range1 = rangeList_1[0];
//     }
//     else if (rangeNum > 30 && rangeNum < 60){
// 		range1 = rangeList_1[1];
//     }
//     else{
// 		range1 = rangeList_1[2];
//     }

//     var rangeNum2 = Math.floor(Math.random() * 89);
//     if (rangeNum2 < 30) {
//     	range2 = rangeList_2[0];
//     }
//     else if (rangeNum2 > 30 && rangeNum2 < 60){
// 		range2 = rangeList_2[1];
//     }
//     else{
// 		range2 = rangeList_2[2];
//     }

//     console.log("倍率1：" + range2 + "倍率2：" + range1);
// };

// var rangeFruit = function () {
//     //*随机水果
//     //*如果已经有了luck，就再次随机
//     var rand = Math.floor(Math.random() * totalWeight);
//     for (var i = 0; i < fruitType.length; i++) {
//         var row = fruitType[i];
//         if (rand < row.weight) {
//             if (row.fruitName == "GoldenLuck" || row.fruitName == "BlueLuck") {
//                 if (hadLuck == false) {
//                     hadLuck = true;
//                     fruitList.push(row);
//                 }
//                 else{
//                     rangeFruit();
//                 }
//             }
//             else {
//                 fruitList.push(row);
//             }
//             break;
//         }

//         rand -= row.weight;
//     }

// };


// var checkFruit = function () {
//     for (var index in fruitList) {
//         var fruit = fruitList[index];
//         var check = null;
//         if (checkLuckFruit(fruit)) {
//             check = luckRand();
//         }
//         else if (checkApple(fruit)){
//             check = appleRand();
//         }
//         else if (checkXiaosanyuan(fruit)) {
//             check = xiaoSanYuanRand();
//         }
//         else if (checkDasanyuan(fruit)) {
//             check = daSanYuanRand();
//         }

//         console.log(check);
//     }
// };


// var checkLuckFruit = function (fruit) {
//     if (!fruit) {
//         return;
//     }
//     var isLuck = false;
//     var fruitName = fruit.fruitName;
//     if (fruitName == "GoldenLuck" || fruitName == "BlueLuck") {
//         isLuck = true;
//     }

//     return isLuck;
// };

// var luckRand = function () {
//     var result = null;
//     //*存在luck，吃灯5%，送灯75%，小三元10%，大三元10%
//     var luckNum = Math.floor(Math.random() * 99);
//     if (luckNum >= 0 && luckNum < 5) {
//         result = "吃灯";
//     }
//     else if (luckNum >= 5 && luckNum < 80){
//         var songdeng = songdengRand();
//         for (var i = 0; i< songdeng; i++) {
//             rangeFruit();
//         }
//         result = "送灯";
//     }
//     else if (luckNum >= 80 && luckNum < 90) {
//         pushSpecialFruitInList("xiaosanyuan");
//         result = "送小三元";
//     }
//     else {
//         pushSpecialFruitInList("dasanyuan");
//         result = "送大三元";
//     }

//     return result;
// };

// var checkApple = function (fruit) {
//     if (!fruit) {
//         return;
//     }
//     var isApple = false;
//     var fruitName = fruit.fruitName;
//     var multiple = fruit.multiple;
//     //*判断是否已经是小四喜了
//     if (fruitName == "Apple" && multiple == 1) {
//         isApple = true;
//     }

//     return isApple;
// };

// var appleRand = function () {
//     //*是否有苹果 5%大四喜
//     var result = null;
//     var dasixiRange = Math.floor(Math.random() * 99);
//     if (dasixiRange < dasixi) {
//         result = "大四喜";
//         pushSpecialFruitInList("dasixi");
//     }

//     return result;
// };

// var checkXiaosanyuan = function (fruit) {
//     if (!fruit) {
//         return;
//     }
//     var fruitName = fruit.fruitName;
//     var multiple = fruit.multiple;
//     var isXiaosanyuan = false;
//     //*TODO 要判断是否已经是小三元
//     if ( (fruitName == "Bell" || fruitName == "Pomelo" || fruitName == "Orange") && multiple == 1) {
//         isXiaosanyuan = true;
//     }

//     return isXiaosanyuan;
// };

// var xiaoSanYuanRand = function () {
//     //*小三元判断
//     var result = null;
//     var xiaosanyuanRang = Math.floor(Math.random() * 99);
//     if (xiaosanyuanRang < xiaosanyuan) {
//         result = "小三元";
//         pushSpecialFruitInList("xiaosanyuan");
//     }

//     return result;
// };

// var checkDasanyuan = function (fruit) {
//     if (!fruit) {
//         return;
//     }
//     var fruitName = fruit.fruitName;
//     var multiple = fruit.multiple;
//     var isDaSanyuan = false;
//     if ( (fruitName == "Watermelon" || fruitName == "Star" || fruitName == "77") && multiple == 1) {
//        isDaSanyuan = true;
//     }

//     return isDaSanyuan;
// };

// var daSanYuanRand = function () {
//      //*大三元判断
//     var result = null;
//     var dasanyuanRange = Math.floor(Math.random() * 99);
//     if (dasanyuanRange < dasanyuan) {
//         result = "大三元";
//         pushSpecialFruitInList("dasanyuan");
//     }
//     return result;
// };


// var pushSpecialFruitInList = function (type) {
//     var fruitListCopy = [];
//     for (var index = 0; index < fruitList.length; index++) {
//         fruitListCopy[index] = JSON.stringify(fruitList[index]);
//     }

//     switch (type) {
//         case "dasanyuan": {
//             for (var index in dasanyuanFruit) {
//                 var fruit = JSON.stringify(dasanyuanFruit[index]);
//                 if (fruitListCopy.indexOf(fruit) == -1) {
//                     fruitList.push(dasanyuanFruit[index]);
//                 }
//             }
//             break;
//         }

//         case "xiaosanyuan": {
//             for (var index in xiaosanyuanFruit) {
//                 var fruit = JSON.stringify(xiaosanyuanFruit[index]);
//                 if (fruitListCopy.indexOf(fruit) == -1) {
//                     fruitList.push(xiaosanyuanFruit[index]);
//                 }
//             }
//             break;
//         }

//         case "dasixi": {
//             var sum = 0;
//             var total = 4;
//             for (var index in fruitListCopy) {
//                 if (fruitListCopy[index] == JSON.stringify(dasixiFruit)) {
//                     sum ++;
//                 }
//             }

//             for (sum; sum < total; sum++) {
//                 fruitList.push(dasixiFruit);
//             }
//             break;
//         }

//         default: {

//         }
//     };
// };


// var songdengRand = function () {
//     var songdeng = Math.floor(Math.random() * 4) + 1;
//     return songdeng;
// };

// betOnfunc();
