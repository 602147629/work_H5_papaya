var MultipleLightBox = (function(_super) {
    function MultipleLightBox(posList) {
        MultipleLightBox.super(this);

        this.posList = posList;
        this.endIndex = 0;
        this.startIndex = 0;
        this.nextIndex = 0;
        this.stopState = true;
        this.canDoBlinkAction = false;
        this.moveSpeed = 0.04;
        this.init();
    }

    Laya.class(MultipleLightBox, "MultipleLightBox", _super);

    MultipleLightBox.prototype.init = function () {
        this.x = this.posList[0].x;
        this.y = this.posList[0].y;
    };

    MultipleLightBox.prototype.startMove = function (endIndex) {
        this.endIndex = endIndex;
        this.stopState = false;
        this.nextIndex = this.startIndex + 1;
        this.moving();
    };

    MultipleLightBox.prototype.moving = function () {
        var endPos = this.getNextPos();
        var moveAction = Place.create(endPos.x, endPos.y);
        var self = this;
        var callBack = CallFunc.create(Laya.Handler.create(this, function () {
            if (self.stopState) {
                self.x = self.posList[this.endIndex].x;
                self.y = self.posList[this.endIndex].y;
            }
            else {
                self.moving();
            }
        }));
        this.sequence = Sequence.create(moveAction, DelayTime.create(this.moveSpeed) ,callBack);

        App.actionManager.addAction(this.sequence, this);
    };

    MultipleLightBox.prototype.getNextPos = function () {
        var index = this.nextIndex;

        var posListLength = this.posList.length;

        if (index > posListLength - 1) {
            index = 0;
        }

        var result = {
            x: this.posList[index].x,
            y: this.posList[index].y
        };

        this.nextIndex = index + 1;

        return result;
    };

    MultipleLightBox.prototype.doLightBlink = function () {
        this.canDoBlinkAction = true;
        this.blinkLight();
    };

    MultipleLightBox.prototype.blinkLight = function () {
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

    MultipleLightBox.prototype.stopLightBlink = function () {
        this.canDoBlinkAction = false;
    };

    MultipleLightBox.prototype.stopMove = function () {
        this.stopState = true;
    };

    return MultipleLightBox;
}(MultipleLightBoxUI));
