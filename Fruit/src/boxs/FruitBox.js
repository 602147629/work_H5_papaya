var FruitBox = (function(_super) {
    function FruitBox(fruitInfo) {
        FruitBox.super(this);

        this.fruitInfo = fruitInfo;

        this.init();
    }

    Laya.class(FruitBox, "FruitBox", _super);

    FruitBox.prototype.init = function () {
        var fruitName = this.fruitInfo.fruitName;
        var multiple = this.fruitInfo.multiple;

        this.bigIcon.skin = "";
        this.middleIcon.skin = "";
        this.numLab.text = "";
        this.numLab.font = "brown";

        if (multiple > 1) {
            this.middleIcon.skin = App.uiManager.getMiddleFruitIconPath(fruitName);
            this.numLab.text = "X" + multiple;
        }
        else {
            this.bigIcon.skin = App.uiManager.getBigFruitIconPath(fruitName);
        }
    };


    return FruitBox;
}(FruitBoxUI));