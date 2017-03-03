var FruitLightBox = (function(_super) {
    function FruitLightBox(posInfo) {
        FruitLightBox.super(this);

        this.allFruitsPosList = App.uiManager.getAllRotaryFruits();
        this.endIndex = posInfo.endIndex;
        this.startIndex = posInfo.startIndex;
        this.objectIndex = posInfo.objectIndex;
        this.lightIndex = posInfo.lightIndex;

        //*到第几圈的时候销毁
        this.destroyTurn = posInfo.destroyTurn;
        //*总共要转的圈数
        this.totalTurns = 3;//posInfo.totalTurns;

        this.nextIndex = this.startIndex + 1;

        this.fruitListLength = this.allFruitsPosList.length;
        //*已经转的圈数记录
        this.wasTurn = 0;

        this.speedList = FruitLightBox.TURN_TYPE_BY_SPEED[0];

        this.canDoBlinkAction = false;

        this.moveTime = 1;

        this.moveSpeed = 105;
        this.acceleration = -5;

        this.moveTotal = 0;

        this.init();
    }

    Laya.class(FruitLightBox, "FruitLightBox", _super);

    FruitLightBox.prototype.init = function () {
        var startPos = {
            x: this.allFruitsPosList[this.startIndex].x,
            y: this.allFruitsPosList[this.startIndex].y
        };
        this.setPositions(startPos);

        Laya.timer.loop(400, this, this.updateTime);
    };

    FruitLightBox.prototype.updateTime = function () {
        this.moveTime += 1;
    };

    FruitLightBox.prototype.move = function () {
        var endPos = this.getNextMovePosition();
        this.x = endPos.x;
        this.y = endPos.y;

        App.uiManager.setFruitGlowByIndex(this.nextIndex - 1);

        if (this.destroyTurn != 0) {
            if (this.wasTurn >= this.destroyTurn) {
                this.dispose();
                return;
            }
        }

        var moveSpeed = this.calcMovingSpeed();
        console.log(moveSpeed);
        if (moveSpeed <= 0){
            moveSpeed = this.moveSpeed + this.acceleration;
        }

        if (!(this.wasTurn >= this.totalTurns && this.endIndex == this.nextIndex - 1)) {
            App.uiManager.setFruitUnGlowByIndex(this.nextIndex - 1);
            Laya.timer.once(Math.ceil(550/moveSpeed*100), this, this.move);
        }
        else {
            this.event(FruitLightBox.STOP_MOVE);
            //*已经停止
            this.willCreateNextLightBlink();
        }
    };

    FruitLightBox.prototype.calcMovingSpeed = function () {
        return (this.moveSpeed + this.acceleration * this.moveTime) * this.moveTime;
    };

    FruitLightBox.prototype.setPositions = function (pos) {
        this.x = pos.x;
        this.y = pos.y;
    };

    FruitLightBox.prototype.getNextMovePosition = function () {
        var index = this.nextIndex;

        var allFruitLength = this.fruitListLength;

        if (index > allFruitLength - 1) {
            index = 0;
        }

        if (index == this.startIndex) {
            this.wasTurn ++;
        }

        var result = {
            x: this.allFruitsPosList[index].x,
            y: this.allFruitsPosList[index].y
        };

        this.nextIndex = index + 1;
        return result;
    };

    FruitLightBox.prototype.doLightBlink = function () {
        this.canDoBlinkAction = true;
        this.blinkLight();
    };

    FruitLightBox.prototype.blinkLight = function () {
        var self = this;
        var blinkAction = Blink.create(0.4, 2);
        var callBack = CallFunc.create(Laya.Handler.create(this, function () {
            if (this.canDoBlinkAction) {
                self.blinkLight();
            }
        }));
        var sequence = Sequence.create(blinkAction,callBack);
        App.actionManager.addAction(sequence, this);
    };

    FruitLightBox.prototype.willCreateNextLightBlink = function () {
        var self = this;
        var blinkAction = Blink.create(1, 4);
        var callBack = CallFunc.create(Laya.Handler.create(this, function () {
            Laya.timer.once(150, self, function () {
                self.event(FruitLightBox.CAN_CREATE_NEXT_LIGHT);
            })
        }));
        this.event(FruitLightBox.STOP_MOVE);
        var sequence = Sequence.create(blinkAction, callBack);
        App.actionManager.addAction(sequence, this);
    };

    FruitLightBox.prototype.stopLightBlink = function () {
        this.canDoBlinkAction = false;
    };

    FruitLightBox.prototype.dispose = function () {
        this.removeSelf();
    };

    FruitLightBox.STOP_MOVE = "stopMove";
    FruitLightBox.CAN_CREATE_NEXT_LIGHT = "canCreateNextLight";
    FruitLightBox.MAX_SPEED = 0.03;
    FruitLightBox.MIN_SPEED = 0.15;
    FruitLightBox.MAX_TRUN = 4;

    FruitLightBox.TURN_TYPE_BY_SPEED = [
        [0.07],
        [0.07],
        [0.05, 0.07],
        [0.03, 0.05, 0.07],
        [0.03, 0.05, 0.07, 0.07]
    ];

    return FruitLightBox;
}(FruitLightBoxUI));
