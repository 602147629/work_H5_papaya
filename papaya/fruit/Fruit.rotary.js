(function(root) {
    var Rotary = root.Rotary = function() {

    };

    Rotary.ROTARY_FRUITS = [
        {id:1001, fruitName: "Apple", multiple:1, weight: 1750},
        {id:1002, fruitName: "Bell", multiple:3, weight: 1000},
        {id:1003, fruitName: "Orange", multiple:1, weight: 500},
        {id:1004, fruitName: "Bell", multiple:1, weight: 500},
        {id:1005, fruitName: "GG", multiple: 50, weight: 2},
        {id:1006, fruitName: "GG", multiple: 100, weight: 4},
        {id:1007, fruitName: "Apple", multiple:1, weight: 1750},
        {id:1008, fruitName: "Apple", multiple:3, weight: 1000},
        {id:1009, fruitName: "Pomelo", multiple:1, weight: 500},
        {id:1010, fruitName: "Watermelon", multiple:1, weight: 700},
        {id:1011, fruitName: "Watermelon", multiple:3, weight: 1000},
        {id:1012, fruitName: "BlueLuck", multiple:1, weight: 350},
        {id:1013, fruitName: "Apple", multiple:1, weight: 1750},
        {id:1014, fruitName: "Orange", multiple:3, weight: 1000},
        {id:1015, fruitName: "Orange", multiple:1, weight: 500},
        {id:1016, fruitName: "Bell", multiple:1, weight: 500},
        {id:1017, fruitName: "77", multiple:3, weight: 1000},
        {id:1018, fruitName: "77", multiple:1, weight: 700},
        {id:1019, fruitName: "Apple", multiple:1, weight: 1750},
        {id:1020, fruitName: "Pomelo", multiple:3, weight: 1000},
        {id:1021, fruitName: "Pomelo", multiple:1, weight: 500},
        {id:1022, fruitName: "Star", multiple:1, weight: 700},
        {id:1023, fruitName: "Star", multiple:3, weight: 1000},
        {id:1024, fruitName: "GoldenLuck", multiple:1, weight: 350}
    ];

    //*大三元
    Rotary.BIG_TRIPLE = [
        {fruitName: "Watermelon", multiple:1, weight: 700},
        {fruitName: "Star", multiple:1, weight: 700},
        {fruitName: "77", multiple:1, weight: 700}
    ];

    //*小三元
    Rotary.SMALL_TRIPLE = [
        {fruitName: "Bell", multiple:1, weight: 500},
        {fruitName: "Pomelo", multiple:1, weight: 500},
        {fruitName: "Orange", multiple:1, weight: 500}
    ];

    //*大四喜
    Rotary.QUADRUPLE = {fruitName: "Apple", multiple:1, weight: 1750};

    //*随机倍率区
    Rotary.RANDOM_MULTIPLE_LOW = [10, 15, 20];
    Rotary.RANDOM_MULTIPLE_HIGH = [20, 30, 40];

    //*大三元，小三元，大四喜出现的概率
    Rotary.PROBABILITY_BIG_TRIPLE = 3;
    Rotary.PROBABILITY_SMALL_TRIPLE = 5;
    Rotary.PROBABILITY_QUADRUPLE = 5;

    //*开始，结束送灯的概率
    Rotary.PROBABILITY_GIVE_LIGHT_START = 1;
    Rotary.PROBABILITY_GIVE_LIGHT_END = 5;

    //*苹果的赔率
    Rotary.MULTIPLE_BY_APPLE = 5;

    //*luck
    Rotary.LUCK_NAME_LIST = ["GoldenLuck", "BlueLuck"];

    //*特殊类型
    Rotary.SPECIAL_TYPE_NAME_LIST = {
        BIG_TRIPLE: "BIG_TRIPLE",
        SMALL_TRIPLE: "SMALL_TRIPLE",
        QUADRUPLE: "QUADRUPLE"
    };

    Rotary.FRUIT_NAME_LIST = [
        "GG",
        "77",
        "Star",
        "Watermelon",
        "Bell",
        "Pomelo",
        "Orange",
        "Apple"
    ];
} (Papaya.Fruit));
