 var FruitMainView = (function(_super) {
    var Fruit = null;
    var Rotary = null;

    function FruitMainView() {
        FruitMainView.super(this);

        this.rotaryfruitList = null;
        this.fruitNameList = null;
        this.rotaryGuessType = null;

        this.rotaryFruitCellList = [];
        this.fruitBetBtnList = {};
        this.fruitBetLabelList = {};

        this.bonusWin = 0;//*奖励
        this.balance = 0;//*手上的赌金

        this.betFactor = 1;//*下注因数
        this.fruitBettingList = {};//*下注列表

        this.guessedNum = 0;//*猜大小的结果

        this.gameState = FruitMainView.STATE_GAME_INIT;
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

            this.rotaryFruitCellList.push(singleCell);
        }

        App.uiManager.setAllRotaryFruits(this.rotaryFruitCellList);
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

    FruitMainView.prototype.initTopInfoShow = function () {
        var player = App.player;
        this.balance = player.balance;

        this.setCreditLabText();
        this.setBetFactorLabText();
    };

    FruitMainView.prototype.setCreditLabText = function (balance) {
        balance = balance || this.balance;
        this.creditLab.text = balance;
    };

    FruitMainView.prototype.setBetFactorLabText = function (betFactor) {
        betFactor = betFactor || this.betFactor;
        this.betLab.text = betFactor;
    };

    FruitMainView.prototype.setBonusWinLabText = function (bonus) {
        bonus = bonus || this.bonusWin;
        this.bonusWinLab.text = bonus;
    };

     FruitMainView.prototype.setBettingLabelText = function (fruitName) {
         if (this.fruitNameList.indexOf(fruitName) == -1) {
             return;
         }

         this.fruitBetLabelList[fruitName].text = this.fruitBettingList[fruitName];
     };

    FruitMainView.prototype.onAllFruitAddBet = function () {

    };

    FruitMainView.prototype.onBetFruit = function (fruitName) {
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
    };

    FruitMainView.prototype.onGuessNumber = function (guessType) {
        switch (guessType) {
            case FruitMainView.GUESS_TYPE.Low: {
                break;
            }
            case  FruitMainView.GUESS_TYPE.High: {
                break;
            }
            default: {
                break;
            }
        }
    };

    FruitMainView.prototype.onGuessBetting = function (betType) {
        switch (betType) {
            case FruitMainView.BET_BTN_TYPE.Add: {
                break;
            }
            case  FruitMainView.BET_BTN_TYPE.Cut: {
                break;
            }
            default: {
                break;
            }
        }
    };

    FruitMainView.prototype.onChangeBetFactor = function (factorType) {
        switch (betType) {
            case FruitMainView.BET_BTN_TYPE.Add: {
                break;
            }
            case  FruitMainView.BET_BTN_TYPE.Cut: {
                break;
            }
            default: {
                break;
            }
        }
    };

    FruitMainView.prototype.onFruitRotaryRun = function () {

    };

    FruitMainView.prototype.update = function () {
        switch (this.gameState) {
            case FruitMainView.STATE_GAME_INIT:
            case  FruitMainView.STATE_FRUIT_BETTING: {
                this.setFruitBetBtnsDisabled(false);
                this.setGuessBetBtnsDisabled(true);

                if (this.getFruitBetTotal() > 0) {
                    this.goBtn.disabled = false;
                }
                else {
                    this.goBtn.disabled = true;
                }
                break;
            }
            case FruitMainView.STATE_ROTARY_RUNNING:
            case FruitMainView.STATE_GUESS_RUNNING: {
                this.setFruitBetBtnsDisabled(true);
                this.setGuessBetBtnsDisabled(false);
                this.goBtn.disabled = true;
                break;
            }
            case FruitMainView.STATE_GUESS_BETTING: {
                this.setFruitBetBtnsDisabled(true);
                this.setGuessBetBtnsDisabled(false);
                this.goBtn.disabled = false;
                break;
            }
        }
    };

    FruitMainView.prototype.setFruitBetBtnsDisabled = function (disabled) {
        this.allAddBtn.disabled = disabled;
        for (var index in this.fruitBetBtnList) {
            this.fruitBetBtnList[index].disabled = disabled;
        }
    };

    FruitMainView.prototype.setGuessBetBtnsDisabled = function (disabled) {
        this.betAddDoubleBtn.disabled = disabled;
        this.betCutDoubleBtn.disabled = disabled;
        this.lowNumBtn.disabled = disabled;
        this.highNumBtn.disabled = disabled;
    };

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
        Add: "add",
        Cut: "cut"
    };

    FruitMainView.GUESS_TYPE = {
        Low: "low",
        High: "high"
    };

    FruitMainView.BET_FRUIT_MAX = 99;

    FruitMainView.GRAY_ZERO_LAB_TOTAL = 9;

    FruitMainView.GUESS_LABEL_INDEX = "guess";
    return FruitMainView;
}(FruitMainViewUI));
