var FruitRecordBox = (function(_super) {
    function FruitRecordBox() {
        FruitRecordBox.super(this);
    }

    Laya.class(FruitRecordBox, "FruitRecordBox", _super);

    FruitRecordBox.renderHandler = function(cell, index) {
        cell.onRender(cell,index);
    };

    FruitRecordBox.prototype.onRender = function (cell) {
        var data = cell.dataSource;
        if (!data) {
            return;
        }

        var fruitName = data.fruitName;
        var multiple = data.multiple;
        var id = data.id;

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

    return FruitRecordBox;
}(FruitRecordBoxUI));