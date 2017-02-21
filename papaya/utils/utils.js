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
    }
}(Papaya));
