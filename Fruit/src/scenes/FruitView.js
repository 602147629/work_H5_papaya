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
        this.createFruitLightInfoList = [];
        this.lowMultipleImageList = [];
        this.highMultipleImageList = [];
        this.lowMultipleList = [10, 15, 20];
        this.highMultipleList = [20, 30, 40];

        this.balance = 0;
        this.bonus = 0;
        this.guessBetTotal = 0;
        this.stopedLight = 0;
        this.lastShowFruitIndex = 0;
        this.recordItemListBox = null;
        //*这一次的抽奖水果储存
        this.roundFruitResult = null;

        this.betNum = FruitMainView.BET_NUM;

        this.gameState = FruitMainView.STATE_START;
    }

    Laya.class(FruitMainView, "FruitMainView", _super);

    FruitMainView.prototype.init = function () {
        this.initGameRotary();
        this.initFruitBet();
        this.initBetNumbersShow();
        this.initRotary();
        this.initRecordList();
        this.initEvent();
        this.updateBalance();
        this.updateBetNumShow();
    };

    FruitMainView.prototype.initGameRotary = function () {
        Fruit = Papaya.Fruit;
        Rotary = Fruit.Rotary;

        FruitMainView.FRUIT_LIST = Rotary.ROTARY_FRUITS;
        FruitMainView.FRUIT_NAME_LIST = Rotary.FRUIT_NAME_LIST;
        FruitMainView.GUESS_SIZE_TYPE = Rotary.GUESS_SIZE_TYPE;
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

        App.uiManager.setAllRotaryFruits(this.rotaryFruitBgList);

        for (var index = 0; index < 3; index ++) {
            var lowImg = this.multipleBox.getChildByName("low_" + this.lowMultipleList[index] + "_multiple");
            this.lowMultipleImageList.push(lowImg);
            var highImg = this.multipleBox.getChildByName("high_" + this.highMultipleList[index] +"_multiple");
            this.highMultipleImageList.push(highImg);
        }

        //*初始化倍率灯
        this.lowLight = new MultipleLightBox(this.lowMultipleImageList);
        this.multipleBox.addChild(this.lowLight);
        this.highLight = new MultipleLightBox(this.highMultipleImageList);
        this.multipleBox.addChild(this.highLight);
    };

    FruitMainView.prototype.initRecordList = function () {
        var array = [];
        var list = new laya.ui.List();
        var render = FruitRecordBox || new laya.ui.Box();

        list.array = array;
        list.itemRender = render || new laya.ui.Box();

        list.x = 0;
        list.y = 0;
        list.width = this.recordListBox.width;
        list.height = this.recordListBox.height;

        list.spaceY = 5;
        list.vScrollBarSkin = "";

        list.renderHandler = render.renderHandler ? new Laya.Handler(render, render.renderHandler) : null;

        this.recordItemListBox = list;
        this.recordListBox.addChild(list);
    };

    FruitMainView.prototype.initEvent = function () {
        this.settingBtn.on(Laya.Event.CLICK, this, this.touchSettingBtn);
        this.billsBtn.on(Laya.Event.CLICK, this, this.touchBillsBtn);
        this.rankingBtn.on(Laya.Event.CLICK, this, this.touchRankingBtn);

         this.goBtn.on(Laya.Event.CLICK, this, this.touchGoBtn);
         this.lowNumBtn.on(Laya.Event.CLICK, this, this.touchNumberBtn, [FruitMainView.GUESS_SIZE_TYPE.LOW]);
         this.highNumBtn.on(Laya.Event.CLICK, this, this.touchNumberBtn, [FruitMainView.GUESS_SIZE_TYPE.HIGH]);
         this.betCutDoubleBtn.on(Laya.Event.CLICK, this, this.touchBetBySizeBtn, ["cut"]);
         this.betAddDoubleBtn.on(Laya.Event.CLICK, this, this.touchBetBySizeBtn, ["add"]);

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

        Laya.timer.frameLoop(1, this, this.update);
    };

    FruitMainView.prototype.update = function () {
        switch (this.gameState) {
            case FruitMainView.STATE_START:
            case FruitMainView.STATE_CAN_BET: {
                this.setAllFruitBtnDisabled(false);
                this.setAllAddBtnDisabled(false);
                this.setDoubleBtnDisabled(true);

                if (this.getBetSum() > 0) {
                    this.goBtn.disabled = false;
                }
                else {
                    this.goBtn.disabled = true;
                }
                break;
            }

            case FruitMainView.STATE_GUESS_SIZE_RUNNING:
            case FruitMainView.STATE_BET_RUNNING: {
                this.setAllFruitBtnDisabled(true);
                this.setAllAddBtnDisabled(true);
                this.setDoubleBtnDisabled(true);
                this.goBtn.disabled = true;
                break;
            }

            case FruitMainView.STATE_BET_RESULT: {
                this.setAllFruitBtnDisabled(true);
                this.setAllAddBtnDisabled(true);
                this.setDoubleBtnDisabled(false);
                this.goBtn.disabled = false;
                break;
            }
        }
    };

    FruitMainView.prototype.setAllFruitBtnDisabled = function (disabled) {
        for (var index in this.fruitBtnsList) {
            this.fruitBtnsList[index].disabled = disabled;
        }
    };

    FruitMainView.prototype.setAllAddBtnDisabled = function (disabled) {
        this.allAddBtn.disabled = disabled;
    };

    FruitMainView.prototype.setDoubleBtnDisabled = function (disabled) {
        this.betAddDoubleBtn.disabled = disabled;
        this.betCutDoubleBtn.disabled = disabled;
        this.lowNumBtn.disabled = disabled;
        this.highNumBtn.disabled = disabled;
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
        this.creditLab.text = this.balance - this.getBetSum();
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

    FruitMainView.prototype.touchNumberBtn = function (betType) {
        this.stopFruitLightBlink();
        //*猜大小
        if (this.gameState == FruitMainView.STATE_BET_RESULT) {
            var self = this;
            var type = betType;
            var bet = this.bonus;
            var complete = function(err, data) {
                if (err != null) {
                    return;
                }

                self.showGuessSizeResultHandle(data);
            };
            var api = "/fruit/guessTheSizeOf";
            var params = {
                bet: bet,
                betType: type
            };
            App.netManager.request(api, params, Laya.Handler.create(null, complete));
        }
        else {
            console.log("不能进行猜大小");
        }
    };

    FruitMainView.prototype.showGuessSizeResultHandle = function (resultInfo) {
        this.gameState = FruitMainView.STATE_GUESS_SIZE_RUNNING;

        //*猜大小结果显示
        var randNum = resultInfo.randNum;
        var bonus = resultInfo.bonusWin;
        this.numberTimes = 0;
        this.guessNumber = randNum;
        this.guessBonus = bonus;

        App.player.update(resultInfo.player);

        Laya.timer.frameLoop(1, this, this.guessNumberAction);
    };

    FruitMainView.prototype.guessNumberAction = function () {
        var rand = Math.floor(Math.random() * 12) + 1;
        var dt = Laya.timer.delta;
        this.numberTimes += dt;

        if (this.numberTimes >= 1500) {
            Laya.timer.clear(this, this.guessNumberAction);
            this.fruitBetLabList[FruitMainView.RESULT_LAB_INDEX].text = this.guessNumber;
            if (this.guessBonus < 0) {
                this.updateGameStateToCanBet();
            }
            else if (this.guessBonus > 0) {
                this.updateBalance();

                this.bonus = this.guessBonus;
                this.guessBetTotal = this.bonus * 2;
                this.bonusWinLab.text = this.guessBonus;

                this.creditLab.text = this.balance - this.guessBonus;

                this.gameState = FruitMainView.STATE_BET_RESULT;
            }
        }
        else {
            this.fruitBetLabList[FruitMainView.RESULT_LAB_INDEX].text = rand;
        }
    };

    FruitMainView.prototype.touchBetBySizeBtn = function (btnType) {
        this.stopFruitLightBlink();
        //*猜大小押注调整
        switch (btnType) {
            case "add": {
                var bet = this.bonus * 2;
                if (bet > this.guessBetTotal) {
                    bet = this.guessBetTotal;
                }
                this.bonus = bet;
                break;
            }

            case "cut": {
                this.bonus --;
                if (this.bonus <= 0) {
                    //*关闭猜大小
                    this.updateGameStateToCanBet();
                }
                break;
            }

            default: {
                break;
            }
        }

        this.bonusWinLab.text = this.bonus;
        this.creditLab.text = this.balance - this.bonus;
    };

    FruitMainView.prototype.touchChangeBetBtn = function (name) {
        //*设置下注水果时候的增量
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

                self.rotaryRunning(data);
            };
            var api = "/fruit/betOn";
            var params = {
                bet: this.fruitBetList
            };
            App.netManager.request(api, params, Laya.Handler.create(null, complete));
        }
        else if (this.gameState == FruitMainView.STATE_BET_RESULT) {
            this.updateGameStateToCanBet();
        }
    };

    FruitMainView.prototype.rotaryRunning = function (resultInfo) {
        this.gameState = FruitMainView.STATE_BET_RUNNING;
        this.roundFruitResult = resultInfo;
        //*清除掉上一局的灯
        this.cleanFruitShowLight();
        var fruitList = [
            this.roundFruitResult.rotateFruit,
            this.roundFruitResult.rewardFruit,
            this.roundFruitResult.luckFruit
        ];

        var startIndex = this.lastShowFruitIndex;
        var endIndex = 0;
        var luckIndex = 11;
        var totalTurns = 2;
        var speed = 0.05;
        var tempNum = 0;

        for (var index = 0; index < 3; index++) {
            var fruitSingleList = fruitList[index];
            for (var fruitIndex in fruitSingleList) {
                tempNum ++;
                var id = fruitSingleList[fruitIndex].id;
                if (typeof (fruitSingleList[fruitIndex].id) == 'number') {
                    fruitIndex = id;
                }
                else {
                    var rand = Math.floor(Math.random() * id.length);
                    fruitIndex = id[rand];
                }
                endIndex = (fruitIndex % 1000) - 1;

                if (endIndex == 11 || endIndex == 23) {
                    luckIndex = endIndex;
                }

                if (tempNum > 1) {
                    totalTurns = 0;
                    speed = 0.07
                }

                if (index == 2) {
                    totalTurns = 0;
                    startIndex = luckIndex;
                    speed = 0.1;
                }

                var info = {
                    startIndex: startIndex,
                    endIndex: endIndex,
                    totalTurns: totalTurns,
                    moveSpeed: speed
                };

                this.createFruitLightInfoList.push(info);

                this.lastShowFruitIndex = endIndex;
                startIndex = endIndex;
            }
        }

        //*转灯
        this.createLight(this.createFruitLightInfoList[this.stopedLight]);
        //*倍率闪灯
        this.blinkMultiple();
    };

    FruitMainView.prototype.cleanFruitShowLight = function () {
        for (var index in this.fruitLigthList) {
            var light = this.fruitLigthList[index];
            light.dispose();
        }
    };

    FruitMainView.prototype.createLight = function (lightInfo) {
        if (lightInfo == null) {
            return;
        }

        var light = new FruitLightBox(lightInfo);
        light.on(FruitLightBox.STOP_MOVE, this, this.stopMoveLight);
        this.fruitBgBox.addChild(light);
        this.fruitLigthList.push(light);
        light.move();

        if (this.stopedLight == 0) {
            //*装饰灯
            for (var index = 1; index < 3; index ++) {
                var startIndex = lightInfo.startIndex - index;
                if (startIndex < 0) {
                    startIndex = 24 + startIndex;
                }
                var info = {
                    startIndex: startIndex,
                    endIndex: 0,
                    destroyTurn: 1
                }
                var decotateLight = new FruitLightBox(info);
                this.fruitBgBox.addChild(decotateLight);
                decotateLight.move();
            }
        }
    };

    FruitMainView.prototype.stopMoveLight = function () {
        this.stopedLight ++;
        this.stopBlinkMultiple();
        if (this.stopedLight < this.createFruitLightInfoList.length) {
            this.createLight(this.createFruitLightInfoList[this.stopedLight]);
        }
        else{
            this.resultShowHandle();
        }
    };

    FruitMainView.prototype.blinkMultiple = function () {
        var lowMultiple = this.roundFruitResult.lowMultiple;
        var lowIndex = this.lowMultipleList.indexOf(lowMultiple);
        var highMultiple = this.roundFruitResult.highMultiple;
        var highIndex = this.highMultipleList.indexOf(highMultiple);
        this.lowLight.startMove(lowIndex);
        this.highLight.startMove(highIndex);
    };

    FruitMainView.prototype.stopBlinkMultiple = function () {
        this.lowLight.stopMove();
        this.highLight.stopMove();
    };

    FruitMainView.prototype.resultShowHandle = function () {
        var fruitList = [
            this.roundFruitResult.rotateFruit,
            this.roundFruitResult.rewardFruit,
            this.roundFruitResult.luckFruit
        ];

        for (var index in fruitList) {
            //*添加记录显示
            this.addRecordShow(fruitList[index]);
        }

        App.player.update(this.roundFruitResult.player);

        this.doFruitLightBlink();

        this.updateBalance();

        if (this.roundFruitResult.bonusWin != 0) {
            var bonus = this.roundFruitResult.bonusWin;
            this.bonusWinLab.text = bonus;
            this.bonus = bonus;
            this.guessBetTotal = this.bonus * 2;

            this.creditLab.text = this.balance - bonus;

            this.gameState = FruitMainView.STATE_BET_RESULT;
        }
        else {
            this.updateGameStateToCanBet();
        }
    };

    FruitMainView.prototype.doFruitLightBlink = function () {
        for (var index in this.fruitLigthList) {
            this.fruitLigthList[index].doLightBlink();
        }

        this.lowLight.doLightBlink();
        this.highLight.doLightBlink();
    };

    FruitMainView.prototype.stopFruitLightBlink = function () {
        for (var index in this.fruitLigthList) {
            this.fruitLigthList[index].stopLightBlink();
        }

        this.lowLight.stopLightBlink();
        this.highLight.stopLightBlink();
    };

    FruitMainView.prototype.updateGameStateToCanBet = function () {
        //*更新所有显示到可以押注水果的时候
        this.updateBalance();
        this.cleanFruitBetLabelText();
        this.initFruitBet();
        this.stopFruitLightBlink();
        this.createFruitLightInfoList = [];
        this.bonus = 0;
        this.guessBetTotal = 0;
        this.stopedLight = 0;
        this.gameState = FruitMainView.STATE_CAN_BET;
    };

    FruitMainView.prototype.addRecordShow = function (fruitList) {
        if (fruitList == null) {
            return;
        }

        var boxItemLength = this.recordItemListBox.length;
        var fruitLength = fruitList.length;

        if (fruitLength <= 0) {
            return;
        }

        var listNextLength = boxItemLength + fruitLength;
        if (listNextLength > 30) {
            var diff = listNextLength - 30;
            for (var index = 0; index < diff; index ++) {
                this.recordItemListBox.deleteItem(index);
            }

            this.recordItemListBox.refresh();
        }

        for (var fruitIndex in fruitList) {
            this.recordItemListBox.addItem(fruitList[fruitIndex]);
        }

        this.recordItemListBox.tweenTo(this.recordItemListBox.length);
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

// var FruitMainView = (function(_super) {
//    var Fruit = null;
//    var Rotary = null;
//
//    function FruitMainView() {
//        FruitMainView.super(this);
//
//        this.rotaryfruitList = null;
//        this.fruitNameList = null;
//        this.rotaryGuessType = null;
//
//        this.rotaryFruitCellList = [];
//        this.fruitBetBtnList = {};
//        this.fruitBetLableList = {};
//
//        this.bonusWin = 0;//*奖励
//        this.balance = 0;//*手上的赌金
//
//        this.betFactor = 1;//*下注因数
//        this.fruitBettingList = {};//*下注列表
//
//        this.guessedNum = 0;//*猜大小的结果
//
//        this.gameState = FruitMainView.STATE_GAME_INIT;
//    }
//
//    Laya.class(FruitMainView, "FruitMainView", _super);
//
//    FruitMainView.prototype.init = function () {
//        this.initGameRoraty();
//        this.initEvent();
//        this.initFruitBettingList();
//        this.initFruitRotaryShow();
//        this.initTopInfoShow();
//    };
//
//    FruitMainView.prototype.initGameRoraty = function () {
//        Fruit = Papaya.Fruit;
//        Rotary = Fruit.Rotary;
//
//        this.rotaryfruitList = Rotary.ROTARY_FRUITS;
//        this.fruitNameList = Rotary.FRUIT_NAME_LIST;
//        this.rotaryGuessType = Rotary.GUESS_SIZE_TYPE;
//    };
//
//    FruitMainView.prototype.initEvent = function () {
//        this.allAddBtn.on(Laya.Event.CLICK, this, this.onAllFruitAddBet);
//
//        var guessBtn = {
//            Low: this.lowNumBtn,
//            High: this.highNumBtn
//        };
//
//        for (var guessIndex in guessBtn) {
//            guessBtn[guessIndex].on(Laya.Event.CLICK, this, this.onGuessNumber, [guessIndex]);
//        }
//
//        var guessBetBtn = {
//            Add: this.betAddDoubleBtn,
//            Cut: this.betCutDoubleBtn
//        };
//        for (var guessBetIndex in guessBetBtn){
//            guessBetBtn[guessBetIndex].on(Laya.Event.CLICK, this, this.onGuessBetting, [guessBetIndex]);
//        }
//
//        var betFactorBtn = {
//            Add: this.betAddBtn,
//            Cut: this.betCutBtn
//        };
//        for (betIndex in betFactorBtn) {
//            betFactorBtn[betIndex].on(Laya.Event.CLICK, this, this.onChangeBetFactor, [betIndex]);
//        }
//
//        this.goBtn.on(Laya.Event.CLICK, this, this.onFruitRotaryRun);
//
//        this.initFruitBetBtnEvent();
//
//        Laya.timer.frameLoop(1, this, this.update);
//    };
//
//    FruitMainView.prototype.initFruitBetBtnEvent = function () {
//        var fruitBtnUIBox = this.fruitBtnBox;
//        var fruitNameListLength = this.fruitNameList.length;
//        var index = 0;
//        var fruitName = "";
//        var fruitBetBtn = null;
//        for (index; index < fruitNameListLength; index++) {
//            fruitName = this.fruitNameList[index];
//            fruitBetBtn = fruitBtnUIBox.getChildByName(fruitName + "Btn");
//            fruitBetBtn.on(Laya.Event.CLICK, this, this.onBetFruit, [fruitName]);
//            this.fruitBetBtnList[fruitName] = fruitBetBtn;
//        }
//    };
//
//    FruitMainView.prototype.initFruitBettingList = function () {
//        var index;
//        if (Object.keys(this.fruitBettingList).length > 0) {
//            for (index in this.fruitBettingList) {
//                this.fruitBettingList[index] = 0;
//            }
//        }
//        else {
//            var fruitName = "";
//            for (index in this.fruitNameList) {
//                fruitName = this.fruitNameList[index];
//                this.fruitBettingList[fruitName] = 0;
//            }
//        }
//    };
//
//    FruitMainView.prototype.initFruitRotaryShow = function () {
//        this.initRotaryFruitCell();
//        this.initRotaryLableShow();
//    };
//
//    FruitMainView.prototype.initRotaryFruitCell = function () {
//        var fruitRotaryUIBox = this.fruitBgBox;
//        var cellTotal = this.rotaryfruitList.length;
//        var cellIndex = 0;
//        var singleCell = null;
//        var rotatyFruit = null;
//
//        for (cellIndex; cellIndex < cellTotal; cellIndex++) {
//            //*获取转盘上的格子
//            singleCell = fruitRotaryUIBox.getChildByName("fruitBg_" + cellIndex);
//            //*创建转盘的上的水果显示
//            var fruit = this.rotaryfruitList[cellIndex];
//            rotatyFruit = new FruitBox(fruit);
//            singleCell.addChild(rotatyFruit);
//
//            this.rotaryFruitCellList.push(singleCell);
//        }
//
//        App.uiManager.setAllRotaryFruits(this.rotaryFruitCellList);
//    };
//
//    FruitMainView.prototype.initRotaryLableShow = function () {
//        var lable = null;
//        var zreoLableBox = this.zeroLabBox;
//        for (var zeroLabIndex = 0; zeroLabIndex < FruitMainView.GRAY_ZERO_LAB_TOTAL; zeroLabIndex++) {
//            lable = zreoLableBox.getChildByName("zeroLab_" + zeroLabIndex);
//            lable.font = "white";
//            lable.text = "888";
//        }
//
//        var fruitName = "";
//        var fruitListLength = this.fruitNameList.length;
//        for (var redLabIndex = 0; redLabIndex < fruitListLength; redLabIndex++) {
//            fruitName = this.fruitNameList[redLabIndex];
//            lable = zreoLableBox.getChildByName(fruitName + "BetLab");
//            lable.font = "red";
//            lable.text = "0";
//            this.fruitBetLableList[fruitName] = lable;
//        }
//
//        lable = zreoLableBox.getChildByName("resultLab");
//        lable.font = "red";
//        lable.text = "";
//        this.fruitBetLableList[FruitMainView.GUESS_LABLE_INDEX] = lable;
//
//        var topLableList = [this.betLab, this.bonusWinLab, this.creditLab];
//        for (var topLabelIndex = 0; topLabelIndex < 3; topLabelIndex++) {
//            lable = topLableList[topLabelIndex];
//            lable.font = "yellow";
//            lable.text = "0";
//        }
//    };
//
//    FruitMainView.prototype.initTopInfoShow = function () {
//        var player = App.player;
//        this.balance = player.balance;
//
//        this.setCreditLabText();
//        this.setBetFactorLabText();
//    };
//
//    FruitMainView.prototype.setCreditLabText = function (balance) {
//        balance = balance || this.balance;
//        this.creditLab.text = balance;
//    };
//
//    FruitMainView.prototype.setBetFactorLabText = function (betFactor) {
//        betFactor = betFactor || this.betFactor;
//        this.betLab.text = betFactor;
//    };
//
//    FruitMainView.prototype.setBonusWinLabText = function (bonus) {
//        bonus = bonus || this.bonusWin;
//        this.bonusWinLab.text = bonus;
//    };
//
//    FruitMainView.prototype.onAllFruitAddBet = function () {
//
//    };
//
//    FruitMainView.prototype.onBetFruit = function (fruitName) {
//        if (this.fruitNameList.indexOf(fruitName) == -1) {
//            return;
//        }
//
//        var bettings = this.fruitBettingList[fruitName];
//        bettings += this.betFactor;
//        if (bettings >= FruitMainView.BET_FRUIT_MAX) {
//            bettings = FruitMainView.BET_FRUIT_MAX;
//        }
//        this.fruitBettingList[fruitName] = bettings;
//    };
//
//    FruitMainView.prototype.onGuessNumber = function (guessType) {
//        switch (guessType) {
//            case FruitMainView.GUESS_TYPE.Low: {
//                break;
//            }
//            case  FruitMainView.GUESS_TYPE.High: {
//                break;
//            }
//            default: {
//                break;
//            }
//        }
//    };
//
//    FruitMainView.prototype.onGuessBetting = function (betType) {
//        switch (betType) {
//            case FruitMainView.BET_BTN_TYPE.Add: {
//                break;
//            }
//            case  FruitMainView.BET_BTN_TYPE.Cut: {
//                break;
//            }
//            default: {
//                break;
//            }
//        }
//    };
//
//    FruitMainView.prototype.onChangeBetFactor = function (factorType) {
//        switch (betType) {
//            case FruitMainView.BET_BTN_TYPE.Add: {
//                break;
//            }
//            case  FruitMainView.BET_BTN_TYPE.Cut: {
//                break;
//            }
//            default: {
//                break;
//            }
//        }
//    };
//
//    FruitMainView.prototype.onFruitRotaryRun = function () {
//
//    };
//
//    FruitMainView.prototype.update = function () {
//        switch (this.gameState) {
//            case FruitMainView.STATE_GAME_INIT:
//            case  FruitMainView.STATE_FRUIT_BETTING: {
//                this.setFruitBetBtnsDisabled(false);
//                this.setGuessBetBtnsDisabled(true);
//
//                if (this.getFruitBetTotal() > 0) {
//                    this.goBtn.disabled = false;
//                }
//                else {
//                    this.goBtn.disabled = true;
//                }
//                break;
//            }
//            case FruitMainView.STATE_ROTARY_RUNNING:
//            case FruitMainView.STATE_GUESS_RUNNING: {
//                this.setFruitBetBtnsDisabled(true);
//                this.setGuessBetBtnsDisabled(false);
//                this.goBtn.disabled = true;
//                break;
//            }
//            case FruitMainView.STATE_GUESS_BETTING: {
//                this.setFruitBetBtnsDisabled(true);
//                this.setGuessBetBtnsDisabled(false);
//                this.goBtn.disabled = false;
//                break;
//            }
//        }
//    };
//
//    FruitMainView.prototype.setFruitBetBtnsDisabled = function (disabled) {
//        this.allAddBtn.disabled = disabled;
//        for (var index in this.fruitBetBtnList) {
//            this.fruitBetBtnList[index].disabled = disabled;
//        }
//    };
//
//    FruitMainView.prototype.setGuessBetBtnsDisabled = function (disabled) {
//        this.betAddDoubleBtn.disabled = disabled;
//        this.betCutDoubleBtn.disabled = disabled;
//        this.lowNumBtn.disabled = disabled;
//        this.highNumBtn.disabled = disabled;
//    };
//
//    FruitMainView.prototype.getFruitBetTotal = function () {
//        var index;
//        var betTotal = 0;
//        for (index in this.fruitBettingList) {
//            betTotal += this.fruitBettingList[index];
//        }
//
//        return betTotal;
//    };
//
//    FruitMainView.STATE_GAME_INIT = 0;
//    FruitMainView.STATE_FRUIT_BETTING = 1;
//    FruitMainView.STATE_ROTARY_RUNNING = 2;
//    FruitMainView.STATE_GUESS_BETTING = 3;
//    FruitMainView.STATE_GUESS_RUNNING = 4;
//
//    FruitMainView.BET_BTN_TYPE = {
//        Add: "add",
//        Cut: "cut"
//    };
//
//    FruitMainView.GUESS_TYPE = {
//        Low: "low",
//        High: "high"
//    };
//
//    FruitMainView.BET_FRUIT_MAX = 99;
//
//    FruitMainView.GRAY_ZERO_LAB_TOTAL = 9;
//
//    FruitMainView.GUESS_LABLE_INDEX = "guess";
//    return FruitMainView;
//}(FruitMainViewUI));
