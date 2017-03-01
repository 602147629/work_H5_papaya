var FruitLightBox = (function(_super) {
    function FruitLightBox(posInfo) {
        FruitLightBox.super(this);

        this.allFruitsPosList = App.uiManager.getAllRotaryFruits();
        this.endIndex = posInfo.endIndex;
        this.startIndex = posInfo.startIndex;
        this.moveSpeed = posInfo.moveSpeed || 0.05;
        //*到第几圈的时候销毁
        this.destroyTurn = posInfo.destroyTurn;
        //*总共要转的圈数
        this.totalTurns = posInfo.totalTurns;

        this.nextIndex = this.startIndex + 1;

        this.fruitListLength = this.allFruitsPosList.length;
        //*已经转的圈数记录
        this.wasTurn = 0;

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
                //*已经停止
                self.event(FruitLightBox.STOP_MOVE);
            }
        }));
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
            this.moveSpeed += 0.03;
        }

        var result = {
            x: this.allFruitsPosList[index].x,
            y: this.allFruitsPosList[index].y
        };

        this.nextIndex  = index + 1;

        return result;
    };

    FruitLightBox.prototype.doLightBlink = function () {
        this.canDoBlinkAction = true;
        this.blinkLight();
    };

    FruitLightBox.prototype.blinkLight = function () {
        var self = this;
        //var time = (Math.floor(Math.random() * 2))/10 + 0.4;
        var blinkAction = Blink.create(0.4, 2);
        var callBack = CallFunc.create(Laya.Handler.create(this, function () {
            if (this.canDoBlinkAction) {
                self.blinkLight();
            }
        }));
        var sequence = Sequence.create(blinkAction,callBack);
        App.actionManager.addAction(sequence, this);
    };

    FruitLightBox.prototype.stopLightBlink = function () {
        this.canDoBlinkAction = false;
    };

    FruitLightBox.prototype.dispose = function () {
        this.removeSelf();
    };

    FruitLightBox.STOP_MOVE = "stopMove";

    return FruitLightBox;
}(FruitLightBoxUI));
