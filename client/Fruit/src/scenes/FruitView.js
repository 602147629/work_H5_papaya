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
        this.fruitBetBtnEffects     = {};
        this.fruitBetLabelList      = {};
        this.fruitLightList         = [];
        this.fruitBettingList       = {};//*下注列表
        this.fruitBetShowList       = {};//*1-9
        this.lowMultipleImgs        = [];
        this.highMultipleImgs       = [];
        this.rotaryFruitBoxList     = [];

        this.bonusWin               = 0;//*奖励
        this.balance                = 0;//*手上的赌金
        this.betFactor              = 1;//*下注因数
        this.betFactorList          = [1, 5, 10, 20, 50, 100];
        this.betFactorIndex         = 0;
        this.betTotal               = 0;//*下注总数

        this.multiples              = {low: 10, high: 20};
        this.guessCanBetTotal       = 0;
        this.guessedNum             = 0;//*猜大小的结果

        this.canBetFruit            = true;
        this.canGuessNum            = false;
        this.canTouchGoBtn          = false;

        this.isRandomShowInBetLab   = false;//*是否已经显示随机数字
        this.isPromptThisRound      = false;//*是否显示了结算

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

        this.betAddBtn.on(Laya.Event.CLICK, this, this.onChangeBetFactor);

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
                this.fruitBetShowList[index] = 0;
            }
        }
        else {
            var fruitName = "";
            for (index in this.fruitNameList) {
                fruitName = this.fruitNameList[index];
                this.fruitBettingList[fruitName] = 0;
                this.fruitBetShowList[fruitName] = 0;
            }
        }
    };

    FruitMainView.prototype.initFruitRotaryShow = function () {
        this.initRotaryFruitCell();
        this.initRotaryLabelShow();
        this.initMultipLights();
        this.initRecordBoxList();
        this.initEffect();
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
            rotaryFruit.anchorX = 0.5;
            rotaryFruit.anchorY = 0.5;
            rotaryFruit.x = singleCell.x + 45;
            rotaryFruit.y = singleCell.y + 44;
            rotaryFruit.zOrder = 10;
            this.fruitBgBox.addChild(rotaryFruit);

            this.rotaryFruitBoxList.push(rotaryFruit);
            this.rotaryFruitCellList.push(singleCell);
        }

        //*储存格子
        App.uiManager.setAllRotaryFruits(this.rotaryFruitCellList);
        //*储存水果
        App.uiManager.setRotaryFruitBoxList(this.rotaryFruitBoxList);
    };

    FruitMainView.prototype.setFruitCellBgGray = function () {
        var length = this.rotaryFruitCellList.length;
        var skin = "";
        for (var i = 0; i < length; i++) {
            if (i == FruitMainView.GOLDEN_LUCK_INDEX) {
                skin = App.uiManager.getFruitCellGraySkin("golden");
            }
            else if (i == FruitMainView.BLUE_LUCK_INDEX) {
                skin = App.uiManager.getFruitCellGraySkin("blue");
            }
            else {
                var num = i%2;
                if (num <= 0) {
                    skin = App.uiManager.getFruitCellGraySkin("deep");
                }
                else {
                    skin = App.uiManager.getFruitCellGraySkin("shallow");
                }
            }
            this.rotaryFruitCellList[i].skin = skin;
        }
    };

    FruitMainView.prototype.initRotaryLabelShow = function () {
        var label = null;
        var zeroLabelBox = this.zeroLabBox;
        for (var zeroLabIndex = 0; zeroLabIndex < FruitMainView.GRAY_ZERO_LAB_TOTAL; zeroLabIndex++) {
            label = zeroLabelBox.getChildByName("zeroLab_" + zeroLabIndex);
            label.font = "white";
            label.text = "88";
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

        this.guessNumZeroLab.font = "white";
        this.guessNumZeroLab.text = "88";
        this.guessNumLab.font = "red";
        this.guessNumLab.text = "";
        this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX] = this.guessNumLab;

        var topLabelList = [this.betLab, this.bonusWinLab, this.creditLab];
        for (var topLabelIndex = 0; topLabelIndex < 3; topLabelIndex++) {
            label = topLabelList[topLabelIndex];
            label.font = "yellow";
            label.text = "0";
        }

        this.totalBetLab.font = "yellow";
        this.totalBetLab.text = "0";
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

        this.blinkLightForGuess = [];
        //*这里创建的是在博中大小之后所闪烁的倍率灯
        for (var i = 0; i < 3; i++) {
            var lowLight = new MultipleLightBox(this.lowMultipleImgs);
            lowLight.setPositionByPosList(i);
            this.lightBox.addChild(lowLight);
            lowLight.doLightBlink();
            this.blinkLightForGuess.push(lowLight);

            var highLight = new MultipleLightBox(this.highMultipleImgs);
            highLight.setPositionByPosList(i);
            this.lightBox.addChild(highLight);
            highLight.doLightBlink();
            this.blinkLightForGuess.push(highLight);
        }

        this.setLightBoxVisibleAndBlink(false);
    };

    FruitMainView.prototype.setLightBoxVisibleAndBlink = function (visible, isBlink) {
        if (typeof(visible) == "boolean") {
            this.lightBox.visible = visible;

            this.lowLight.visible = !visible;
            this.highLight.visible = !visible;
        }

        if (typeof(isBlink) == "boolean") {
            var index;
            for (index in this.blinkLightForGuess) {
                if (isBlink) {
                    this.blinkLightForGuess[index].doLightBlink();
                }
                else {
                    this.blinkLightForGuess[index].stopLightBlink();
                }
            }
        }
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

    FruitMainView.prototype.initEffect = function () {
        this.goBtnEffect = App.animManager.get("ani.btn.goEffect");
        this.goBtnEffect.x -= 15;
        this.goBtnEffect.y -= 16;
        this.goBtnEffect.play();
        this.goBtnEffect.blendMode = "light";
        this.goBtn.addChild(this.goBtnEffect);

        var eggs = ["blue", "golden"];
        for (var i = 0; i < eggs.length; i++) {
           var eggName = eggs[i];
           this.initEggEffectAndAction(eggName);
        }

        this.initArrowEffect();

        this.initFruitBtnEffect();
    };

    //*luck的特效和动作
    FruitMainView.prototype.initEggEffectAndAction = function (type) {
        var index = 0;
        var animName = "";
        var effectId = 10001;
        switch (type) {
            case "golden": {
                index = FruitMainView.GOLDEN_LUCK_INDEX;
                animName = "ani.goldenLucky.rotate";
                effectId = 10001;
                break;
            }

            case "blue": {
                index = FruitMainView.BLUE_LUCK_INDEX;
                animName = "ani.blueLucky.rotate";
                effectId = 10002;
                break;
            }
        }

        var singleCell = this.rotaryFruitCellList[index];
        var rotaAction = App.animManager.get(animName);
        rotaAction.x = singleCell.x;
        rotaAction.y = singleCell.y;
        rotaAction.scaleX = 0.99;
        rotaAction.scaleY = 0.99;
        this.fruitBgBox.addChild(rotaAction);
        rotaAction.play();

        var effect = SpineEffect.create(effectId);
        if (effect) {
            effect.x = singleCell.x + 40;
            effect.y = singleCell.y + 106;
            effect.zOrder = 10;
            this.fruitBgBox.addChild(effect);
            effect.play();
        }
    };

    //*猜大小箭头动画和特效
    FruitMainView.prototype.initArrowEffect = function () {
        this.arrowEffects = [];
        var rightArrow = SpineEffect.create(10003);
        if (rightArrow) {
            rightArrow.x = 50;
            rightArrow.y = 75;
            this.betCutDoubleBtn.addChild(rightArrow);
            rightArrow.play();
            this.arrowEffects.push(rightArrow);
        }

        var leftArrow = SpineEffect.create(10003);
        if (leftArrow) {
            leftArrow.scaleX = - leftArrow.scaleX;
            leftArrow.x = 50;
            leftArrow.y = 75;
            this.betAddDoubleBtn.addChild(leftArrow);
            leftArrow.play();
            this.arrowEffects.push(leftArrow);
        }

        var arrowList = [this.betCutDoubleBtn, this.betAddDoubleBtn];
        for (var i = 0; i < arrowList.length; i ++) {
            //*发光，混合模式
            var lanse = new Laya.Image();
            lanse.skin = "assets/ui.images/lanse.png";
            lanse.blendMode = "light";
            arrowList[i].addChild(lanse);

            var lightMoveAction = App.animManager.get("ani.btn.lightMoveEffect");
            lightMoveAction.x = 0;
            lightMoveAction.y = 6;
            lightMoveAction.interval = 100;
            lightMoveAction.blendMode = "light";
            arrowList[i].addChild(lightMoveAction);
            lightMoveAction.play();

            var fadeActionLight = FadeTo.create(0.4, 0.2);
            var fadeActionLight2 = FadeTo.create(0.4, 0.8);
            var seq1 = Sequence.create(fadeActionLight, DelayTime.create(0.6) ,fadeActionLight2).repeatForever();
            App.actionManager.addAction(seq1, lightMoveAction);

            var fadeAction = FadeTo.create(0.4, 0);
            var fadeAction2 = FadeTo.create(0.4, 0.8);
            var seq = Sequence.create(fadeAction, DelayTime.create(0.6) ,fadeAction2).repeatForever();
            App.actionManager.addAction(seq, lanse);

            this.arrowEffects.push(lanse);
            this.arrowEffects.push(lightMoveAction);
        }

        this.setArrowEffectVisible(false);
    };

    FruitMainView.prototype.setArrowEffectVisible = function (visible) {
        if (typeof(visible) != "boolean") {
            visible = false;
        }

        for (var i = 0; i < this.arrowEffects.length; i++) {
            this.arrowEffects[i].visible = visible;
        }

        this.leftArrow.visible = !visible;
        this.rightArrow.visible = !visible;
    };

    //*押注水果按钮的特效
    FruitMainView.prototype.initFruitBtnEffect = function () {
        var btnName = "";
        var btn = null;
        var imgSkin = "assets/ui.images/luse.png";
        for (btnName in this.fruitBetBtnList) {
            btn = this.fruitBetBtnList[btnName];
            var btnEffect = new Laya.Image();
            btnEffect.skin = imgSkin;
            btnEffect.blendMode = "light";
            btn.addChild(btnEffect);

            var fadeAction = FadeTo.create(0.4, 0);
            var fadeAction2 = FadeTo.create(0.4, 0.8);
            var seq = Sequence.create(fadeAction, DelayTime.create(0.6) ,fadeAction2).repeatForever();
            App.actionManager.addAction(seq, btnEffect);

            this.fruitBetBtnEffects[btnName] = btnEffect;
        }
    };

    FruitMainView.prototype.initTopInfoShow = function () {
        var player = App.player;
        this.balance = player.balance;

        this.setCreditLabText();
        this.setBetFactorLabText();
    };

    FruitMainView.prototype.setCreditLabText = function (balance) {
        var oldBalance = Number(this.creditLab.text);
        balance = balance || this.balance;
        App.actionManager.add(
            NumberTo.create(0.5, oldBalance, balance),
            this.creditLab
        );
    };

    FruitMainView.prototype.setBetFactorLabText = function (betFactor) {
        betFactor = betFactor || this.betFactor;
        this.betLab.text = betFactor;
    };

    FruitMainView.prototype.setBonusWinLabText = function (bonus) {
        var oldBonus = Number(this.bonusWinLab.text);
        bonus = bonus || this.bonusWin;
        if (bonus > 0) {
            this.bonusWinLab.text = bonus;
        }
        else {
            App.actionManager.add(
                NumberTo.create(0.5, oldBonus, bonus),
                this.bonusWinLab
            );
        }
    };

    FruitMainView.prototype.setBettingLabelText = function (fruitName, randNum) {
        if (this.fruitNameList.indexOf(fruitName) == -1) {
            return;
        }

        if (randNum) {
            this.fruitBetLabelList[fruitName].text = randNum;
        }
        else {
            this.fruitBetLabelList[fruitName].text = this.fruitBetShowList[fruitName];
        }
    };

    FruitMainView.prototype.setBetTotalLabText = function () {
        this.totalBetLab.text = this.getFruitBetTotal();
    };

    FruitMainView.prototype.showFruitResultPrompt = function () {
        var promptInfo = this._promptInfo;
        this.promotByFruitList = [];
        this.playPromotIndex = 0;
        var promptStr = "";
        if (promptInfo.hasBigTriple) {
            promptStr = "大三元！";
            this.promotByFruitList.push(promptStr);
        }

        if (promptInfo.hasQuadruple) {
            promptStr = "大四喜！";
            this.promotByFruitList.push(promptStr);
        }

        if (promptInfo.hasSmallTriple) {
            promptStr = "小三元！";
            this.promotByFruitList.push(promptStr);
        }

        if　(this.promotByFruitList.length == 1) {
            this.setPromptLabText(promptStr);
        }
        else if (this.promotByFruitList.length > 1) {
            this.updatePromptByFruit();
        }
    };

    FruitMainView.prototype.updatePromptByFruit = function () {
        Laya.timer.loop(1000, this, this.updateShowPrompt);
    };

    FruitMainView.prototype.closeUpdatePromptTimer = function () {
        Laya.timer.clear(this, this.updateShowPrompt);
    };

    FruitMainView.prototype.updateShowPrompt = function () {
        this.playPromotIndex ++;
        if (this.playPromotIndex >= this.promotByFruitList.length) {
            this.playPromotIndex = 0;
        }

        var promptStr = this.promotByFruitList[this.playPromotIndex];
        this.setPromptLabText(promptStr);
    };

    FruitMainView.prototype.setPromptLabText = function (promptStr) {
        promptStr = promptStr || "";
        this.promptLab.text = promptStr;
    };

    FruitMainView.prototype.onAllFruitAddBet = function () {
        if (this.gameState == FruitMainView.STATE_GAME_INIT || this.gameState == FruitMainView.STATE_FRUIT_BETTING) {
            for (var fruitNameIndex in this.fruitNameList) {
                fruitName = this.fruitNameList[fruitNameIndex];
                this.onBetFruit(fruitName);
            }
        }
        else if (this.gameState == FruitMainView.STATE_GUESS_BETTING) {
            this.lightsUnBlinkOnView();
            this.showRandomNumInBetLab();
        }
    };

    FruitMainView.prototype.onBetFruit = function (fruitName) {
        if (!this.canBetFruit) {
            return;
        }

        if (this.fruitNameList.indexOf(fruitName) == -1) {
            return;
        }

        var betting = this.fruitBetShowList[fruitName];
        betting ++;
        if (betting >= 9) {
            betting = 9;
        }

        this.fruitBetShowList[fruitName] = betting;
        this.fruitBettingList[fruitName] = betting * this.betFactor;
        this.setBettingLabelText(fruitName);
        this.setBetTotalLabText();
    };

    FruitMainView.prototype.showRandomNumInBetLab = function () {
        if (this.isRandomShowInBetLab) {
            return;
        }

        var rand = 0;
        for (var index in this.fruitNameList) {
            var fruitName = this.fruitNameList[index];
            rand = Math.floor(Math.random() * 13) + 1;
            this.setBettingLabelText(fruitName, rand);
        }

        this.isRandomShowInBetLab = true;
    };

    //*获取赌大小的结果
    FruitMainView.prototype.onGuessNumber = function (guessType) {
        this.lightsUnBlinkOnView();

        if (this.gameState != FruitMainView.STATE_GUESS_BETTING) {
            return;
        }

        if (!this.canGuessNum) {
            return;
        }

        if (FruitMainView.GUESS_TYPE[guessType] == null) {
            this.updateGameStateToCanBet();
            return;
        }

        var type = null;
        var bet = this.bonusWin;

        if (this.lightBox.visible) {
            this.setLightBoxVisibleAndBlink(true,false);
        }

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

    //*赌大小数字跳转表现开始
    FruitMainView.prototype.onGuessRunning = function (result) {
        this.gameState = FruitMainView.STATE_GUESS_RUNNING;

        App.player.update(result.player);

        this.bonusWin = result.bonusWin;
        this.guessedNum = result.randNum;
        this.guessRunningTime = 0;//*跳动的总时间
        this.slowTime = 0;

        Laya.timer.frameLoop(1, this, this.guessNumberAction);
    };

    //*赌大小数字跳转动作表现
    FruitMainView.prototype.guessNumberAction = function () {
        var rand = Math.floor(Math.random() * 12) + 1;
        var dt = Laya.timer.delta;
        this.guessRunningTime += dt;

        if (this.guessRunningTime >= 800 && this.guessRunningTime < 1000){
            this.slowTime += dt;
            if (this.slowTime >= 50) {
                this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX].text = rand;
                this.slowTime = 0;
            }
        }
        else if (this.guessRunningTime >= 1000 && this.guessRunningTime < 1200) {
            this.slowTime += dt;
            if (this.slowTime >= 80) {
                this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX].text = rand;
                this.slowTime = 0;
            }
        }
        else if (this.guessRunningTime >= 1200 && this.guessRunningTime < 1500) {
            this.slowTime += dt;
            if (this.slowTime >= 130) {
                this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX].text = rand;
                this.slowTime = 0;
            }
        }
        else if (this.guessRunningTime >= 1500) {
            Laya.timer.clear(this, this.guessNumberAction);
            this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX].text = this.guessedNum;
            if (this.bonusWin < 0) {
                this.updateGameStateToCanBet();
            }
            else if (this.bonusWin > 0) {
                this.guessCanBetTotal = this.bonusWin * 2;
                this.setBonusWinLabText();
                this.gameState = FruitMainView.STATE_GUESS_BETTING;
                this.setLightBoxVisibleAndBlink(true,true);
            }
            else {
                this.gameState = FruitMainView.STATE_GUESS_BETTING;
            }
        }
        else {
            this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX].text = rand;
            this.slowTime = 0;
        }
    };

    FruitMainView.prototype.onGuessBetting = function (betType) {
        this.lightsUnBlinkOnView();

        if (this.gameState != FruitMainView.STATE_GUESS_BETTING) {
            return;
        }

        if (!this.canGuessNum) {
            return;
        }

        this.showRandomNumInBetLab();
        if (this.lightBox.visible) {
            this.setLightBoxVisibleAndBlink(true,false);
        }

        var guessBet = this.bonusWin;
        switch (betType) {
            case FruitMainView.BET_BTN_TYPE.Add: {
                guessBet = this.bonusWin * 2;
                if (this.bonusWin > this.balance) {
                    return;
                }

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


        this.balance = App.player.balance - guessBet;
        this.setCreditLabText();

        this.bonusWin = guessBet;
        this.setBonusWinLabText();
    };

    //*改变押注的倍率
    FruitMainView.prototype.onChangeBetFactor = function () {
        var betFactor = this.betFactor;
        var betIndex = this.betFactorIndex;
        var length = this.betFactorList.length - 1;
        betIndex++;
        if (betIndex > length) {
            betIndex = 0;
        }

        this.betFactorIndex = betIndex;
        betFactor = this.betFactorList[betIndex];
        this.betFactor = betFactor;
        this.setBetFactorLabText();

        for (var index in this.fruitBetShowList) {
            this.fruitBettingList[index] = this.fruitBetShowList[index] * this.betFactor;
        }
        this.setBetTotalLabText();
    };

    //*按下Go
    FruitMainView.prototype.onFruitRotaryRun = function () {
        if (!this.canTouchGoBtn) {
            return;
        }

        var gameState = this.gameState;

        if (gameState == FruitMainView.STATE_GAME_INIT || gameState == FruitMainView.STATE_FRUIT_BETTING) {
            //*在能够押注的状态下，获取本局的结果
            this.setLightBoxVisibleAndBlink(false,false);
            this.setFruitCellBgGray();
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
                bet: JSON.stringify(fruitBet)
            };

            App.netManager.request(api, params, Laya.Handler.create(null, complete));
        }
        else if (gameState == FruitMainView.STATE_GUESS_BETTING) {
            //*能够赌大小的情况下，按下，收回奖励金额
            this.updateGameStateToCanBet();
        }
    };

    //*恢复界面的初始状态
    FruitMainView.prototype.updateGameStateToCanBet = function () {
        this.bonusWin = 0;
        this.guessCanBetTotal = 0;
        this.balance = App.player.balance;
        this._luckPos = null;
        this.isRandomShowInBetLab = false;
        this.isPromptThisRound = false;

        this.setCreditLabText();
        this.setBonusWinLabText();
        this.initFruitBettingList();
        this.setLightBoxVisibleAndBlink(true,false);

        var fruitName = "";
        for (var index in this.fruitNameList) {
            fruitName = this.fruitNameList[index];
            this.setBettingLabelText(fruitName);
        }

        this.gameState = FruitMainView.STATE_FRUIT_BETTING;
    };

    //*开始表现转
    FruitMainView.prototype.rotaryRunning = function (result) {
        this.gameState = FruitMainView.STATE_ROTARY_RUNNING;
        App.uiManager.cleanSaveGlowFruitList();
        this.cleanFruitLights();

        App.player.update(result.player);

        this._promptInfo = result.rewardType;

        this._resultFruitObj = result.fruits;
        this._resultFruitObjKeys = Object.keys(this._resultFruitObj);
        this._resultFruitObjKeysLength = this._resultFruitObjKeys.length;

        this._runningObjIndex = 0;
        this._runningLightIndex = 0;

        this._endPos = this._endPos || 0;
        this._totalLightIndex = 0;

        this.lightRotating();

        this.bonusWin = result.bonusWin;
        this.multiples = result.multiples;
        this.guessCanBetTotal = this.bonusWin * 2;

        this.multipleLightMoving();
    };

    //*清除上一局所有的灯
    FruitMainView.prototype.cleanFruitLights = function () {
        var fruitLightList = this.fruitLightList;
        var length = fruitLightList.length;

        for (var lightIndex = 0; lightIndex < length; lightIndex++) {
            fruitLightList[lightIndex].dispose();
        }

        this.fruitLightList = [];
    };

    FruitMainView.prototype.lightRotating = function () {
        this._totalLightIndex ++;
        var runningObjIndex = this._runningObjIndex;
        var runningObjName = this._resultFruitObjKeys[runningObjIndex];
        var runningFruitList = this._resultFruitObj[runningObjName];

        this._runningObjLength = runningFruitList.length;

        if (this._runningObjLength <= 0) {
            this.lightStoppedMove();
            return;
        }

        var isLuckyRound = false;
        if (this._runningObjIndex == 1) {
            var luckPos = this.getLuckyPosThisRound();
            var startIndex = luckPos;
            isLuckyRound = true;
        }
        else {
            startIndex = this._endPos;
        }

        var endIndex = runningFruitList[this._runningLightIndex];
        var info = {
            startIndex: startIndex,
            endIndex: endIndex,
            lightIndex: this._totalLightIndex,
            isLuckyRound:isLuckyRound
        };

        var light = new FruitLightBox(info);
        light.on(FruitLightBox.CAN_CREATE_NEXT_LIGHT, this, this.lightStoppedMove);
        light.on(FruitLightBox.STOP_MOVE, this, this.fruitActionInRoraty, [endIndex]);
        light.zOrder = 1;
        this.fruitBgBox.addChild(light);
        this.fruitLightList.push(light);
        light.move();

        if (this._runningObjIndex != 1) {
            this._endPos = endIndex;
        }

        if (this._runningLightIndex == 0 && this._runningObjIndex == 0) {
            //*装饰灯
            for (var index = 1; index < 3; index ++) {
                startIndex = startIndex - 1;
                if (startIndex < 0) {
                    startIndex = 24 + startIndex;
                }
                var destroyTurn = 3 - index;
                var lightInfo = {
                    startIndex: startIndex,
                    endIndex: endIndex,
                    destroyIndex: index
                };

                var decorateLight = new FruitLightBox(lightInfo);
                decorateLight.zOrder = 100;
                this.fruitBgBox.addChild(decorateLight);
                decorateLight.move();
            }
        }
    };

    //*获得这一局lucky的位置
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
        this.showFruitResultPrompt();
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

    FruitMainView.prototype.fruitActionInRoraty = function (fruitIndex) {
        if (typeof (fruitIndex) != "number") {
            return;
        }

        if (fruitIndex == FruitMainView.GOLDEN_LUCK_INDEX || fruitIndex == FruitMainView.BLUE_LUCK_INDEX) {
            return;
        }

        var fruitImgList = this.rotaryFruitBoxList;
        var fruit = fruitImgList[fruitIndex];
        fruit.lightStoppedAction();

        App.uiManager.saveGlowFruitIndex(fruitIndex);
    };

    //*显示转盘停下来之后的结果
    FruitMainView.prototype.showFruitResultOnView = function () {
        this.gameState = FruitMainView.STATE_GUESS_BETTING;
        this.closeUpdatePromptTimer();
        this.setBonusWinLabText();
        this.balance = App.player.balance - this.bonusWin;
        this.setCreditLabText();

        //*记录显示
        var fruitResultInRound = this._resultFruitObj;
        for (var index in fruitResultInRound) {
            this.addRecordItem(fruitResultInRound[index]);
        }

        if (this.bonusWin <= 0) {
            //*没有奖金就是没有中奖，清除所有的状态
            this.updateGameStateToCanBet();
        }
        else {
            //*中奖了，猜大小显示0
            this.fruitBetLabelList[FruitMainView.GUESS_LABEL_INDEX].text = "0";
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
    };

    FruitMainView.prototype.lightsUnBlinkOnView = function () {
        for (var index in this.fruitLightList) {
            this.fruitLightList[index].stopLightBlink();
        }
    };

    FruitMainView.prototype.multipleLightMoving = function () {
        var lowLightEndIndex = Rotary.RANDOM_MULTIPLE_LOW.indexOf(this.multiples.low);
        var highLightEndIndex = Rotary.RANDOM_MULTIPLE_HIGH.indexOf(this.multiples.high);
        this.lowLight.startMove(lowLightEndIndex);
        this.highLight.startMove(highLightEndIndex);
    };

    FruitMainView.prototype.update = function () {
        switch (this.gameState) {
            case FruitMainView.STATE_GAME_INIT:
            case  FruitMainView.STATE_FRUIT_BETTING: {
                this.setFruitBetBtnsDisabled(false);
                this.setGuessBetBtnsDisabled(true);
                this.setFruitBetLightVisiable(true);
                this.setArrowEffectVisible(false);
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
                this.setFruitBetLightVisiable(false);
                this.setArrowEffectVisible(false);
                break;
            }
            case FruitMainView.STATE_GUESS_BETTING: {
                this.setFruitBetBtnsDisabled(true);
                this.setGuessBetBtnsDisabled(false);
                this.setGoBtnDisabled(false);
                this.setFruitBetLightVisiable(false);
                this.setArrowEffectVisible(true);
                break;
            }
        }
    };

    FruitMainView.prototype.setFruitBetLightVisiable = function (visible) {
        for (var index in this.fruitBetBtnEffects) {
            this.fruitBetBtnEffects[index].visible = visible;
        }
    };

    FruitMainView.prototype.setFruitBetBtnsDisabled = function (disabled) {
        this.fruitBtnGrayLayer.visible = disabled;
        this.canBetFruit = !disabled;
    };

    FruitMainView.prototype.setGuessBetBtnsDisabled = function (disabled) {
        if (this.gameState != FruitMainView.STATE_GUESS_RUNNING) {
            this.guessBtnGrayLayer.visible = disabled;
        }
        this.canGuessNum = !disabled;
    };

    FruitMainView.prototype.setGoBtnDisabled = function (disabled) {
        this.goBtnGrayLayer.visible = disabled;
        this.canTouchGoBtn = !disabled;
        if (this.gameState == FruitMainView.STATE_GUESS_BETTING) {
            this.goBtnEffect.visible = false;
        }
        else {
            this.goBtnEffect.visible = !disabled;
        }
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

    FruitMainView.GRAY_ZERO_LAB_TOTAL = 8;

    FruitMainView.GUESS_LABEL_INDEX = "guess";

    FruitMainView.GOLDEN_LUCK_INDEX = 23;
    FruitMainView.BLUE_LUCK_INDEX = 11;

    return FruitMainView;
}(FruitMainViewUI));
