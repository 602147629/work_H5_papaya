
var AssetsManager = (function(_super) {
    var loaderRes = [
        {
            url: "assets/bg.png",
            type: Laya.Loader.IMAGE
        },

        {
            url: "assets/ui.loader/progress.png",
            type: Laya.Loader.IMAGE
        },

        {
            url: "assets/ui.loader/progress$bar.png",
            type: Laya.Loader.IMAGE
        },

        {
            url: "unpack.json",
            type: Laya.Loader.JSON
        }
    ];

    var preload = [
        {
            url: "assets/atlas/assets/ui.button.json",
            type: Laya.Loader.ATLAS
        },

        {
            url: "assets/atlas/assets/ui.images.json",
            type: Laya.Loader.ATLAS
        },

        {
            url: "assets/atlas/assets/ui.label.json",
            type: Laya.Loader.ATLAS
        },

        {
            url: "assets/atlas/assets/ui.main.json",
            type: Laya.Loader.ATLAS
        },

        {
            url: "assets/atlas/assets/ui.record.json",
            type: Laya.Loader.ATLAS
        },
    ];

    var preloadFonts = [
        {
            url: "assets/fonts/brown.fnt"
        },

        {
            url: "assets/fonts/red.fnt"
        },

        {
            url: "assets/fonts/white.fnt"
        },

        {
            url: "assets/fonts/yellow.fnt"
        }
    ];

    function AssetsManager() {
        AssetsManager.super(this);
    }

    Laya.class(AssetsManager, "AssetsManager", _super);

    AssetsManager.prototype.getLoaderRes = function() {
        return loaderRes;
    };

    AssetsManager.prototype.getPreload = function() {
        var unpack = Laya.loader.getRes("unpack.json");
        if (unpack != null) {
            for (var i = 0, size = unpack.length; i < size; i++) {
                preload.push({
                    url: unpack[i],
                    type: Laya.Loader.IMAGE
                })
            }
        }

        return preload;
    };

    AssetsManager.prototype.getFonts = function() {
        return preloadFonts;
    };

    return AssetsManager;
}(laya.events.EventDispatcher));
