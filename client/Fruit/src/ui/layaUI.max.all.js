var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var FruitBoxUI=(function(_super){
		function FruitBoxUI(){
			
		    this.bigIcon=null;
		    this.numLab=null;
		    this.middleIcon=null;

			FruitBoxUI.__super.call(this);
		}

		CLASS$(FruitBoxUI,'ui.Boxs.FruitBoxUI',_super);
		var __proto__=FruitBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FruitBoxUI.uiView);
		}

		STATICATTR$(FruitBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":90,"height":88},"child":[{"type":"Image","props":{"y":44,"x":45,"var":"bigIcon","skin":"assets/ui.main/icon_77-L.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":3,"width":83,"var":"numLab","text":"000000","height":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":30,"x":45,"var":"middleIcon","skin":"assets/ui.main/icon_77-M.png","anchorY":0.5,"anchorX":0.5}}]};}
		]);
		return FruitBoxUI;
	})(View);
var FruitLightBoxUI=(function(_super){
		function FruitLightBoxUI(){
			
		    this.bottomPanel=null;
		    this.middle=null;
		    this.highLight=null;

			FruitLightBoxUI.__super.call(this);
		}

		CLASS$(FruitLightBoxUI,'ui.Boxs.FruitLightBoxUI',_super);
		var __proto__=FruitLightBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FruitLightBoxUI.uiView);
		}

		STATICATTR$(FruitLightBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":90,"height":88},"child":[{"type":"Image","props":{"y":-16,"x":-16,"width":121,"var":"bottomPanel","skin":"assets/ui.images/img_light_02.png","height":120}},{"type":"Image","props":{"y":-14,"x":-15,"width":121,"var":"middle","skin":"assets/ui.images/img_light_02.png","height":120}},{"type":"Image","props":{"y":-16,"x":-17,"width":123,"var":"highLight","skin":"assets/ui.images/img_light_01.png","height":119}}]};}
		]);
		return FruitLightBoxUI;
	})(View);
var FruitRecordBoxUI=(function(_super){
		function FruitRecordBoxUI(){
			
		    this.bigIcon=null;
		    this.numLab=null;
		    this.middleIcon=null;

			FruitRecordBoxUI.__super.call(this);
		}

		CLASS$(FruitRecordBoxUI,'ui.Boxs.FruitRecordBoxUI',_super);
		var __proto__=FruitRecordBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FruitRecordBoxUI.uiView);
		}

		STATICATTR$(FruitRecordBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":90,"height":88},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"assets/ui.images/img_0002.png"}},{"type":"Image","props":{"y":44,"x":45,"var":"bigIcon","skin":"assets/ui.main/icon_77-L.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":3,"width":83,"var":"numLab","text":"000000","height":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":30,"x":45,"var":"middleIcon","skin":"assets/ui.main/icon_77-M.png","anchorY":0.5,"anchorX":0.5}}]};}
		]);
		return FruitRecordBoxUI;
	})(View);
var MultipleLightBoxUI=(function(_super){
		function MultipleLightBoxUI(){
			

			MultipleLightBoxUI.__super.call(this);
		}

		CLASS$(MultipleLightBoxUI,'ui.Boxs.MultipleLightBoxUI',_super);
		var __proto__=MultipleLightBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MultipleLightBoxUI.uiView);
		}

		STATICATTR$(MultipleLightBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":97,"height":55},"child":[{"type":"Image","props":{"y":-4,"x":-4,"skin":"assets/ui.images/img_0022.png"}}]};}
		]);
		return MultipleLightBoxUI;
	})(View);
