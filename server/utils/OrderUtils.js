
var OrderUtils = module.exports = {};

OrderUtils.makeShortOrderID = function(orderID, sdk) {
    var shortID = orderID;
    switch (sdk) {
        //移动16位
        case 'cmcc':
            shortID = shortuuid16(orderID);
            break;
        //联通24位
        case 'cucc':
            shortID = shortuuid24(orderID);
            break;
        //32位
        default:
            shortID = shortuuid32(orderID);
            break;
    }

    return shortID;
};

var chars = [
    "a", "b", "c", "d", "e", "f",
    "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5","6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"
];

var shortuuid16 = function(orderID) {
    var shortID = '';
    var longID = orderID.toString().replace(/-/g, '');

    for (var i = 0; i < 16; i++)
    {
        var str = longID.substring(i * 2, i * 2 + 2);
        var x = parseInt(str, 16);

        shortID += chars[x % 0x3E];
    }

    return shortID;
};

var shortuuid24 = function(orderID) {
    var shortID = '';
    var longID = orderID.toString().replace(/-/g, '');

    for (var i = 0; i < 16; i++) {
        var str = longID.substring(i * 2, i * 2 + 2);
        var x = parseInt(str, 16);

        shortID += chars[x % 0x3E];
    }

    for (var i = 0; i < 8; i++) {
        var str = longID.substring(i * 4, i * 4 + 4);
        var x = parseInt(str, 16);

        shortID += chars[x % 0x3E];
    }

    return shortID;
};

var shortuuid32 = function(orderID) {
    return orderID.toString().replace(/-/g, '');
};
