
var AssetsManager = (function(_super) {
    var loaderRes = [
        {
            url: "bg.png",
            type: Laya.Loader.IMAGE
        },

        {
            url: "ui.loader/progress.png",
            type: Laya.Loader.IMAGE
        },

        {
            url: "ui.loader/progress$bar.png",
            type: Laya.Loader.IMAGE
        },

        {
            url: "unpack.json",
            type: Laya.Loader.JSON
        }
    ];

    var preload = [
        {
            url: "res/atlas/ui.button.json",
            type: Laya.Loader.ATLAS
        },

        {
            url: "res/atlas/ui.images.json",
            type: Laya.Loader.ATLAS
        },

        {
            url: "res/atlas/ui.label.json",
            type: Laya.Loader.ATLAS
        },

        {
            url: "res/atlas/ui.main.json",
            type: Laya.Loader.ATLAS
        },

        {
            url: "res/atlas/ui.record.json",
            type: Laya.Loader.ATLAS
        },
    ];

    var preloadFonts = [
        {
            url: "res/fonts/brown.fnt"
        },

        {
            url: "res/fonts/red.fnt"
        },

        {
            url: "res/fonts/white.fnt"
        },

        {
            url: "res/fonts/yellow.fnt"
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