var FruitMainViewUI=(function(_super){
		function FruitMainViewUI(){
			
		    this.settingBtn=null;
		    this.billsBtn=null;
		    this.rankingBtn=null;
		    this.recordListBox=null;
		    this.creditLab=null;
		    this.addCreditBtn=null;
		    this.promptLab=null;
		    this.fruitBgBox=null;
		    this.betAddDoubleBtn=null;
		    this.betCutDoubleBtn=null;
		    this.lowNumBtn=null;
		    this.highNumBtn=null;
		    this.bonusWinLab=null;
		    this.guessNumZeroLab=null;
		    this.guessNumLab=null;
		    this.guessBtnGrayLayer=null;
		    this.middleBtnBox=null;
		    this.goBtn=null;
		    this.allAddBtn=null;
		    this.goBtnGrayLayer=null;
		    this.betAddBtn=null;
		    this.betLab=null;
		    this.totalBetLab=null;
		    this.fruitBtnBox=null;
		    this.multipleBox=null;
		    this.apple_multiple=null;
		    this.stakesNumBox=null;
		    this.fruitBtnGrayLayer=null;
		    this.betBtnGaryLayer=null;
		    this.allAddBtnGaryLayer=null;
		    this.zeroLabBox=null;

			FruitMainViewUI.__super.call(this);
		}

		CLASS$(FruitMainViewUI,'ui.Views.FruitMainViewUI',_super);
		var __proto__=FruitMainViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FruitMainViewUI.uiView);
		}

		STATICATTR$(FruitMainViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"assets/bg.png"}},{"type":"Image","props":{"y":3,"x":137,"width":1032,"skin":"assets/bg_hd1.png","height":720}},{"type":"Image","props":{"y":-5.329070518200751e-15,"x":130.99999999999997,"skin":"assets/ui.images/img_ft.png"}},{"type":"Image","props":{"y":1.0000000000000122,"x":1106.9999999999998,"skin":"assets/ui.images/img_ft.png"}},{"type":"Box","props":{"y":69,"x":1151,"name":"right_btn_box"},"child":[{"type":"Button","props":{"y":0,"x":-7,"var":"settingBtn","stateNum":"2","skin":"assets/ui.button/btn_006.png"},"child":[{"type":"Image","props":{"y":15,"x":25,"skin":"assets/ui.label/img_sz.png"}}]},{"type":"Button","props":{"y":73,"x":-7,"var":"billsBtn","stateNum":"2","skin":"assets/ui.button/btn_006.png"},"child":[{"type":"Image","props":{"y":15,"x":23,"skin":"assets/ui.label/img_zd.png"}}]},{"type":"Button","props":{"y":142,"x":-7,"var":"rankingBtn","stateNum":"2","skin":"assets/ui.button/btn_006.png"},"child":[{"type":"Image","props":{"y":14,"x":6,"skin":"assets/ui.label/img_phb.png"}}]}]},{"type":"Box","props":{"y":2,"x":3,"width":137,"height":721},"child":[{"type":"Button","props":{"y":0,"x":0,"stateNum":"1","skin":"assets/ui.record/img_Record.png"}},{"type":"Image","props":{"y":58,"x":0,"width":134,"skin":"assets/ui.record/img_Record bg.png","sizeGrid":"10,10,10,10","height":655}},{"type":"Box","props":{"y":65,"x":21,"width":90,"var":"recordListBox","height":644}}]},{"type":"Box","props":{"y":1,"x":167},"child":[{"type":"Image","props":{"y":0,"x":0,"width":939,"skin":"assets/ui.images/img_0023.png","sizeGrid":"10,10,10,10","height":62}},{"type":"Image","props":{"y":16,"x":534,"width":111.8,"skin":"assets/ui.label/img_CREDIT.png","height":32.5}},{"type":"Image","props":{"y":8,"x":652,"width":250,"skin":"assets/ui.images/img_0027.png","sizeGrid":"10,10,10,10","height":45}},{"type":"Label","props":{"y":17,"x":661,"width":205,"var":"creditLab","text":"000000000","height":39,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":7,"x":855,"var":"addCreditBtn","stateNum":"1","skin":"assets/ui.button/btn_007.png"},"child":[{"type":"Image","props":{"y":7,"x":8,"skin":"assets/ui.images/img_+.png"}}]}]},{"type":"Box","props":{"y":63,"x":168,"width":947,"height":380},"child":[{"type":"Image","props":{"y":1,"x":0,"skin":"assets/ui.images/img_0024.png","sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":103,"x":103,"skin":"assets/ui.images/bg_jackpot.png"},"child":[{"type":"Image","props":{"y":97,"x":3,"skin":"assets/ui.images/img_JackPot3.png"}},{"type":"Image","props":{"y":-6,"x":-6,"skin":"assets/ui.images/img_JackPot4.png"}},{"type":"Label","props":{"y":118,"x":85,"width":640,"visible":false,"var":"promptLab","height":50,"fontSize":45,"font":"Arial","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":10,"x":9,"var":"fruitBgBox"},"child":[{"type":"Image","props":{"y":0,"x":3,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_0"}},{"type":"Image","props":{"y":0,"x":95,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_1"}},{"type":"Image","props":{"y":0,"x":187,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_2"}},{"type":"Image","props":{"y":0,"x":279,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_3"}},{"type":"Image","props":{"y":0,"x":371,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_4"}},{"type":"Image","props":{"y":0,"x":463,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_5"}},{"type":"Image","props":{"y":0,"x":555,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_6"}},{"type":"Image","props":{"y":0,"x":647,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_7"}},{"type":"Image","props":{"y":0,"x":739,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_8"}},{"type":"Image","props":{"y":0,"x":831,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_9"}},{"type":"Image","props":{"y":92,"x":831,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_10"}},{"type":"Image","props":{"y":183,"x":831,"skin":"assets/ui.images/img_0005.png","name":"fruitBg_11"}},{"type":"Image","props":{"y":275,"x":831,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_12"}},{"type":"Image","props":{"y":275.00000000000006,"x":739,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_13"}},{"type":"Image","props":{"y":275.00000000000006,"x":647,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_14"}},{"type":"Image","props":{"y":275.00000000000006,"x":555,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_15"}},{"type":"Image","props":{"y":275.00000000000006,"x":463,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_16"}},{"type":"Image","props":{"y":275.00000000000006,"x":371,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_17"}},{"type":"Image","props":{"y":275.00000000000006,"x":279,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_18"}},{"type":"Image","props":{"y":275.00000000000006,"x":187,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_19"}},{"type":"Image","props":{"y":275.00000000000006,"x":95,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_20"}},{"type":"Image","props":{"y":275,"x":3,"skin":"assets/ui.images/img_0003.png","name":"fruitBg_21"}},{"type":"Image","props":{"y":183,"x":3,"skin":"assets/ui.images/img_0002.png","name":"fruitBg_22"}},{"type":"Image","props":{"y":92,"x":3,"skin":"assets/ui.images/img_0004.png","name":"fruitBg_23"}}]},{"type":"Button","props":{"y":157.5,"x":304,"var":"betAddDoubleBtn","stateNum":"2","skin":"assets/ui.button/btn_004.png","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":157.5,"x":633,"var":"betCutDoubleBtn","stateNum":"2","skin":"assets/ui.button/btn_004.png","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":202,"x":293,"var":"lowNumBtn","stateNum":"2","skin":"assets/ui.button/btn_003.png"},"child":[{"type":"Image","props":{"y":20,"x":20,"skin":"assets/ui.label/img_0004.png"}}]},{"type":"Button","props":{"y":202,"x":550,"var":"highNumBtn","stateNum":"2","skin":"assets/ui.button/btn_003.png"},"child":[{"type":"Image","props":{"y":17,"x":12,"skin":"assets/ui.label/img_0007.png"}}]},{"type":"Image","props":{"y":204,"x":432,"width":82,"skin":"assets/ui.images/img_0001.png","height":69}},{"type":"Image","props":{"y":154,"x":470,"skin":"assets/ui.images/img_BONUS-WIN.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":160,"x":373,"width":194,"var":"bonusWinLab","text":"0000000000","height":39,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":218,"x":430,"width":78,"var":"guessNumZeroLab","text":"000","scaleY":1.2,"scaleX":1.2,"height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":213.00000000000006,"x":416.0000000000001,"wordWrap":false,"width":78,"var":"guessNumLab","text":"000","scaleY":1.2,"scaleX":1.2,"height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":99,"x":99,"var":"guessBtnGrayLayer","skin":"assets/ui.images/img_mc2.png"}}]},{"type":"Box","props":{"y":630,"x":169,"var":"middleBtnBox"},"child":[{"type":"Image","props":{"skin":"assets/ui.images/img_0025.png","sizeGrid":"10,10,10,10"}},{"type":"Button","props":{"y":8,"x":775,"var":"goBtn","stateNum":"2","skin":"assets/ui.button/btn_001.png"},"child":[{"type":"Image","props":{"y":15,"x":36,"skin":"assets/ui.label/img_GO.png"}},{"type":"Image","props":{"y":14,"x":35,"visible":false,"skin":"assets/ui.label/img_goh.png"}}]},{"type":"Button","props":{"y":8,"x":647,"var":"allAddBtn","stateNum":"2","skin":"assets/ui.button/btn_002.png"},"child":[{"type":"Image","props":{"y":16,"x":9,"skin":"assets/ui.label/img_ALL+1.png"}}]},{"type":"Image","props":{"y":6,"x":770,"var":"goBtnGrayLayer","skin":"assets/ui.images/img_mc3.png"}},{"type":"Button","props":{"y":8,"x":11,"var":"betAddBtn","stateNum":"2","skin":"assets/ui.button/btn_002.png"},"child":[{"type":"Image","props":{"y":18,"x":28,"skin":"assets/ui.label/img_bet.png"}}]},{"type":"Image","props":{"y":23,"x":151,"width":129,"skin":"assets/ui.images/img_0027.png","sizeGrid":"10,10,10,10","height":45}},{"type":"Label","props":{"y":30,"x":154,"width":122,"var":"betLab","text":"00000","height":39,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":5,"x":336,"skin":"assets/ui.images/img_Total.png"},"child":[{"type":"Label","props":{"y":48,"x":8,"width":246,"var":"totalBetLab","text":"0000000","height":33,"fontSize":30,"color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":443,"x":169,"width":942,"name":"bet_box","height":189},"child":[{"type":"Image","props":{"y":0,"x":0,"width":938,"visible":false,"skin":"assets/ui.images/img_0026.png","sizeGrid":"10,10,10,10","height":190}},{"type":"Box","props":{"y":99,"x":-1,"width":924,"var":"fruitBtnBox","height":85},"child":[{"type":"Button","props":{"y":5,"x":15,"stateNum":"2","skin":"assets/ui.button/btn_005.png","name":"GGBtn"},"child":[{"type":"Image","props":{"y":17,"x":14,"skin":"assets/ui.main/icon_gg-s.png"}}]},{"type":"Button","props":{"y":5,"x":135,"stateNum":"2","skin":"assets/ui.button/btn_005.png","name":"77Btn"},"child":[{"type":"Image","props":{"y":13,"x":25,"skin":"assets/ui.main/icon_77-s.png"}}]},{"type":"Button","props":{"y":5,"x":252,"stateNum":"2","skin":"assets/ui.button/btn_005.png","name":"StarBtn"},"child":[{"type":"Image","props":{"y":13,"x":24,"skin":"assets/ui.main/icon_xx-s.png"}}]},{"type":"Button","props":{"y":5,"x":369,"stateNum":"2","skin":"assets/ui.button/btn_005.png","name":"WatermelonBtn"},"child":[{"type":"Image","props":{"y":14,"x":23,"skin":"assets/ui.main/icon_xg-s.png"}}]},{"type":"Button","props":{"y":5,"x":490,"stateNum":"2","skin":"assets/ui.button/btn_005.png","name":"BellBtn"},"child":[{"type":"Image","props":{"y":14,"x":22,"skin":"assets/ui.main/icon_ld-s.png"}}]},{"type":"Button","props":{"y":5,"x":608,"stateNum":"2","skin":"assets/ui.button/btn_005.png","name":"PomeloBtn"},"child":[{"type":"Image","props":{"y":18,"x":21,"skin":"assets/ui.main/icon_yz-s.png"}}]},{"type":"Button","props":{"y":5,"x":721,"stateNum":"2","skin":"assets/ui.button/btn_005.png","name":"OrangeBtn"},"child":[{"type":"Image","props":{"y":11,"x":25,"skin":"assets/ui.main/icon_jz-s.png"}}]},{"type":"Button","props":{"y":5,"x":835,"stateNum":"2","skin":"assets/ui.button/btn_005.png","name":"AppleBtn"},"child":[{"type":"Image","props":{"y":10,"x":26,"skin":"assets/ui.main/icon_pg-s.png"}}]}]},{"type":"Box","props":{"y":-1,"x":0,"width":923,"var":"multipleBox","height":63},"child":[{"type":"Image","props":{"y":9,"x":24,"skin":"assets/ui.images/img_0020.png","name":"gg_multiple"},"child":[{"type":"Image","props":{"y":3,"x":6,"skin":"assets/ui.label/img_0019.png"}}]},{"type":"Image","props":{"y":9,"x":842,"var":"apple_multiple","skin":"assets/ui.images/img_0020.png"},"child":[{"type":"Image","props":{"y":3,"x":24,"skin":"assets/ui.label/img_0006.png"}}]},{"type":"Image","props":{"y":9,"x":142,"skin":"assets/ui.images/img_0021.png","name":"high_40_multiple"},"child":[{"type":"Image","props":{"y":10,"x":21,"skin":"assets/ui.label/img_0017.png","name":"unGlowNum"}},{"type":"Image","props":{"y":3,"x":14,"skin":"assets/ui.label/img_0018.png","name":"glowNum"}}]},{"type":"Image","props":{"y":9,"x":260,"skin":"assets/ui.images/img_0021.png","name":"high_30_multiple"},"child":[{"type":"Image","props":{"y":9,"x":23,"skin":"assets/ui.label/img_0015.png","name":"unGlowNum"}},{"type":"Image","props":{"y":3,"x":16,"skin":"assets/ui.label/img_0016.png","name":"glowNum"}}]},{"type":"Image","props":{"y":9,"x":377,"skin":"assets/ui.images/img_0021.png","name":"high_20_multiple"},"child":[{"type":"Image","props":{"y":9,"x":23,"skin":"assets/ui.label/img_0013.png","name":"unGlowNum"}},{"type":"Image","props":{"y":3,"x":16,"skin":"assets/ui.label/img_0014.png","name":"glowNum"}}]},{"type":"Image","props":{"y":9,"x":497,"skin":"assets/ui.images/img_0021.png","name":"low_20_multiple"},"child":[{"type":"Image","props":{"y":9,"x":23,"skin":"assets/ui.label/img_0013.png","name":"unGlowNum"}},{"type":"Image","props":{"y":3,"x":15,"skin":"assets/ui.label/img_0014.png","name":"glowNum"}}]},{"type":"Image","props":{"y":9,"x":615,"skin":"assets/ui.images/img_0021.png","name":"low_15_multiple"},"child":[{"type":"Image","props":{"y":9,"x":23,"skin":"assets/ui.label/img_0011.png","name":"unGlowNum"}},{"type":"Image","props":{"y":3,"x":16,"skin":"assets/ui.label/img_0012.png","name":"glowNum"}}]},{"type":"Image","props":{"y":9,"x":730,"skin":"assets/ui.images/img_0021.png","name":"low_10_multiple"},"child":[{"type":"Image","props":{"y":9,"x":23,"skin":"assets/ui.label/img_0009.png","name":"unGlowNum"}},{"type":"Image","props":{"y":3,"x":15,"skin":"assets/ui.label/img_0010.png","name":"glowNum"}}]}]},{"type":"Box","props":{"y":50,"x":11,"var":"stakesNumBox"},"child":[{"type":"Image","props":{"y":-1,"x":11,"skin":"assets/ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":129,"skin":"assets/ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":248,"skin":"assets/ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":366,"skin":"assets/ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":484,"skin":"assets/ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":603,"skin":"assets/ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":720,"skin":"assets/ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":830,"skin":"assets/ui.images/img_0001.png"}}]},{"type":"Image","props":{"y":101,"x":12,"var":"fruitBtnGrayLayer","skin":"assets/ui.images/img_mc4.png","mouseThrough":true},"child":[{"type":"Image","props":{"y":93,"x":-5,"var":"betBtnGaryLayer","skin":"assets/ui.images/img_mc1.png"}},{"type":"Image","props":{"y":92,"x":630,"var":"allAddBtnGaryLayer","skin":"assets/ui.images/img_mc1.png"}}]}]},{"type":"Box","props":{"y":345,"x":163,"width":919,"var":"zeroLabBox","height":200},"child":[{"type":"Label","props":{"y":157,"x":30,"width":78,"text":"000","name":"zeroLab_0","height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":158,"x":149,"width":78,"text":"000","name":"zeroLab_1","height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":157,"x":267,"width":78,"text":"000","name":"zeroLab_2","height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":157,"x":384,"width":78,"text":"000","name":"zeroLab_3","height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":157,"x":504,"width":78,"text":"000","name":"zeroLab_4","height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":157,"x":622,"width":78,"text":"000","name":"zeroLab_5","height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":157,"x":739,"width":78,"text":"000","name":"zeroLab_6","height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":157,"x":849,"width":78,"text":"000","name":"zeroLab_7","height":42,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":153,"x":20,"width":78,"text":"000","name":"GGBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":153,"x":139,"width":78,"text":"000","name":"77BetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":153,"x":257,"width":78,"text":"000","name":"StarBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":153,"x":374,"width":78,"text":"000","name":"WatermelonBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":153,"x":495,"width":78,"text":"000","name":"BellBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":153,"x":612,"width":78,"text":"000","name":"PomeloBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":153,"x":726,"width":78,"text":"000","name":"OrangeBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":153,"x":838,"width":78,"text":"000","name":"AppleBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}}]}]};}
		]);
		return FruitMainViewUI;
	})(View);
var LoaderViewUI=(function(_super){
		function LoaderViewUI(){
			
		    this.progress=null;
		    this.percent=null;
		    this.message=null;

			LoaderViewUI.__super.call(this);
		}

		CLASS$(LoaderViewUI,'ui.Views.LoaderViewUI',_super);
		var __proto__=LoaderViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoaderViewUI.uiView);
		}

		STATICATTR$(LoaderViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"skin":"assets/bg.png"}},{"type":"ProgressBar","props":{"y":668,"x":217,"width":900,"var":"progress","skin":"assets/ui.loader/progress.png","sizeGrid":"20,20,20,20"}},{"type":"Label","props":{"y":624,"x":754,"var":"percent","text":"0%","fontSize":40,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"y":614,"x":502,"var":"message","fontSize":50,"font":"Arial","color":"#ffffff","bold":true}},{"type":"Image","props":{"y":632,"x":460,"width":266,"skin":"assets/ui.loader/img_loading.png","height":29}}]};}
		]);
		return LoaderViewUI;
	})(View);