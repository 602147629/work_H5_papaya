
var UIManager = (function(_super) {
    function UIManager() {
        UIManager.super(this);
        this.allRotaryFruits = null;
    }

    Laya.class(UIManager, "UIManager", _super);

    UIManager.prototype.init = function(callback) {
        callback && callback();
    };

    UIManager.prototype.showMessage = function(msg) {
        var boxMessage = new BoxMessage(msg);

        var onBackOut = function() {
            Laya.stage.removeChild(boxMessage);
            boxMessage.destroy();
        };
        var onBackIn = function() {
            Laya.Tween.to(
                boxMessage,
                {x: Laya.stage.width + boxMessage.width},
                300,
                Laya.Ease["backOut"],
                Laya.Handler.create(null, onBackOut),
                1000,
                false
            );
        };

        Laya.Tween.from(
            boxMessage,
            {x: 0},
            500,
            Laya.Ease["backIn"],
            Laya.Handler.create(null, onBackIn)
        );
        Laya.stage.addChild(boxMessage);
    };

    UIManager.prototype.setAllRotaryFruits = function (allFruitList) {
        this.allRotaryFruits = allFruitList;
    };

    UIManager.prototype.getAllRotaryFruits = function () {
        return this.allRotaryFruits;
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
        "GG": "assets/ui.main/icon_gg-L.png",
        "77": "assets/ui.main/icon_77-L.png",
        "Star": "assets/ui.main/icon_xx-L.png",
        "Watermelon": "assets/ui.main/icon_xg-L.png",
        "Bell": "assets/ui.main/icon_ld-L.png",
        "Pomelo": "assets/ui.main/icon_yz-l.png",
        "Orange": "assets/ui.main/icon_jz-L.png",
        "Apple": "assets/ui.main/icon_pg-L.png",
        "BlueLuck": "assets/ui.main/icon_LUCK-blue.png",
        "GoldenLuck": "assets/ui.main/icon_LUCK-Golden.png"
    };

    UIManager.ICON_MEDDLE = {
        "GG": "assets/ui.main/icon_gg-s.png",
        "77": "assets/ui.main/icon_77-M.png",
        "Star": "assets/ui.main/icon_xx-M.png",
        "Watermelon": "assets/ui.main/icon_xg-M.png",
        "Bell": "assets/ui.main/icon_ld-M.png",
        "Pomelo": "assets/ui.main/icon_yz-M.png",
        "Orange": "assets/ui.main/icon_jz-M.png",
        "Apple": "assets/ui.main/icon_pg-M.png"
    };

    return UIManager;
}(laya.events.EventDispatcher));
