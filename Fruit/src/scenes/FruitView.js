var FruitMainView = (function(_super) {
    var Fruit = null;
    var Rotary = null;

    function FruitMainView() {
        FruitMainView.super(this);

        this.rotaryfruitList        = null;
        this.fruitNameList          = null;
        this.rotaryGuessType        = null;

        this.rotaryFruitCellList    = [];
        this.fruitBetBtnList        = {};
        this.fruitBetLabelList      = {};
        this.fruitLightList         = [];
        this.fruitBettingList       = {};//*下注列表
        this.lowMultipleImgs        = [];
        this.highMultipleImgs       = [];
        this.rotaryFruitBoxList     = [];

        this.bonusWin               = 0;//*奖励
        this.balance                = 0;//*手上的赌金
        this.betFactor              = 1;//*下注因数

        this.multiples              = {low: 10, high: 20};
        this.guessCanBetTotal       = 0;
        this.guessedNum             = 0;//*猜大小的结果

        this.canBetFruit            = true;
        this.canGuessNum            = false;
        this.canTouchGoBtn          = false;

        this.recordItemTotal        = 30;

        this.gameState              = FruitMainView.STATE_GAME_INIT;
    }

    Laya.class(FruitMainView, "FruitMainView", _super);

    FruitMainView.prototype.init = function () {
        this.initGameRotary();
        this.initEvent();
        this.initFruitBettingList();
        this.initFruitRotaryShow();
        this.initTopInfoShow();
    };

    FruitMainView.prototype.initGameRotary = function () {
        Fruit = Papaya.Fruit;
        Rotary = Fruit.Rotary;

        this.rotaryfruitList = Rotary.ROTARY_FRUITS;
        this.fruitNameList = Rotary.FRUIT_NAME_LIST;
        this.rotaryGuessType = Rotary.GUESS_SIZE_TYPE;
    };

    FruitMainView.prototype.initEvent = function () {
        this.allAddBtn.on(Laya.Event.CLICK, this, this.onAllFruitAddBet);

        var guessBtn = {
            Low: this.lowNumBtn,
            High: this.highNumBtn
        };

        for (var guessIndex in guessBtn) {
            guessBtn[guessIndex].on(Laya.Event.CLICK, this, this.onGuessNumber, [guessIndex]);
        }

        var guessBetBtn = {
            Add: this.betAddDoubleBtn,
            Cut: this.betCutDoubleBtn
        };
        for (var guessBetIndex in guessBetBtn){
            guessBetBtn[guessBetIndex].on(Laya.Event.CLICK, this, this.onGuessBetting, [guessBetIndex]);
        }

        var betFactorBtn = {
            Add: this.betAddBtn,
            Cut: this.betCutBtn
        };
        for (betIndex in betFactorBtn) {
            betFactorBtn[betIndex].on(Laya.Event.CLICK, this, this.onChangeBetFactor, [betIndex]);
        }

        this.goBtn.on(Laya.Event.CLICK, this, this.onFruitRotaryRun);

        this.initFruitBetBtnEvent();

        Laya.timer.frameLoop(1, this, this.update);
    };

    FruitMainView.prototype.initFruitBetBtnEvent = function () {
        var fruitBtnUIBox = this.fruitBtnBox;
        var fruitNameListLength = this.fruitNameList.length;
        var index = 0;
        var fruitName = "";
        var fruitBetBtn = null;
        for (index; index < fruitNameListLength; index++) {
            fruitName = this.fruitNameList[index];
            fruitBetBtn = fruitBtnUIBox.getChildByName(fruitName + "Btn");
            fruitBetBtn.on(Laya.Event.CLICK, this, this.onBetFruit, [fruitName]);
            this.fruitBetBtnList[fruitName] = fruitBetBtn;
        }
    };

    FruitMainView.prototype.initFruitBettingList = function () {
        var index;
        if (Object.keys(this.fruitBettingList).length > 0) {
            for (index in this.fruitBettingList) {
                this.fruitBettingList[index] = 0;
            }
        }
        else {
            var fruitName = "";
            for (index in this.fruitNameList) {
                fruitName = this.fruitNameList[index];
                this.fruitBettingList[fruitName] = 0;
            }
        }
    };

    FruitMainView.prototype.initFruitRotaryShow = function () {
        this.initRotaryFruitCell();
        this.initRotaryLabelShow();
        this.initMultipLights();
        this.initRecordBoxList();
    };

    FruitMainView.prototype.initRotaryFruitCell = function () {
        var fruitRotaryUIBox = this.fruitBgBox;
        var cellTotal = this.rotaryfruitList.length;
        var cellIndex = 0;
        var singleCell = null;
        var rotaryFruit = null;

        for (cellIndex; cellIndex < cellTotal; cellIndex++) {
            //*获取转盘上的格子
            singleCell = fruitRotaryUIBox.getChildByName("fruitBg_" + cellIndex);
            //*创建转盘的上的水果显示
            var fruit = this.rotaryfruitList[cellIndex];
            rotaryFruit = new FruitBox(fruit);
            singleCell.addChild(rotaryFruit);

            this.rotaryFruitBoxList.push(rotaryFruit);
            this.rotaryFruitCellList.push(singleCell);
        }

        App.uiManager.setAllRotaryFruits(this.rotaryFruitCellList);
        App.uiManager.setRotaryFruitBoxList(this.rotaryFruitBoxList);
    };

    FruitMainView.prototype.initRotaryLabelShow = function () {
        var label = null;
        var zeroLabelBox = this.zeroLabBox;
        for (var zeroLabIndex = 0; zeroLabIndex < FruitMainView.GRAY_ZERO_LAB_TOTAL; zeroLabIndex++) {
            label = zeroLabelBox.getChildByName("zeroLab_" + zeroLabIndex);
            label.font = "white";
            label.text = "888";
        }

        var fruitName = "";
        var fruitListLength = this.fruitNameList.length;
        for (var redLabIndex = 0; redLabIndex < fruitListLength; redLabIndex++) {
            fruitName = this.fruitNameList[redLabIndex];
            label = zeroLabelBox.getChildByName(fruitName + "BetLab");
            label.font = "red";
            label.text = "0";
            this.fruitBetLabelList[fruitName] = label;
        }

        label = zeroLabelBox.getChildByName("resultLab");
        label.font = "red";
        label.text = "";
        this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX] = label;

        var topLabelList = [this.betLab, this.bonusWinLab, this.creditLab];
        for (var topLabelIndex = 0; topLabelIndex < 3; topLabelIndex++) {
            label = topLabelList[topLabelIndex];
            label.font = "yellow";
            label.text = "0";
        }
    };

    FruitMainView.prototype.initMultipLights = function () {
        var lowMultiple = Rotary.RANDOM_MULTIPLE_LOW;
        var highMultiple = Rotary.RANDOM_MULTIPLE_HIGH;

        for (var index = 0; index < 3; index ++) {
            var lowImg = this.multipleBox.getChildByName("low_" + lowMultiple[index] + "_multiple");
            this.lowMultipleImgs.push(lowImg);
            var highImg = this.multipleBox.getChildByName("high_" + highMultiple[index] +"_multiple");
            this.highMultipleImgs.push(highImg);
        }

        this.lowLight = new MultipleLightBox(this.lowMultipleImgs);
        this.multipleBox.addChild(this.lowLight);
        this.highLight = new MultipleLightBox(this.highMultipleImgs);
        this.multipleBox.addChild(this.highLight);
    };

    FruitMainView.prototype.initRecordBoxList = function () {
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

    FruitMainView.prototype.initTopInfoShow = function () {
        var player = App.player;
        this.balance = player.balance;

        this.setCreditLabText();
        this.setBetFactorLabText();
    };

    FruitMainView.prototype.setCreditLabText = function (balance) {
        var oldBlance = Number(this.creditLab.text);
        balance = balance || this.balance;
        App.actionManager.add(
            NumberTo.create(0.5, oldBlance, balance),
            this.creditLab
        );
    };

    FruitMainView.prototype.setBetFactorLabText = function (betFactor) {
        betFactor = betFactor || this.betFactor;
        this.betLab.text = betFactor;
    };

    FruitMainView.prototype.setBonusWinLabText = function (bonus) {
        var oldbonus = Number(this.bonusWinLab.text);
        bonus = bonus || this.bonusWin;
        App.actionManager.add(
            NumberTo.create(0.5, oldbonus, bonus),
            this.bonusWinLab
        );
    };

    FruitMainView.prototype.setBettingLabelText = function (fruitName) {
        if (this.fruitNameList.indexOf(fruitName) == -1) {
            return;
        }

        this.fruitBetLabelList[fruitName].text = this.fruitBettingList[fruitName];
    };

    FruitMainView.prototype.onAllFruitAddBet = function () {
        if (!this.canBetFruit) {
            return;
        }

        var balance = this.balance;
        var totalFruit = this.fruitNameList.length;
        var allAddBetNum = this.betFactor * totalFruit;
        var fruitName = "";

        if (allAddBetNum <= balance) {
            for (var fruitNameIndex in this.fruitNameList) {
                fruitName = this.fruitNameList[fruitNameIndex];
                this.onBetFruit(fruitName);
            }
        }
    };

    FruitMainView.prototype.onBetFruit = function (fruitName) {
        if (!this.canBetFruit) {
            return;
        }

        if (this.fruitNameList.indexOf(fruitName) == -1) {
            return;
        }

        var betting = this.fruitBettingList[fruitName];
        betting += this.betFactor;
        if (betting >= FruitMainView.BET_FRUIT_MAX) {
            betting = FruitMainView.BET_FRUIT_MAX;
        }
        this.fruitBettingList[fruitName] = betting;
        this.setBettingLabelText(fruitName);
        var remainBalance = this.balance - betting;
        this.setCreditLabText(remainBalance);
        this.balance = remainBalance;
    };

    FruitMainView.prototype.onGuessNumber = function (guessType) {
        this.lightsUnBlinkOnView();

        if (!this.canGuessNum) {
            return;
        }

        if (FruitMainView.GUESS_TYPE[guessType] == null) {
            this.updateGameStateToCanBet();
            return;
        }

        var type = null;
        var bet = this.bonusWin;

        switch (guessType) {
            case FruitMainView.GUESS_TYPE.Low: {
                type = this.rotaryGuessType.LOW;
                break;
            }
            case FruitMainView.GUESS_TYPE.High: {
                type = this.rotaryGuessType.HIGH;
                break;
            }
            default: {
                break;
            }
        }

        if (this.gameState == FruitMainView.STATE_GUESS_BETTING) {
            var self = this;

            var complete = function(err, data) {
                if (err != null) {
                    return;
                }

                self.onGuessRunning(data);
            };

            var api = "/fruit/guessTheSizeOf";
            var params = {
                bet: bet,
                betType: type
            };
            App.netManager.request(api, params, Laya.Handler.create(null, complete));
        }
    };

    FruitMainView.prototype.onGuessRunning = function (result) {
        this.gameState = FruitMainView.STATE_GUESS_RUNNING;

        App.player.update(result.player);

        this.bonusWin = result.bonusWin;
        this.guessedNum = result.randNum;
        this.guessRunningTime = 0;

        Laya.timer.frameLoop(1, this, this.guessNumberAction);
    };

    FruitMainView.prototype.guessNumberAction = function () {
        var rand = Math.floor(Math.random() * 12) + 1;
        var dt = Laya.timer.delta;
        this.guessRunningTime += dt;

        if (this.guessRunningTime >= 1500) {
            Laya.timer.clear(this, this.guessNumberAction);
            this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX].text = this.guessedNum;
            if (this.bonusWin < 0) {
                this.updateGameStateToCanBet();
            }
            else if (this.bonusWin > 0) {
                this.guessCanBetTotal = this.bonusWin * 2;
                this.setBonusWinLabText();
                this.gameState = FruitMainView.STATE_GUESS_BETTING;
            }
            else {
                this.gameState = FruitMainView.STATE_GUESS_BETTING;
            }
        }
        else {
            this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX].text = rand;
        }
    };

    FruitMainView.prototype.onGuessBetting = function (betType) {
        this.lightsUnBlinkOnView();

        if (!this.canGuessNum) {
            return;
        }

        var guessBet = this.bonusWin;
        switch (betType) {
            case FruitMainView.BET_BTN_TYPE.Add: {
                guessBet = this.bonusWin * 2;
                if (guessBet >= this.guessCanBetTotal) {
                    guessBet = this.guessCanBetTotal;
                }
                break;
            }
            case  FruitMainView.BET_BTN_TYPE.Cut: {
                guessBet --;
                if (guessBet <= 0) {
                    this.updateGameStateToCanBet();
                }
                break;
            }
            default: {
                break;
            }
        }

        this.bonusWin = guessBet;
        this.setBonusWinLabText();

        this.balance = App.player.balance - this.bonusWin;
        this.setCreditLabText();
    };

    FruitMainView.prototype.onChangeBetFactor = function (factorType) {
        var betFactor = this.betFactor;
        switch (factorType) {
            case FruitMainView.BET_BTN_TYPE.Add: {
                betFactor ++;
                if (betFactor >= FruitMainView.BET_FACTOR_MAX) {
                    betFactor = FruitMainView.BET_FACTOR_MAX;
                }
                break;
            }
            case  FruitMainView.BET_BTN_TYPE.Cut: {
                betFactor --;
                if (betFactor <= FruitMainView.BET_FACTOR_MIN) {
                    betFactor = FruitMainView.BET_FACTOR_MIN;
                }
                break;
            }
            default: {
                break;
            }
        }

        this.betFactor = betFactor;
        this.setBetFactorLabText();
    };

    FruitMainView.prototype.onFruitRotaryRun = function () {
        if (!this.canTouchGoBtn) {
            return;
        }

        var gameState = this.gameState;

        if (gameState == FruitMainView.STATE_GAME_INIT || gameState == FruitMainView.STATE_FRUIT_BETTING) {
            var betTotal = this.getFruitBetTotal();
            if (betTotal <= 0) {
                return;
            }

            var self = this;
            var fruitBet = this.fruitBettingList;
            var complete = function(err, data) {
                if (err != null) {
                    return;
                }

                self.rotaryRunning(data);
            };
            var api = "/fruit/betOn";
            var params = {
                bet: fruitBet
            };

            App.netManager.request(api, params, Laya.Handler.create(null, complete));
        }
        else if (gameState == FruitMainView.STATE_GUESS_BETTING) {
            this.updateGameStateToCanBet();
        }
    };

    FruitMainView.prototype.updateGameStateToCanBet = function () {
        this.bonusWin = 0;
        this.guessCanBetTotal = 0;
        this.balance = App.player.balance;
        this._luckPos = null;

        this.setCreditLabText();
        this.setBonusWinLabText();
        this.initFruitBettingList();

        var fruitName = "";
        for (var index in this.fruitNameList) {
            fruitName = this.fruitNameList[index];
            this.setBettingLabelText(fruitName);
        }

        this.gameState = FruitMainView.STATE_FRUIT_BETTING;
    };

    FruitMainView.prototype.rotaryRunning = function (result) {
        this.gameState = FruitMainView.STATE_ROTARY_RUNNING;
        this.cleanFruitLights();

        App.player.update(result.player);

        this._resultFruitObj = result.fruits;
        this._resultFruitObjKeys = Object.keys(this._resultFruitObj);
        this._resultFruitObjKeysLength = this._resultFruitObjKeys.length;

        this._runningObjIndex = 0;
        this._runningLightIndex = 0;

        this._endPos = 0;

        this.lightRotating();

        this.bonusWin = result.bonusWin;
        this.multiples = result.multiples;
        this.guessCanBetTotal = this.bonusWin * 2;

        this.multipleLightMoving();
    };

    FruitMainView.prototype.cleanFruitLights = function () {
        var fruitLightList = this.fruitLightList;
        var length = fruitLightList.length;

        for (var lightIndex = 0; lightIndex < length; lightIndex++) {
            fruitLightList[lightIndex].dispose();
        }

        this.fruitLightList = [];
    };

    FruitMainView.prototype.lightRotating = function () {
        var runningObjIndex = this._runningObjIndex;
        var runningObjName = this._resultFruitObjKeys[runningObjIndex];
        var runningFruitList = this._resultFruitObj[runningObjName];

        this._runningObjLength = runningFruitList.length;

        if (this._runningObjLength <= 0) {
            this.lightStoppedMove();
            return;
        }

        if (this._runningObjIndex == 1) {
            var luckPos = this.getLuckyPosThisRound();
            var startIndex = luckPos;
        }
        else {
            startIndex = this._endPos;
        }

        var endIndex = runningFruitList[this._runningLightIndex];
        var info = {
            startIndex: startIndex,
            endIndex: endIndex,
            totalTurns: 4,
            objectIndex: this._runningObjIndex,
            lightIndex: this._runningLightIndex
        };
        var light = new FruitLightBox(info);
        light.on(FruitLightBox.CAN_CREATE_NEXT_LIGHT, this, this.lightStoppedMove);
        light.on(FruitLightBox.STOP_MOVE, this, this.multipleLightStopMoving);
        this.fruitBgBox.addChild(light);
        this.fruitLightList.push(light);
        light.move();

        if (this._runningObjIndex != 1) {
            this._endPos = endIndex;
        }

        if (this._runningLightIndex == 0 && this._runningObjIndex == 0) {
            //*装饰灯
            for (var index = 1; index < 3; index ++) {
                startIndex = startIndex - index;
                if (startIndex < 0) {
                    startIndex = 24 + startIndex;
                }
                var destroyTurn = 3 - index;
                var lightInfo = {
                    startIndex: startIndex,
                    endIndex: endIndex,
                    totalTurns: 4,
                    objectIndex: this._runningObjIndex,
                    lightIndex: this._runningLightIndex,
                    destroyTurn: destroyTurn
                };

                var decorateLight = new FruitLightBox(lightInfo);
                this.fruitBgBox.addChild(decorateLight);
                decorateLight.move();
            }
        }
    };

    FruitMainView.prototype.getLuckyPosThisRound = function () {
        if (!this._luckyPos) {
            var rotaryFruitList = this._resultFruitObj.rotaryFruits;
            var lucyIndexList = Rotary.LUCK_INDEX_LIST;
            var fruitIndex = 0;
            for (var index in rotaryFruitList) {
                var id = rotaryFruitList[index];
                fruitIndex = id + 1001;
                if (lucyIndexList.indexOf(fruitIndex) != -1) {
                    this._luckyPos = id;
                    break;
                }
            }
        }

        return this._luckyPos;
    };

    FruitMainView.prototype.lightStoppedMove = function () {
        this._runningLightIndex ++;
        this.multipleLightStopMoving();
        if (this._runningLightIndex < this._runningObjLength) {
            this.lightRotating();
            return;
        }
        else {
            this._runningLightIndex = 0;
            this._runningObjIndex ++;
        }

        if (this._runningObjIndex < this._resultFruitObjKeysLength) {
            this.lightRotating();
        }
        else {
            this.showFruitResultOnView();
        }
    };

    FruitMainView.prototype.showFruitResultOnView = function () {
        this.gameState = FruitMainView.STATE_GUESS_BETTING;

        this.setBonusWinLabText();
        this.ligthsBlinkOnView();

        //*记录显示
        var fruitResultInRound = this._resultFruitObj;
        for (var index in fruitResultInRound) {
            this.addRecordItem(fruitResultInRound[index]);
        }

        if (this.bonusWin <= 0) {
            this.updateGameStateToCanBet();
        }
    };

    FruitMainView.prototype.addRecordItem = function (fruitList) {
        if (fruitList == null) {
            return;
        }

        var boxItemLength = this.recordItemListBox.length;
        var fruitLength = fruitList.length;

        if (fruitLength <= 0) {
            return;
        }

        //*处理列表溢出
        var listNextLength = boxItemLength + fruitLength;
        if (listNextLength > this.recordItemTotal) {
            var diff = listNextLength - this.recordItemTotal;
            for (var index = 0; index < diff; index ++) {
                this.recordItemListBox.deleteItem(index);
            }

            this.recordItemListBox.refresh();
        }

        //*添加列表显示
        for (var fruitIndex in fruitList) {
            var id = fruitList[fruitIndex];
            var fruitInfo = Rotary.ROTARY_FRUITS[id];
            this.recordItemListBox.addItem(fruitInfo);
        }

        this.recordItemListBox.tweenTo(this.recordItemListBox.length);
    };

    FruitMainView.prototype.ligthsBlinkOnView = function () {
        var fruitLightIndex = 0;
        for (fruitLightIndex in this.fruitLightList) {
            this.fruitLightList[fruitLightIndex].doLightBlink();
        }

        this.lowLight.doLightBlink();
        this.highLight.doLightBlink();
    };

    FruitMainView.prototype.lightsUnBlinkOnView = function () {
        for (var index in this.fruitLightList) {
            this.fruitLightList[index].stopLightBlink();
        }

        for (var glowIndex in this.rotaryFruitBoxList) {
            this.rotaryFruitBoxList[glowIndex].setFruitUnLight();
        }

        this.lowLight.stopLightBlink();
        this.highLight.stopLightBlink();
    };

    FruitMainView.prototype.multipleLightMoving = function () {
        var lowLightEndIndex = Rotary.RANDOM_MULTIPLE_LOW.indexOf(this.multiples.low);
        var highLightEndIndex = Rotary.RANDOM_MULTIPLE_HIGH.indexOf(this.multiples.high);
        this.lowLight.startMove(lowLightEndIndex);
        this.highLight.startMove(highLightEndIndex);
    };

    FruitMainView.prototype.multipleLightStopMoving = function () {
        this.lowLight.stopMove();
        this.highLight.stopMove();
    };

    FruitMainView.prototype.update = function () {
        switch (this.gameState) {
            case FruitMainView.STATE_GAME_INIT:
            case  FruitMainView.STATE_FRUIT_BETTING: {
                this.setFruitBetBtnsDisabled(false);
                this.setGuessBetBtnsDisabled(true);

                if (this.getFruitBetTotal() > 0) {
                    this.setGoBtnDisabled(false);
                }
                else {
                    this.setGoBtnDisabled(true);
                }

                this.lightsUnBlinkOnView();
                break;
            }
            case FruitMainView.STATE_ROTARY_RUNNING:
            case FruitMainView.STATE_GUESS_RUNNING: {
                this.setFruitBetBtnsDisabled(true);
                this.setGuessBetBtnsDisabled(true);
                this.setGoBtnDisabled(true);
                break;
            }
            case FruitMainView.STATE_GUESS_BETTING: {
                this.setFruitBetBtnsDisabled(true);
                this.setGuessBetBtnsDisabled(false);
                this.setGoBtnDisabled(false);
                break;
            }
        }
    };

    FruitMainView.prototype.setFruitBetBtnsDisabled = function (disabled) {
        this.fruitBtnGrayLayer.visible = disabled;
        this.canBetFruit = !disabled;
    };

    FruitMainView.prototype.setGuessBetBtnsDisabled = function (disabled) {
        this.guessBtnGrayLayer.visible = disabled;
        this.canGuessNum = !disabled;
    };

    FruitMainView.prototype.setGoBtnDisabled = function (disabled) {
        this.goBtnGrayLayer.visible = disabled;
        this.canTouchGoBtn = !disabled;
    }

    FruitMainView.prototype.getFruitBetTotal = function () {
        var index;
        var betTotal = 0;
        for (index in this.fruitBettingList) {
            betTotal += this.fruitBettingList[index];
        }

        return betTotal;
    };

    FruitMainView.STATE_GAME_INIT = 0;
    FruitMainView.STATE_FRUIT_BETTING = 1;
    FruitMainView.STATE_ROTARY_RUNNING = 2;
    FruitMainView.STATE_GUESS_BETTING = 3;
    FruitMainView.STATE_GUESS_RUNNING = 4;

    FruitMainView.BET_BTN_TYPE = {
        Add: "Add",
        Cut: "Cut"
    };

    FruitMainView.GUESS_TYPE = {
        Low: "Low",
        High: "High"
    };

    FruitMainView.BET_FRUIT_MAX = 99;
    FruitMainView.BET_FACTOR_MAX = 99;
    FruitMainView.BET_FACTOR_MIN = 1;

    FruitMainView.GRAY_ZERO_LAB_TOTAL = 9;

    FruitMainView.GUESS_LABEL_INDEX = "guess";
    return FruitMainView;
}(FruitMainViewUI));
