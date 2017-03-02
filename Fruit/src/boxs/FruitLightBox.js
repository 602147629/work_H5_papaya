var FruitLightBox = (function(_super) {
    function FruitLightBox(posInfo) {
        FruitLightBox.super(this);

        this.allFruitsPosList = App.uiManager.getAllRotaryFruits();
        this.endIndex = posInfo.endIndex;
        this.startIndex = posInfo.startIndex;
        this.objectIndex = posInfo.objectIndex;
        this.lightIndex = posInfo.lightIndex;
        this.moveSpeed = posInfo.moveSpeed || 0.05;
        //*到第几圈的时候销毁
        this.destroyTurn = posInfo.destroyTurn;
        //*总共要转的圈数
        this.totalTurns = posInfo.totalTurns;

        this.nextIndex = this.startIndex + 1;

        this.fruitListLength = this.allFruitsPosList.length;
        //*已经转的圈数记录
        this.wasTurn = 0;

        this.speedList = FruitLightBox.TURN_TYPE_BY_SPEED[0];

        this.canDoBlinkAction = false;

        this.init();
    }

    Laya.class(FruitLightBox, "FruitLightBox", _super);

    FruitLightBox.prototype.init = function () {
        var startPos = {
            x: this.allFruitsPosList[this.startIndex].x,
            y: this.allFruitsPosList[this.startIndex].y
        };
        this.setPositions(startPos);

        if (this.objectIndex == 0) {
            this.totalTurns = FruitLightBox.MAX_TRUN - this.lightIndex;
            if (this.totalTurns <= 0) {
                this.totalTurns = 1;
            }
        }
        else {
            this.totalTurns = 0;
        }
        this.speedList = FruitLightBox.TURN_TYPE_BY_SPEED[this.totalTurns];
        this.moveSpeed = this.speedList[0];
    };

    FruitLightBox.prototype.move = function () {
        var endPos = this.getNextMovePosition();
        var moveAction = Place.create(endPos.x, endPos.y);
        App.uiManager.setFruitGlowByIndex(this.nextIndex - 1);
        var self = this;
        var callBack = CallFunc.create(Laya.Handler.create(this, function () {
            if (self.destroyTurn != 0) {
                if (self.wasTurn >= self.destroyTurn) {
                    self.dispose();
                    return;
                }
            }

            if (!(self.wasTurn >= self.totalTurns && self.endIndex == self.nextIndex - 1)) {
                App.uiManager.setFruitUnGlowByIndex(self.nextIndex - 1);
                self.move();
            }
            else {
                self.event(FruitLightBox.STOP_MOVE);
                //*已经停止
                self.willCreateNextLightBlink();
            }
        }));

        if (!this.moveSpeed) {
            if (this.totalTurns <= 1) {
                this.moveSpeed = 0.09;
            }
            else {
                this.moveSpeed = FruitLightBox.MIN_SPEED;
            }
        }
        this.sequence = Sequence.create(moveAction, DelayTime.create(this.moveSpeed) ,callBack);

        App.actionManager.addAction(this.sequence, this);
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
            this.moveSpeed = this.speedList[this.wasTurn];
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
