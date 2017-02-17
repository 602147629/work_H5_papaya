(function(root) {
    var Game = root.Game = function () {
        root.Emitter.call(this);

        // 玩家金币
        this.playerScore = 500;

        // 赢取的金币
        this.winScore = 0;

        // 上一局的下注信息
        this.lastBetInfo = null;

        // 每一局的记录（保存16局）,记录的是每一局最后剩下的小鱼ID
        this.recordHistory = [];

        // 局数
        this.currentGameTime = 0;

        // 鱼池
        this.fishPool = [];

        // 8条鱼分别的赌注
        this.preFishBet = [15,10,6,6,4,4,2,2];

        // 倒计时
        this.countDownTime = 15;

        // 下注金额范围
        this.betScoreRange = [0,1,10,20,50,100];
        this.betIndex = 0;
        // 下注的金币
        this.betScore = this.betScoreRange[this.betIndex];
        // 玩家选择的小鱼ID
        this.playerSelect = null;

        // 玩家选择的小鱼的赌注
        this.playerSelectBet = 0;

        // 幸存的小鱼ID
        this.surviveFish = 0;

        this.initEvent();
        this.init();
    };

    root.inherits(Game, root.Emitter);

    var __proto = Game.prototype;

    __proto.initEvent = function() {
    };

    __proto.init = function() {

    };

    // 一局的准备
    __proto.ready = function() {
        var i;
        var indexS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20];
        this.fishPool = [];
        for(i = 0 ; i < Papaya.Shark.MaxFish ; i++)
        {
            var randomIndex = Math.round(Math.random() * (indexS.length-1));
            var randomId = 1000+indexS[randomIndex];
            this.fishPool.push(randomId);
            indexS.splice(randomIndex,1);
        }
        var viewFish = this.fishPool.concat();
        root.eventManager.emit(Shark.Event.INIT_VIEW_FISH,viewFish);


        var obj = {};
        for(i = 0 ; i < this.preFishBet.length ;i++)
        {
            obj["bet"+(i+1)] = "A"+this.preFishBet[i];
        }
        this.setDataSource(obj);
        root.eventManager.emit(Shark.Event.INIT_VIEW_ANI);

    };

    // 一局的开始
    __proto.restart = function() {

        this.countDownTime = 20;
        this.winScore = 0;
        this.currentGameTime += 1;
        this.setDataSource({
            goldLab:this.playerScore,
            winReward:this.winScore,
            betCount:this.betScoreRange[this.betIndex],
            countDownLab:this.countDownTime
        });


        this.startCD();
    };

    __proto.startCD = function() {

        var self = this;

         var timeLoop= function() {
            self.countDownTime -= 1;
            var cdStr;
            if(self.countDownTime <= 0)
            {
                self.countDownTime = 0;
                cdStr = 0;
                self.timesUp();
            }
            else if(self.countDownTime < 10 && self.countDownTime > 0)
            {
                cdStr = "0"+self.countDownTime;
                self.timeOut = setTimeout(timeLoop,1000);
            }
            else
            {
                cdStr = self.countDownTime;
                self.timeOut = setTimeout(timeLoop,1000);
            }
            self.setDataSource({"countDownLab":cdStr});
        };

        this.timeOut = setTimeout(timeLoop,1000);
    };

    __proto.runNow = function() {
        clearTimeout(this.timeOut);
        this.timesUp();
    };

    __proto.timesUp = function() {
        var index = Math.round(Math.random() * (this.fishPool.length-1));

        this.surviveFish = this.fishPool[index];
        this.playerScore -= this.betScore;
        root.eventManager.emit(Shark.Event.START_ROUND,this.surviveFish);

    };

    __proto.gameEnd = function() {
        if(this.surviveFish == this.playerSelect)
        {
            this.winScore = this.betScore * this.playerSelectBet;
            this.playerScore += this.winScore;
        }

        if(this.currentGameTime > 16)
        {
            this.clearRecordHistory();
            this.currentGameTime = 1;
            this.recordHistory = [];
        }

        this.recordHistory[this.currentGameTime] = this.surviveFish;

        this.lastBetInfo = {betScore:this.betScore,select:this.playerSelect,selectBet:this.playerSelectBet};

        this.setRecordHistory();
        this.setDataSource({winReward:this.winScore});

    };

    // 下注不能大于本金，所以这里重新计算一下
    __proto.setBetScoreRange = function() {
        var maxBetScoreRange = this.betScoreRange[this.betScoreRange.length -1];
        var resultRange = [];
        if(this.playerScore >= maxBetScoreRange)
        {
            return this.betScoreRange.concat();
        }
        else
        {
            for(var index in this.betScoreRange)
            {
                var bet = this.betScoreRange[index];
                if(bet < this.playerScore)
                {
                    resultRange.push(bet);
                }
            }
        }

        return resultRange;
    };

    // 加注
    __proto.raise = function(cb) {

        var betScoreRange = this.setBetScoreRange();

        this.betIndex += 1;
        if(this.betIndex > betScoreRange.length -1)
        {
            this.betIndex = 0;
        }
        this.betScore = betScoreRange[this.betIndex];
        this.setDataSource({betCount:this.betScore});

        if(this.playerSelect != null)
        {
            this.upgradeViewGold();
        }

        if(cb)
            cb();
    };

    // 减注
    __proto.unRaise = function() {
        var betScoreRange = this.setBetScoreRange();

        this.betIndex -= 1;
        if(this.betIndex < 0)
        {
            this.betIndex = betScoreRange.length - 1;
        }
        this.betScore = betScoreRange[this.betIndex];
        this.setDataSource({betCount:this.betScore});

        if(this.playerSelect != null)
        {
            this.upgradeViewGold();
        }
    };

    // 选取
    __proto.select = function(index) {
        this.playerSelect = this.fishPool[index];
        this.playerSelectBet = this.preFishBet[index];
        this.upgradeViewGold();
    };

    __proto.clearBet = function(cb) {
        //this.betScore = 0;
        //this.setDataSource({"betCount":this.betScore});
        this.playerSelect = null;
        this.playerSelectBet = null;
        var playerScore = this.playerScore;
        this.setDataSource({goldLab:playerScore});
        if(cb)
            cb();
    };

    __proto.rebet = function(cb) {
        if(this.lastBetInfo != null)
        {
            //this.playerSelect = this.lastBetInfo.select;
            //this.playerSelectBet = this.lastBetInfo.selectBet;
            this.betScore = this.lastBetInfo.betScore;
            //var index = this.fishPool.indexOf(this.playerSelect);
            //this.lastBetInfo.index = index;
            this.setDataSource({betCount:this.betScore});
        }

        if(cb)
        {
            cb(this.lastBetInfo);
        }

    };

    // 更新界面上的金币数量，但是不会影响实际金币，实际金币只会在倒计时时间结束后才会扣取
    __proto.upgradeViewGold = function() {
        var playerScore = this.playerScore;
        var betScore = this.betScore;
        var newPlayerScore = playerScore - betScore;
        this.setDataSource({goldLab:newPlayerScore});
    };

    __proto.setDataSource = function(obj) {
        root.eventManager.emit(Shark.Event.SET_DATA_SOURCE,obj);
    };

    __proto.setRecordHistory = function() {
        root.eventManager.emit(Shark.Event.SET_RECORD_HISTORY,this.currentGameTime,this.recordHistory[this.currentGameTime]);
    };

    __proto.clearRecordHistory = function() {
        root.eventManager.emit(Shark.Event.CLEAR_RECORD_HISTORY);
    }

} (Shark));