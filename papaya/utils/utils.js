(function(root) {
    var Utils = root.Utils = {};

    //根据权重从列表中抽取礼品并且返回下标
    Utils.calcWeight = function(list) {
        //list 需要抽取的礼品列表
        //格式 [ {xxx:xx, weight: 10}, {xxx:xx, weight: 20} ]  每个object里面至少要有一个weight
        if (typeof list != "object" || !(list instanceof Array)) {
            return null;
        }

        var i;
        var row;
        var result = 0;
        var totalWeight = 0;

        for (i = 0; i < list.length; i++) {
            row = list[i];
            if (row.weight > 0) {
                totalWeight += row.weight;
            }
        }

        if (totalWeight <= 0) {
            return null;
        }

        var rand = Math.floor(Math.random() *  totalWeight);
        for (i = 0; i < list.length; i++) {
            row = list[i];
            if (rand < row.weight) {
                result = i;
                break;
            }

            rand -= row.weight;
        }

        return result;
    };

    //返回 min~max之间的一个数 不包含max 如果需要包含最大值 可在调用的时候max为你需要的最大值+1
    Utils.range_value = function(min, max) {
        return Math.floor(Math.random()*(max-min) + min);
    };

    //返回 0~max之间的一个数 不包含max
    Utils.random_number = function(max) {
        return Utils.range_value(0, max);
    };
}(Papaya));