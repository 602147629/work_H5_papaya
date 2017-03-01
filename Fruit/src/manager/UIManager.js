
var UIManager = (function(_super) {
    function UIManager() {
        UIManager.super(this);
        this.allRotaryFruits = null;
        this.rotaryFruitBoxList = null;
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

    UIManager.prototype.setRotaryFruitBoxList = function (boxList) {
        this.rotaryFruitBoxList = boxList;
    };

    UIManager.prototype.setFruitGlowByIndex = function (index) {
        if (typeof (index) == "number"){
            var lightFruit = this.rotaryFruitBoxList[index];
            if (lightFruit) {
                lightFruit.setFruitLighting();
            }
        }
    };

    UIManager.prototype.setFruitUnGlowByIndex = function (index) {
        if (typeof (index) == "number"){
            var lightFruit = this.rotaryFruitBoxList[index];
            if (lightFruit) {
                lightFruit.setFruitUnLight();
            }
        }
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

    UIManager.prototype.getMiddleGlowFruitIconPath = function (fruitName) {
        if (fruitName == null) {
            return;
        }

        return UIManager.ICON_MEDDLE_GLOW[fruitName];
    };

    UIManager.prototype.getBigGlowFruitIconPath = function (fruitName) {
        if (fruitName == null) {
            return;
        }

        return UIManager.ICON_BIG_GLOW[fruitName];
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

    UIManager.ICON_BIG_GLOW = {
        "GG": "assets/ui.main/icon_0007_gg_gl2.png",
        "77": "assets/ui.main/icon_0005_77_gl2.png",
        "Star": "assets/ui.main/icon_0013_xx_gl2.png",
        "Watermelon": "assets/ui.main/icon_0003_xg_gl2.png",
        "Bell": "assets/ui.main/icon_0011_ld_gl2.png",
        "Pomelo": "assets/ui.main/icon_0001_yz_gl2.png",
        "Orange": "assets/ui.main/icon_0017_jz-gl2.png",
        "Apple": "assets/ui.main/icon_0009_pg_gl2.png",
        "BlueLuck": "assets/ui.main/icon_0014_luck_gl.png",
        "GoldenLuck": "assets/ui.main/icon_0015_luck_gl2.png"
    };

    UIManager.ICON_MEDDLE_GLOW = {
        "GG": "assets/ui.main/icon_0006_gg_gl.png",
        "77": "assets/ui.main/icon_0004_77_gl.png",
        "Star": "assets/ui.main/icon_0012_xx_gl.png",
        "Watermelon": "assets/ui.main/icon_0002_xg_gl.png",
        "Bell": "assets/ui.main/icon_0010_ld_gl.png",
        "Pomelo": "assets/ui.main/icon_0000_yz_gl.png",
        "Orange": "assets/ui.main/icon_0016_jz-gl.png",
        "Apple": "assets/ui.main/icon_0008_pg_gl.png"
    };

    return UIManager;
}(laya.events.EventDispatcher));
