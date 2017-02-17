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
		['uiView',function(){return this.uiView={"type":"View","props":{"width":90,"height":88},"child":[{"type":"Image","props":{"y":44,"x":45,"var":"bigIcon","skin":"ui.main/icon_77-L.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":3,"width":83,"var":"numLab","text":"000000","height":22,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":30,"x":45,"var":"middleIcon","skin":"ui.main/icon_77-M.png","anchorY":0.5,"anchorX":0.5}}]};}
		]);
		return FruitBoxUI;
	})(View);
var FruitMainViewUI=(function(_super){
		function FruitMainViewUI(){
			
		    this.settingBtn=null;
		    this.billsBtn=null;
		    this.rankingBtn=null;
		    this.bonusWinLab=null;
		    this.betLab=null;
		    this.creditLab=null;
		    this.fruitBgBox=null;
		    this.middleBtnBox=null;
		    this.allAddBtn=null;
		    this.fruitBtnBox=null;
		    this.apple_multiple=null;
		    this.stakesNumBox=null;
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
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"bg.png"}},{"type":"Image","props":{"y":3,"x":137,"width":1032,"skin":"bg_hd1.png","height":720}},{"type":"Image","props":{"y":-5.329070518200751e-15,"x":130.99999999999997,"skin":"ui.images/img_ft.png"}},{"type":"Image","props":{"y":1.0000000000000122,"x":1106.9999999999998,"skin":"ui.images/img_ft.png"}},{"type":"Box","props":{"y":69,"x":1151,"name":"right_btn_box"},"child":[{"type":"Button","props":{"y":0,"x":-7,"var":"settingBtn","stateNum":"2","skin":"ui.button/btn_006.png"},"child":[{"type":"Image","props":{"y":15,"x":25,"skin":"ui.label/img_sz.png"}}]},{"type":"Button","props":{"y":73,"x":-7,"var":"billsBtn","stateNum":"2","skin":"ui.button/btn_006.png"},"child":[{"type":"Image","props":{"y":15,"x":23,"skin":"ui.label/img_zd.png"}}]},{"type":"Button","props":{"y":142,"x":-7,"var":"rankingBtn","stateNum":"2","skin":"ui.button/btn_006.png"},"child":[{"type":"Image","props":{"y":14,"x":6,"skin":"ui.label/img_phb.png"}}]}]},{"type":"Box","props":{"y":2,"x":3,"width":137,"height":689},"child":[{"type":"Button","props":{"y":0,"x":0,"stateNum":"1","skin":"ui.record/img_Record.png"}},{"type":"Image","props":{"y":58,"x":0,"width":134,"skin":"ui.record/img_Record bg.png","sizeGrid":"10,10,10,10","height":655}}]},{"type":"Box","props":{"y":1,"x":167},"child":[{"type":"Image","props":{"y":0,"x":0,"width":939,"skin":"ui.images/img_0023.png","sizeGrid":"10,10,10,10","height":62}},{"type":"Image","props":{"y":8,"x":21,"skin":"ui.label/img_BONUS-WIN.png"}},{"type":"Image","props":{"y":20,"x":327,"skin":"ui.label/img_bet.png"}},{"type":"Image","props":{"y":19,"x":846,"skin":"ui.label/img_CREDIT.png"}},{"type":"Button","props":{"y":5,"x":387,"stateNum":"1","skin":"ui.button/btn_007.png"},"child":[{"type":"Image","props":{"y":18,"x":9,"skin":"ui.images/img_-.png"}}]},{"type":"Button","props":{"y":6,"x":572,"stateNum":"1","skin":"ui.button/btn_007.png"},"child":[{"type":"Image","props":{"y":8,"x":8,"skin":"ui.images/img_+.png"}}]},{"type":"Image","props":{"y":9,"x":114,"skin":"ui.images/img_0027.png","sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":8,"x":437,"width":129,"skin":"ui.images/img_0027.png","sizeGrid":"10,10,10,10","height":45}},{"type":"Image","props":{"y":8,"x":627,"width":217,"skin":"ui.images/img_0027.png","sizeGrid":"10,10,10,10","height":45}},{"type":"Label","props":{"y":15,"x":116,"width":186,"var":"bonusWinLab","text":"0000000000","height":39,"fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":15,"x":438,"width":122,"var":"betLab","text":"00000","height":39,"fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":15,"x":629,"width":205,"var":"creditLab","text":"000000000","height":39,"fontSize":30,"color":"#ffffff","align":"right"}}]},{"type":"Box","props":{"y":63,"x":168,"width":947,"height":380},"child":[{"type":"Image","props":{"y":1,"x":0,"skin":"ui.images/img_0024.png","sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":103,"x":103,"skin":"ui.images/bg_jackpot.png"},"child":[{"type":"Image","props":{"y":-6,"x":-6,"skin":"ui.images/img_JackPot4.png"}},{"type":"Image","props":{"y":27,"x":154,"skin":"ui.images/icon_Gold.png"}},{"type":"Image","props":{"y":34,"x":243,"skin":"ui.images/img_JackPot.png"}}]},{"type":"Box","props":{"y":10,"x":9,"var":"fruitBgBox"},"child":[{"type":"Image","props":{"y":0,"x":2,"skin":"ui.images/img_0002.png","name":"fruitBg_0"}},{"type":"Image","props":{"y":0,"x":94,"skin":"ui.images/img_0003.png","name":"fruitBg_1"}},{"type":"Image","props":{"y":0,"x":186,"skin":"ui.images/img_0002.png","name":"fruitBg_2"}},{"type":"Image","props":{"y":0,"x":278,"skin":"ui.images/img_0003.png","name":"fruitBg_3"}},{"type":"Image","props":{"y":0,"x":370,"skin":"ui.images/img_0002.png","name":"fruitBg_4"}},{"type":"Image","props":{"y":0,"x":462,"skin":"ui.images/img_0003.png","name":"fruitBg_5"}},{"type":"Image","props":{"y":0,"x":554,"skin":"ui.images/img_0002.png","name":"fruitBg_6"}},{"type":"Image","props":{"y":0,"x":646,"skin":"ui.images/img_0003.png","name":"fruitBg_7"}},{"type":"Image","props":{"y":0,"x":738,"skin":"ui.images/img_0002.png","name":"fruitBg_8"}},{"type":"Image","props":{"y":0,"x":830,"skin":"ui.images/img_0003.png","name":"fruitBg_9"}},{"type":"Image","props":{"y":92,"x":830,"skin":"ui.images/img_0002.png","name":"fruitBg_10"}},{"type":"Image","props":{"y":183,"x":830,"skin":"ui.images/img_0003.png","name":"fruitBg_11"}},{"type":"Image","props":{"y":275,"x":830,"skin":"ui.images/img_0002.png","name":"fruitBg_12"}},{"type":"Image","props":{"y":275.00000000000006,"x":737.9999999999999,"skin":"ui.images/img_0003.png","name":"fruitBg_13"}},{"type":"Image","props":{"y":275.00000000000006,"x":645.9999999999998,"skin":"ui.images/img_0002.png","name":"fruitBg_14"}},{"type":"Image","props":{"y":275.00000000000006,"x":553.9999999999999,"skin":"ui.images/img_0003.png","name":"fruitBg_15"}},{"type":"Image","props":{"y":275.00000000000006,"x":462,"skin":"ui.images/img_0002.png","name":"fruitBg_16"}},{"type":"Image","props":{"y":275.00000000000006,"x":370,"skin":"ui.images/img_0003.png","name":"fruitBg_17"}},{"type":"Image","props":{"y":275.00000000000006,"x":278,"skin":"ui.images/img_0002.png","name":"fruitBg_18"}},{"type":"Image","props":{"y":275.00000000000006,"x":186.00000000000003,"skin":"ui.images/img_0003.png","name":"fruitBg_19"}},{"type":"Image","props":{"y":275.00000000000006,"x":93.99999999999986,"skin":"ui.images/img_0002.png","name":"fruitBg_20"}},{"type":"Image","props":{"y":275,"x":2,"skin":"ui.images/img_0003.png","name":"fruitBg_21"}},{"type":"Image","props":{"y":183,"x":2,"skin":"ui.images/img_0002.png","name":"fruitBg_22"}},{"type":"Image","props":{"y":92,"x":2,"skin":"ui.images/img_0003.png","name":"fruitBg_23"}}]}]},{"type":"Box","props":{"y":441,"x":169,"var":"middleBtnBox"},"child":[{"type":"Image","props":{"skin":"ui.images/img_0025.png","sizeGrid":"10,10,10,10"}},{"type":"Button","props":{"y":9,"x":179,"skin":"ui.button/btn_004.png"},"child":[{"type":"Image","props":{"y":11,"x":14,"skin":"ui.images/img_←.png"}},{"type":"Image","props":{"y":10,"x":15,"skin":"ui.images/img_←h.png"}}]},{"type":"Button","props":{"y":9,"x":308,"skin":"ui.button/btn_004.png"},"child":[{"type":"Image","props":{"y":12,"x":18,"skin":"ui.images/img_→.png"}},{"type":"Image","props":{"y":12,"x":17,"skin":"ui.images/img_→h.png"}}]},{"type":"Button","props":{"y":8,"x":532,"skin":"ui.button/btn_003.png"},"child":[{"type":"Image","props":{"y":20,"x":20,"skin":"ui.label/img_0004.png"}},{"type":"Image","props":{"y":20,"x":21,"skin":"ui.label/img_0005.png"}}]},{"type":"Button","props":{"y":8,"x":655,"skin":"ui.button/btn_003.png"},"child":[{"type":"Image","props":{"y":17,"x":12,"skin":"ui.label/img_0007.png"}},{"type":"Image","props":{"y":17,"x":12,"skin":"ui.label/img_0008.png"}}]},{"type":"Button","props":{"y":8,"x":775,"skin":"ui.button/btn_001.png"},"child":[{"type":"Image","props":{"y":15,"x":36,"skin":"ui.label/img_GO.png"}},{"type":"Image","props":{"y":14,"x":35,"skin":"ui.label/img_goh.png"}}]},{"type":"Button","props":{"y":8,"x":22,"var":"allAddBtn","skin":"ui.button/btn_002.png"},"child":[{"type":"Image","props":{"y":16,"x":9,"skin":"ui.label/img_ALL+1.png"}},{"type":"Image","props":{"y":16,"x":9,"skin":"ui.label/img_all+1h.png"}}]},{"type":"Image","props":{"y":23,"x":423,"skin":"ui.images/img_0001.png"}}]},{"type":"Box","props":{"y":531,"x":169,"width":923,"name":"bet_box","height":189},"child":[{"type":"Image","props":{"y":0,"x":0,"width":938,"skin":"ui.images/img_0026.png","sizeGrid":"10,10,10,10","height":190}},{"type":"Box","props":{"y":52,"x":-1,"width":924,"var":"fruitBtnBox","height":85},"child":[{"type":"Button","props":{"y":5,"x":15,"skin":"ui.button/btn_005.png","name":"GGBtn"},"child":[{"type":"Image","props":{"y":17,"x":14,"skin":"ui.main/icon_gg-s.png"}}]},{"type":"Button","props":{"y":3,"x":132,"skin":"ui.button/btn_005.png","name":"77Btn"},"child":[{"type":"Image","props":{"y":13,"x":25,"skin":"ui.main/icon_77-s.png"}}]},{"type":"Button","props":{"y":4,"x":248,"skin":"ui.button/btn_005.png","name":"StarBtn"},"child":[{"type":"Image","props":{"y":13,"x":23,"skin":"ui.main/icon_xx-s.png"}}]},{"type":"Button","props":{"y":4,"x":369,"skin":"ui.button/btn_005.png","name":"WatermelonBtn"},"child":[{"type":"Image","props":{"y":14,"x":22,"skin":"ui.main/icon_xg-s.png"}}]},{"type":"Button","props":{"y":5,"x":488,"skin":"ui.button/btn_005.png","name":"BellBtn"},"child":[{"type":"Image","props":{"y":14,"x":22,"skin":"ui.main/icon_ld-s.png"}}]},{"type":"Button","props":{"y":5,"x":606,"skin":"ui.button/btn_005.png","name":"PomeloBtn"},"child":[{"type":"Image","props":{"y":18,"x":21,"skin":"ui.main/icon_yz-s.png"}}]},{"type":"Button","props":{"y":5,"x":719,"skin":"ui.button/btn_005.png","name":"OrangeBtn"},"child":[{"type":"Image","props":{"y":11,"x":25,"skin":"ui.main/icon_jz-s.png"}}]},{"type":"Button","props":{"y":5,"x":833,"skin":"ui.button/btn_005.png","name":"AppleBtn"},"child":[{"type":"Image","props":{"y":10,"x":26,"skin":"ui.main/icon_pg-s.png"}}]}]},{"type":"Box","props":{"y":-1,"x":0,"width":923,"name":"multiple_box","height":63},"child":[{"type":"Image","props":{"y":12,"x":18,"skin":"ui.images/img_0020.png","name":"gg_multiple"},"child":[{"type":"Image","props":{"y":3,"x":6,"skin":"ui.label/img_0019.png"}}]},{"type":"Image","props":{"y":11,"x":835,"var":"apple_multiple","skin":"ui.images/img_0020.png"},"child":[{"type":"Image","props":{"y":3,"x":28,"skin":"ui.label/img_0006.png"}}]},{"type":"Image","props":{"y":12,"x":136,"skin":"ui.images/img_0021.png","name":"high_40_multiple"},"child":[{"type":"Image","props":{"y":10,"x":21,"skin":"ui.label/img_0017.png"}},{"type":"Image","props":{"y":4,"x":15,"skin":"ui.label/img_0018.png"}}]},{"type":"Image","props":{"y":12,"x":250,"skin":"ui.images/img_0021.png","name":"high_30_multiple"},"child":[{"type":"Image","props":{"y":9,"x":24,"skin":"ui.label/img_0015.png"}},{"type":"Image","props":{"y":3,"x":17,"skin":"ui.label/img_0016.png"}}]},{"type":"Image","props":{"y":12,"x":369,"skin":"ui.images/img_0021.png","name":"high_20_multiple"},"child":[{"type":"Image","props":{"y":9,"x":25,"skin":"ui.label/img_0013.png"}},{"type":"Image","props":{"y":2,"x":18,"skin":"ui.label/img_0014.png"}}]},{"type":"Image","props":{"y":12,"x":488,"skin":"ui.images/img_0021.png","name":"low_20_multiple"},"child":[{"type":"Image","props":{"y":9,"x":25,"skin":"ui.label/img_0013.png"}},{"type":"Image","props":{"y":2,"x":20,"skin":"ui.label/img_0014.png"}}]},{"type":"Image","props":{"y":12,"x":605,"skin":"ui.images/img_0021.png","name":"low_15_multiple"},"child":[{"type":"Image","props":{"y":9,"x":25,"skin":"ui.label/img_0011.png"}},{"type":"Image","props":{"y":3,"x":19,"skin":"ui.label/img_0012.png"}}]},{"type":"Image","props":{"y":12,"x":720,"skin":"ui.images/img_0021.png","name":"low_10_multiple"},"child":[{"type":"Image","props":{"y":9,"x":24,"skin":"ui.label/img_0009.png"}},{"type":"Image","props":{"y":3,"x":19,"skin":"ui.label/img_0010.png"}}]},{"type":"Image","props":{"y":6,"x":364,"skin":"ui.images/img_0022.png"}},{"type":"Image","props":{"y":6,"x":714,"skin":"ui.images/img_0022.png"}}]},{"type":"Box","props":{"y":133,"x":13,"var":"stakesNumBox"},"child":[{"type":"Image","props":{"y":-1,"x":0,"skin":"ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":122,"skin":"ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":234,"skin":"ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":354,"skin":"ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":473,"skin":"ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":589,"skin":"ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":706,"skin":"ui.images/img_0001.png"}},{"type":"Image","props":{"y":-1,"x":820,"skin":"ui.images/img_0001.png"}}]}]},{"type":"Box","props":{"y":440,"x":169,"width":919,"var":"zeroLabBox","height":265},"child":[{"type":"Label","props":{"y":231,"x":21,"width":78,"text":"000","name":"zeroLab_0","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":231,"x":143,"width":78,"text":"000","name":"zeroLab_1","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":231,"x":255,"width":78,"text":"000","name":"zeroLab_2","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":231,"x":375,"width":78,"text":"000","name":"zeroLab_3","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":231,"x":494,"width":78,"text":"000","name":"zeroLab_4","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":231,"x":610,"width":78,"text":"000","name":"zeroLab_5","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":231,"x":727,"width":78,"text":"000","name":"zeroLab_6","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":231,"x":841,"width":78,"text":"000","name":"zeroLab_7","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":34,"x":431,"width":78,"text":"000","name":"zeroLab_8","height":34,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":232,"x":18,"width":78,"text":"000","name":"GGBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":232,"x":140,"width":78,"text":"000","name":"77BetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":232,"x":252,"width":78,"text":"000","name":"StarBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":232,"x":372,"width":78,"text":"000","name":"WatermelonBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":232,"x":492,"width":78,"text":"000","name":"BellBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":232,"x":608,"width":78,"text":"000","name":"PomeloBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":232,"x":724,"width":78,"text":"000","name":"OrangeBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":232,"x":839,"width":78,"text":"000","name":"AppleBetLab","height":34,"fontSize":40,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":34,"x":431,"width":78,"text":"000","name":"resultLab","height":34,"fontSize":40,"color":"#ffffff","align":"center"}}]}]};}
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
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"skin":"bg.png"}},{"type":"ProgressBar","props":{"y":585,"x":192,"var":"progress","skin":"ui.loader/progress.png"}},{"type":"Label","props":{"y":605,"x":625,"var":"percent","text":"0%","fontSize":40,"font":"Arial","color":"#ffffff"}},{"type":"Label","props":{"y":530,"x":508,"var":"message","text":"正在加载中...","fontSize":50,"font":"Arial","color":"#ffffff","bold":true}}]};}
		]);
		return LoaderViewUI;
	})(View);