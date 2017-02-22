var FruitMainView = (function(_super) {

    var Fruit = null;
    var Rotary = null;

    function FruitMainView() {
        FruitMainView.super(this);
        //*水果的下注记录
        this.fruitBetList = {};
        //*水果按钮
        this.fruitBtnsList = {};
        //*下注显示
        this.fruitBetLabList = {};

        this.rotaryFruitBgList = [];

        this.fruitLigthList = [];
        //*赌金
        this.balance = 0;

        this.betNum = FruitMainView.BET_NUM;

        this.gameState = FruitMainView.STATE_START;
    }

    Laya.class(FruitMainView, "FruitMainView", _super);

    FruitMainView.prototype.init = function () {
        this.initGameRotary();
        this.initFruitBet();
        this.initBetNumbersShow();
        this.initRotary();
        this.initEvent();
        this.updateBalance();
        this.updateBetNumShow();
    };

    FruitMainView.prototype.initGameRotary = function () {
        Fruit = Papaya.Fruit;
        Rotary = Fruit.Rotary;

        FruitMainView.FRUIT_LIST = Rotary.ROTARY_FRUITS;
        FruitMainView.FRUIT_NAME_LIST = Rotary.FRUIT_NAME_LIST;
    };

    FruitMainView.prototype.initFruitBet = function () {
        //*清除/初始化下注记录
        var fruitName = "";
        for (var index = 0; index < FruitMainView.FRUIT_BTN_TOTAL; index++) {
            fruitName = FruitMainView.FRUIT_NAME_LIST[index];
            this.fruitBetList[fruitName] = 0;
        }
    };

    FruitMainView.prototype.initBetNumbersShow = function () {
        var lab = null;
        var fruitName = "";
        var zeroBox = this.zeroLabBox;
        var zeroLabIndex = FruitMainView.ZERO_LAB_START;
        var betLabIndex = FruitMainView.FURIT_BET_LAB_START;
        for (zeroLabIndex; zeroLabIndex < FruitMainView.ZERO_LAB_TOTAL; zeroLabIndex++) {
            lab = zeroBox.getChildByName("zeroLab_" + zeroLabIndex);
            lab.font = "white";
            lab.text = "888";
        }

        for (betLabIndex; betLabIndex < FruitMainView.FURIT_BET_LAB_TOTAL; betLabIndex++) {
            fruitName = FruitMainView.FRUIT_NAME_LIST[betLabIndex];
            lab = zeroBox.getChildByName(fruitName + "BetLab");
            lab.font = "red";
            lab.text = "0";
            this.fruitBetLabList[fruitName] = lab;
        }
        //*比大小结果label
        lab = zeroBox.getChildByName("resultLab");
        lab.font = "red";
        lab.text = "";
        this.fruitBetLabList[FruitMainView.RESULT_LAB_INDEX] = lab;

        var labList = [this.betLab, this.bonusWinLab, this.creditLab];
        for (var labIndex = 0; labIndex < labList.length; labIndex++) {
            lab = labList[labIndex];
            lab.font = "yellow";
            lab.text = "0";
        }
    };

    FruitMainView.prototype.initRotary = function () {
        //*初始化转盘显示
        var fruitBgBox = this.fruitBgBox;
        var fruitBg = null;
        var fruitBox = null;
        var fruitIndex = 0;
        var fruitName = "";
        var multiple = 1;

        for (fruitIndex; fruitIndex < 24; fruitIndex ++) {
            var fruitInfo = FruitMainView.FRUIT_LIST[fruitIndex];
            fruitName = fruitInfo.fruitName;
            multiple = fruitInfo.multiple;

            fruitBg = fruitBgBox.getChildByName("fruitBg_" + fruitIndex);
            fruitBox = new FruitBox(fruitInfo);
            fruitBg.addChild(fruitBox);
            this.rotaryFruitBgList.push(fruitBg);
        }

        App.uiManager.setAllFruits(this.rotaryFruitBgList);
    };

    FruitMainView.prototype.initEvent = function () {
        this.settingBtn.on(Laya.Event.CLICK, this, this.touchSettingBtn);
        this.billsBtn.on(Laya.Event.CLICK, this, this.touchBillsBtn);
        this.rankingBtn.on(Laya.Event.CLICK, this, this.touchRankingBtn);

        this.goBtn.on(Laya.Event.CLICK, this, this.touchGoBtn);

        this.betAddBtn.on(Laya.Event.CLICK, this, this.touchChangeBetBtn, ["add"]);
        this.betCutBtn.on(Laya.Event.CLICK, this, this.touchChangeBetBtn, ["cut"]);

        this.allAddBtn.on(Laya.Event.CLICK, this, this.touchAllAddBtn);

        var fruitBtnBox = this.fruitBtnBox;
        var fruitName = "";
        for (var index = 0; index < FruitMainView.FRUIT_BTN_TOTAL; index++) {
            fruitName = FruitMainView.FRUIT_NAME_LIST[index];
            var btn = fruitBtnBox.getChildByName(fruitName + "Btn");
            btn.on(Laya.Event.CLICK, this, this.touchFruitBtn, [fruitName]);
            this.fruitBtnsList[fruitName] = btn;
        }
    };

    FruitMainView.prototype.updateBalance = function () {
        var balance = App.player.balance;
        this.creditLab.text = balance;
        this.balance = balance;

        this.bonusWinLab.text = "0";
    };

    FruitMainView.prototype.updateBetNumShow = function () {
        this.betLab.text = this.betNum;
    };

    FruitMainView.prototype.betToChangeBalanceShow = function () {
        var balance = this.balance - this.getBetSum();
        this.creditLab.text = balance;
    };

    FruitMainView.prototype.initFruitLight = function () {
        var light = new FruitLightBox();

        this.fruitBgBox.addChild(light);
        light.x = this.rotaryFruitBgList[0].x;
        light.y = this.rotaryFruitBgList[0].y;

        this.fruitLigthList.push(light);
    };

    FruitMainView.prototype.touchSettingBtn = function () {
        //*设置
    };

    FruitMainView.prototype.touchBillsBtn = function () {
        //*账单
    };

    FruitMainView.prototype.touchRankingBtn = function () {
        //*排名
    };

    FruitMainView.prototype.touchChangeBetBtn = function (name) {
        switch (name) {
            case "add": {
                this.betNum++;
                if (this.betNum >= FruitMainView.MAX_BET_NUM) {
                    this.betNum = FruitMainView.MAX_BET_NUM
                }
                break;
            }

            case "cut": {
                this.betNum--;
                if (this.betNum <= FruitMainView.BET_NUM) {
                    this.betNum = FruitMainView.BET_NUM;
                }
                break;
            }
        }

        this.updateBetNumShow();
    };

    FruitMainView.prototype.touchGoBtn = function () {
        if (this.gameState == FruitMainView.STATE_START || this.gameState == FruitMainView.STATE_CAN_BET) {
            var betTotal = this.getBetSum();
            if (betTotal <= 0) {
                //*提示
                return;
            }

            var self = this;
            var complete = function(err, data) {
                if (err != null) {
                    return;
                }

                self.resultShowHandle(data);
            };
            var api = "/fruit/betOn";
            var params = {
                bet: this.fruitBetList
            };
            App.netManager.request(api, params, Laya.Handler.create(null, complete));
        }
        else if (this.gameState == FruitMainView.STATE_BET_RESULT) {
            //*把奖励的钱，放到自己的赌金上
            this.updateBalance();
            this.cleanFruitBetLabelText();
            this.cleanFruitShowLight();
            this.initFruitBet();
            this.gameState = FruitMainView.STATE_CAN_BET;
        }

        //var info = {
        //    rotateFruit: [
        //        {id:1019, fruitName: "Apple", multiple:1},
        //        {id:1022, fruitName: "Star", multiple:1},
        //    ],
        //    luckFruit: [],
        //    rewardFruit: [],
        //    isEatLight: false,
        //    bonusWin: 0,
        //    betTotal: 0,
        //    lowMultiple: 10,
        //    highMultiple: 20
        //};
        //
        //this.resultShowHandle(info);
    },

    FruitMainView.prototype.resultShowHandle = function (resultData) {
        var rotateFruitList = resultData.rotateFruit;
        var luckFruitList = resultData.luckFruit;
        var rewardFruitList = resultData.rewardFruit;
        //*创建需要的灯
        this.createShowFruitLight(rotateFruitList);
        this.createShowFruitLight(luckFruitList);
        this.createShowFruitLight(rewardFruitList);
        //*灯开始走
        //for (var index in this.fruitLigthList) {
        //    var light = this.fruitLigthList[index];
        //    light.move();
        //}
        //*倍率灯闪烁


        App.player.update(resultData.player);

        var bonus = resultData.bonusWin;
        this.bonusWinLab.text = bonus;

        this.gameState = FruitMainView.STATE_BET_RESULT;
    },

    FruitMainView.prototype.createShowFruitLight = function (fruitList) {
        var startIndex = 0;
        for (var index in fruitList) {
            var id = fruitList[index].id%1000 - 1;
            var light = App.uiManager.createLight({startIndex: startIndex, endIndex: id});
            startIndex = id;
            this.fruitLigthList.push(light);
            this.fruitBgBox.addChild(light);
        }
    };

    FruitMainView.prototype.cleanFruitShowLight = function () {
        for (var index in this.fruitLigthList) {
            var light = this.fruitLigthList[index];
            light.dispose();
        }
    };

    FruitMainView.prototype.touchAllAddBtn = function () {
        var fruitName = "";
        var betSum = this.getBetSum();
        var diff = this.balance - betSum;
        if (diff < FruitMainView.ALL_ADD_TOTAL) {
            return;
        }
        for (var index = 0; index < 8; index++) {
            fruitName = FruitMainView.FRUIT_NAME_LIST[index];
            var isAddBet = this.checkBetLimit(fruitName);
            if (isAddBet) {
                this.setFruitBetLabelText(fruitName);
            }
        }

        this.betToChangeBalanceShow();
    };

    FruitMainView.prototype.touchFruitBtn = function (fruitName) {
        var isAddBet = this.checkBetLimit(fruitName);
        if (isAddBet) {
            this.setFruitBetLabelText(fruitName);
        }

        this.betToChangeBalanceShow();
    };

    FruitMainView.prototype.checkBetLimit = function (fruitName) {
        var betSum = this.getBetSum();
        //*投注的金额会不会比手上持有的金额大
        var diff = this.balance - betSum;
        if (diff > 0) {
            var bet = this.fruitBetList[fruitName];
            var nextBet = bet + this.betNum;
            var addBet = this.betNum;
            if (nextBet > FruitMainView.MAX_BET_NUM) {
                addBet = FruitMainView.MAX_BET_NUM - bet;
            }
            if (bet >= FruitMainView.MIN_BET_NUM && bet < FruitMainView.MAX_BET_NUM) {
                this.fruitBetList[fruitName] += addBet;
                return true;
            }
        }
        return false;
    };

    FruitMainView.prototype.setFruitBetLabelText = function (fruitName) {
        if (this.fruitBetLabList[fruitName]) {
            var lab = this.fruitBetLabList[fruitName];
            lab.text = this.fruitBetList[fruitName];
        }
    };

    FruitMainView.prototype.cleanFruitBetLabelText = function () {
        for (var index in this.fruitBetLabList) {
            var lab = this.fruitBetLabList[index];
            if (index != FruitMainView.RESULT_LAB_INDEX) {
                lab.text = "0";
            }
        }
    };

    FruitMainView.prototype.getBetSum = function () {
        //*已经下注的金额
        var betSum = 0;
        for (var index in this.fruitBetList) {
            betSum += this.fruitBetList[index];
        }
        return betSum;
    };

    FruitMainView.ZERO_LAB_TOTAL = 9;
    FruitMainView.ZERO_LAB_START = 0;
    FruitMainView.FRUIT_BTN_TOTAL = 8;
    FruitMainView.FURIT_BET_LAB_TOTAL = 8;
    FruitMainView.FURIT_BET_LAB_START = 0;
    FruitMainView.MAX_BET_NUM = 99;
    FruitMainView.MIN_BET_NUM = 0;
    FruitMainView.BET_NUM = 1;
    FruitMainView.ALL_ADD_TOTAL = 8;

    FruitMainView.RESULT_LAB_INDEX = "result";

    FruitMainView.STATE_START = 0;//*开始游戏
    FruitMainView.STATE_CAN_BET = 1;//*可以下注
    FruitMainView.STATE_BET_RUNNING = 2;//*押注玩法运行
    FruitMainView.STATE_BET_RESULT = 3;//*押注显示奖励，可以进行猜大小
    FruitMainView.STATE_GUESS_SIZE_RUNNING = 4;//*猜大小运行

    return FruitMainView;
}(FruitMainViewUI));
