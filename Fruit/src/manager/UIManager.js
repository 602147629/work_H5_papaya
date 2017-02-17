
var UIManager = (function(_super) {
    function UIManager() {
        UIManager.super(this);

    }

    Laya.class(UIManager, "UIManager", _super);

    UIManager.prototype.init = function(callback) {
        callback && callback();
    };

    UIManager.prototype.showMessage = function(msg) {
        //var boxMessage = new BoxMessage(msg);
        //
        //var onBackOut = function() {
        //    Laya.stage.removeChild(boxMessage);
        //    boxMessage.destroy();
        //};
        //var onBackIn = function() {
        //    Laya.Tween.to(
        //        boxMessage,
        //        {x: Laya.stage.width + boxMessage.width},
        //        300,
        //        Laya.Ease["backOut"],
        //        Laya.Handler.create(null, onBackOut),
        //        1000,
        //        false
        //    );
        //};
        //
        //Laya.Tween.from(
        //    boxMessage,
        //    {x: 0},
        //    500,
        //    Laya.Ease["backIn"],
        //    Laya.Handler.create(null, onBackIn)
        //);
        //Laya.stage.addChild(boxMessage);
    };

    UIManager.prototype.getBigFruitIconPath = function (fruitName) {
        if (fruitName == null) {
            return;
        }

        return UIManager.ICON_BIG[fruitName];
    };

    UIManager.prototype.getMiddleFruitIconPath = function (fruitName) {
        if (fruitName == null) {
            return;
        }

        return UIManager.ICON_MEDDLE[fruitName];
    };

    UIManager.ICON_BIG = {
        "GG": "ui.main/icon_gg-L.png",
        "77": "ui.main/icon_77-L.png",
        "Star": "ui.main/icon_xx-L.png",
        "Watermelon": "ui.main/icon_xg-L.png",
        "Bell": "ui.main/icon_ld-L.png",
        "Pomelo": "ui.main/icon_yz-l.png",
        "Orange": "ui.main/icon_jz-L.png",
        "Apple": "ui.main/icon_pg-L.png",
        "BlueLuck": "ui.main/icon_LUCK-blue.png",
        "GoldenLuck": "ui.main/icon_LUCK-Golden.png"
    };

    UIManager.ICON_MEDDLE = {
        "GG": "ui.main/icon_gg-s.png",
        "77": "ui.main/icon_77-M.png",
        "Star": "ui.main/icon_xx-M.png",
        "Watermelon": "ui.main/icon_xg-M.png",
        "Bell": "ui.main/icon_ld-M.png",
        "Pomelo": "ui.main/icon_yz-M.png",
        "Orange": "ui.main/icon_jz-M.png",
        "Apple": "ui.main/icon_pg-M.png"
    };

    return UIManager;
}(laya.events.EventDispatcher));