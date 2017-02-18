
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

        /*
        var fruitType = [
        {fruitName: "Apple", multiple:1},
        {fruitName: "Bell", multiple:3},
        {fruitName: "Orange", multiple:1},
        {fruitName: "Bell", multiple:1},
        {fruitName: "GG", multiple: 50},
        {fruitName: "GG", multiple: 100},
        {fruitName: "Apple", multiple:1},
        {fruitName: "Apple", multiple:3},
        {fruitName: "Pomelo", multiple:1},
        {fruitName: "Watermelon", multiple:1},
        {fruitName: "Watermelon", multiple:3},
        {fruitName: "BlueLuck", multiple:1},
        {fruitName: "Apple", multiple:1},
        {fruitName: "Orange", multiple:3},
        {fruitName: "Orange", multiple:1},
        {fruitName: "Bell", multiple:1},
        {fruitName: "77", multiple:3},
        {fruitName: "77", multiple:1},
        {fruitName: "Apple", multiple:1},
        {fruitName: "Pomelo", multiple:3},
        {fruitName: "Pomelo", multiple:1},
        {fruitName: "Star", multiple:1},
        {fruitName: "Star", multiple:3},
        {fruitName: "GoldenLuck", multiple:1}
    ];

var rangeList_1 = [10,15,20];
var rangeList_2 = [20,30,40];

BLUELUCK_INDEX = 11;
GLODENLUCK_INDEX = 23;

var betOnfunc = function () {
    //*概率
    var light_start = 10;
    var light_end = 50;
    var xiaosanyuan = 50;
    var dasanyuan = 30;
    var dasixi = 50;
    var lightBase = 1;//*基础灯是一个

    var isLightStart = false;//*是否一开始就送灯，如果一开始送灯，那结束就送灯
    var isLightEnd = false;//*是否是在结束的时候送灯
    var randomNum = Math.floor(Math.random() * 99);
    if (randomNum < light_start) {
    	isLightStart = true;
    }
    else{
    	randomNum = Math.floor(Math.random()*99);
    	if (randomNum < isLightEnd) {
    		isLightEnd = true;
    	}
    }

    var songdeng = 0;
    //*两个送灯是互斥的
    if (isLightStart) {
    	//*一开始就送灯，随机灯1-5
    	songdeng = (Math.random() * 4) + 1;
    }
    else if (isLightEnd){
    	//*结束的时候送灯，随机1-5
		songdeng = (Math.random() * 4) + 1;
    }

    var lightSum = lightBase + songdeng;//*总共的灯数
    var fruitList = [];
    var ishaveLuck = false;
    //*随机结果,如果随机到luck中的一个之后就不可以随机到了
    for (var index = 0 ; index < lightSum; index ++) {
    	var randomFruit = Math.floor(Math.random() * fruitType.length);
    	var fruit = fruitType[randomFruit];
    	fruitList.push(fruit);
    }

    console.log(fruitList);
    //*第一次水果结果分析
    var haveLuck = false;
    var fruit = null;
    if (lightSum > 1) {
       
    }
    else {
        //*只有一个灯
        fruit = fruitList[0];
        var fruitName = fruit.fruitName;
        var multiple = fruit.multiple;
        if (fruitName == "BlueLuck" || fruitName == "GoldenLuck") {
            //*存在luck，吃灯5%，送灯75%，小三元10%，大三元10%
            var luckNum = Math.floor(Math.random() * 99);
            if (luckNum >= 0 && luckNum < 5) {
                console.log("吃灯");
            }
            else if (luckNum >= 5 && luckNum < 80){
                console.log("送灯");
            }
            else if (luckNum >= 80 && luckNum < 90) {
                console.log("送小三元");
            }
            else {
                console.log("送大三元");
            }

            haveLuck = true;
        } 
        else if (fruitName == "Apple" && multiple == 1){
            //*是否有苹果 5%大四喜
            var dasixiRange = Math.floor(Math.random() * 99);
            if (dasixiRange < dasixi) {
                console.log("大四喜");
            }
        }
        else if ( (fruitName == "Bell" || fruitName == "Pomelo" || fruitName == "Orange") && multiple == 1) {
            //*小三元判断
            var xiaosanyuanRang = Math.floor(Math.random() * 99);
            if (xiaosanyuanRang < xiaosanyuan) {
                console.log("小三元");
            }
        }
        else if ( (fruitName == "Watermelon" || fruitName == "Star" || fruitName == "77") && multiple == 1) {
            //*大三元判断
            var dasanyuanRange = Math.floor(Math.random() * 99);
            if (dasanyuanRange < dasanyuan) {
                console.log("大三元");
            }
        }
    }





    var range1 = 0;
    var range2 = 0;
    //*随机倍率
    var rangeNum = Math.floor(Math.random() * 89);
    if (rangeNum < 30) {
    	range1 = rangeList_1[0];
    }
    else if (rangeNum > 30 && rangeNum < 60){
		range1 = rangeList_1[1];
    }
    else{
		range1 = rangeList_1[2];
    }

    var rangeNum2 = Math.floor(Math.random() * 89);
    if (rangeNum2 < 30) {
    	range2 = rangeList_2[0];
    }
    else if (rangeNum2 > 30 && rangeNum2 < 60){
		range2 = rangeList_2[1];
    }
    else{
		range2 = rangeList_2[2];
    }

    console.log("倍率1：" + range2 + "倍率2：" + range1);
};

var rangeFruit = function () {
    var randomFruit = Math.floor(Math.random() * fruitType.length);
    var fruit = fruitType[randomFruit];
};

betOnfunc();
        */
        
        
        //*押注
        betOn: function () {

        },

        //*随机倍率

        //*送灯检测

        //*随机水果

        //*检测大四喜

        //*检测小三元

        //*检测大三元

        //*luck处理



        //*猜大小
        guessTheSize: function () {

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
