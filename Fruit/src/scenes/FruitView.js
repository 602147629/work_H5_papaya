var FruitMainView = (function(_super) {
    function FruitMainView() {
        FruitMainView.super(this);
        //*水果的下注记录
        this.fruitBetList = {};
        //*水果按钮
        this.fruitBtnsList = {};
        //*下注显示
        this.fruitBetLabList = {};

        this.rotaryFruitBgList = {};
        //*赌金
        this.stakes = 100;
        this.init();
    }

    Laya.class(FruitMainView, "FruitMainView", _super);

    FruitMainView.prototype.init = function () {
        this.initFruitBet();
        this.initBetNumbersShow();
        this.initRotary();
        this.initEvent();
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

        this.betLab.font = "yellow";
        this.betLab.text = "0000";
        this.bonusWinLab.font = "yellow";
        this.bonusWinLab.text = "0000";
        this.creditLab.font = "yellow";
        this.creditLab.text = "0000";
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
            this.rotaryFruitBgList[fruitName] = fruitBg;
        }
    };

    FruitMainView.prototype.initEvent = function () {
        this.settingBtn.on(Laya.Event.CLICK, this, this.touchSettingBtn);
        this.billsBtn.on(Laya.Event.CLICK, this, this.touchBillsBtn);
        this.rankingBtn.on(Laya.Event.CLICK, this, this.touchRankingBtn);

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

    FruitMainView.prototype.touchSettingBtn = function () {
        //*设置
    };

    FruitMainView.prototype.touchBillsBtn = function () {
        //*账单
    };

    FruitMainView.prototype.touchRankingBtn = function () {
        //*排名
    };

    FruitMainView.prototype.touchAllAddBtn = function () {
        var fruitName = "";
        var betSum = this.getBetSum();
        var diff = this.stakes - betSum;
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
    };

    FruitMainView.prototype.touchFruitBtn = function (fruitName) {
        var isAddBet = this.checkBetLimit(fruitName);
        if (isAddBet) {
            this.setFruitBetLabelText(fruitName);
        }
    };

    FruitMainView.prototype.checkBetLimit = function (fruitName) {
        var betSum = this.getBetSum();
        //*投注的金额会不会比手上持有的金额大
        var diff = this.stakes - betSum;
        if (diff > 0) {
            var bet = this.fruitBetList[fruitName];
            if (bet >= FruitMainView.MIN_BET_NUM && bet < FruitMainView.MAX_BET_NUM) {
                this.fruitBetList[fruitName] ++;
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
    FruitMainView.MAX_BET_NUM = 999;
    FruitMainView.MIN_BET_NUM = 0;
    FruitMainView.ALL_ADD_TOTAL = 8;
    FruitMainView.FRUIT_NAME_LIST = [
        "GG",
        "77",
        "Star",
        "Watermelon",
        "Bell",
        "Pomelo",
        "Orange",
        "Apple"
    ];

    FruitMainView.FRUIT_LIST = [
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
    FruitMainView.RESULT_LAB_INDEX = "result";
    return FruitMainView;
}(FruitMainViewUI));