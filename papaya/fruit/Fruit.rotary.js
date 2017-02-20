(function(root) {
    var Rotary = root.Rotary = function() {

    };

    Rotary.ROTARY_FRUITS = [
        {fruitName: "Apple", multiple:1, weight: 1750},
        {fruitName: "Bell", multiple:3, weight: 1000},
        {fruitName: "Orange", multiple:1, weight: 500},
        {fruitName: "Bell", multiple:1, weight: 500},
        {fruitName: "GG", multiple: 50, weight: 2},
        {fruitName: "GG", multiple: 100, weight: 4},
        {fruitName: "Apple", multiple:1, weight: 1750},
        {fruitName: "Apple", multiple:3, weight: 1000},
        {fruitName: "Pomelo", multiple:1, weight: 500},
        {fruitName: "Watermelon", multiple:1, weight: 700},
        {fruitName: "Watermelon", multiple:3, weight: 1000},
        {fruitName: "BlueLuck", multiple:1, weight: 350},
        {fruitName: "Apple", multiple:1, weight: 1750},
        {fruitName: "Orange", multiple:3, weight: 1000},
        {fruitName: "Orange", multiple:1, weight: 500},
        {fruitName: "Bell", multiple:1, weight: 500},
        {fruitName: "77", multiple:3, weight: 1000},
        {fruitName: "77", multiple:1, weight: 700},
        {fruitName: "Apple", multiple:1, weight: 1750},
        {fruitName: "Pomelo", multiple:3, weight: 1000},
        {fruitName: "Pomelo", multiple:1, weight: 500},
        {fruitName: "Star", multiple:1, weight: 700},
        {fruitName: "Star", multiple:3, weight: 1000},
        {fruitName: "GoldenLuck", multiple:1, weight: 350}
    ];

    //*大三元
    Rotary.BIG_TRIPLE = [
        {fruitName: "Bell", multiple:1, weight: 500},
        {fruitName: "Pomelo", multiple:1, weight: 500},
        {fruitName: "Orange", multiple:1, weight: 500}
    ];

    //*小三元
    Rotary.SMALL_TRIPLE = [
        {fruitName: "Watermelon", multiple:1, weight: 700},
        {fruitName: "Star", multiple:1, weight: 700},
        {fruitName: "77", multiple:1, weight: 700}
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

    //*luck
    Rotary.LUCK_NAME_LIST = ["GoldenLuck", "BlueLuck"];

    //*特殊类型
    Rotary.SPECIAL_TYPE_NAME_LIST = {
        BIG_TRIPLE: "BIG_TRIPLE",
        SMALL_TRIPLE: "SMALL_TRIPLE",
        QUADRUPLE: "QUADRUPLE"
    };
} (Papaya.Fruit));
