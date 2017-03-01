var FruitBox = (function(_super) {
    function FruitBox(fruitInfo) {
        FruitBox.super(this);

        this.name = fruitInfo.fruitName;
        this.multiple = fruitInfo.multiple;

        this.showType = FruitBox.SHOW_TYPE.ONLY_FRUIT;
        this.init();
    }

    Laya.class(FruitBox, "FruitBox", _super);

    FruitBox.prototype.init = function () {
        this.bigIcon.skin = "";
        this.middleIcon.skin = "";
        this.numLab.text = "";
        this.numLab.font = "brown";

        if (this.multiple > 1) {
            this.numLab.text = "X" + this.multiple;
            this.showType = FruitBox.SHOW_TYPE.HAVE_MULTIPLE;
        }
        else {
            this.showType = FruitBox.SHOW_TYPE.ONLY_FRUIT;
        }

        this.setFruitUnLight();
    };

    FruitBox.prototype.setFruitLighting = function () {
        switch (this.showType) {
            case FruitBox.SHOW_TYPE.HAVE_MULTIPLE: {
                this.middleIcon.skin = App.uiManager.getMiddleGlowFruitIconPath(this.name);
                break;
            }
            case FruitBox.SHOW_TYPE.ONLY_FRUIT: {
                this.bigIcon.skin = App.uiManager.getBigGlowFruitIconPath(this.name);
                break;
            }
        }
    };

    FruitBox.prototype.setFruitUnLight = function () {
        switch (this.showType) {
            case FruitBox.SHOW_TYPE.HAVE_MULTIPLE: {
                this.middleIcon.skin = App.uiManager.getMiddleFruitIconPath(this.name);
                break;
            }
            case FruitBox.SHOW_TYPE.ONLY_FRUIT: {
                this.bigIcon.skin = App.uiManager.getBigFruitIconPath(this.name);
                break;
            }
        }
    };


    FruitBox.SHOW_TYPE = {
        ONLY_FRUIT: 1,
        HAVE_MULTIPLE: 2
    };

    return FruitBox;
}(FruitBoxUI));
