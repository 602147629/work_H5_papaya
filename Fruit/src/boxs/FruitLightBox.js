var FruitLightBox = (function(_super) {
    function FruitLightBox(posInfo) {
        FruitLightBox.super(this);

        this.allFruitsPosList = App.uiManager.getAllFruits();
        this.endIndex = posInfo.endIndex;
        this.startIndex = posInfo.startIndex;

        this.fruitListLength = this.allFruitsPosList.length;
        this.fruitStartIndex = 0;

        this.init();
    }

    Laya.class(FruitLightBox, "FruitLightBox", _super);

    FruitLightBox.prototype.init = function () {
        this.x = this.allFruitsPosList[this.endIndex].x;
        this.y = this.allFruitsPosList[this.endIndex].y;
    };

    FruitLightBox.prototype.move = function () {
        //var startPositionX = this.allFruitsPosList[this.startIndex].x;
        //var startPositionY = this.allFruitsPosList[this.startIndex].y;
        //var moveToAction = MoveTo.create(0.1, startPositionX, startPositionY);

    };

    FruitLightBox.prototype.dispose = function () {
        this.removeSelf();
    };

    return FruitLightBox;
}(FruitLightBoxUI));
