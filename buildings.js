const unicorn = ["Unic. Pasture"];
const housing = ["Hut", "Log House"];
const prod1 = ["Mine"];
const prod2 = ["Smelter"];
const other = ["Barn"];

const mainLoop = () => {	
	autoCatnip();
	autoHunt();
	automanuscript();

	game.update();

	buildFromOrder(unicorn);
	if(!buildFromOrder(housing)){
		var a = buildFromOrder(prod1);
		var b = buildFromOrder(prod2);
		if(!a && !b){
			buildFromOrder(other);
		}
	}
	
};

setInterval(mainLoop, 30*1000);
setInterval(starClick, 5*1000);


function buildFromOrder(order){
	const name = getFirstNonMaxed(order);
	if(name){
		const button = getButton(name);		
		let number = 0;
		while(button.enabled){
			button.onClick({});
			button.update();
			number++;
		}					
		if(number > 0){
			console.log((new Date()).toLocaleTimeString(),"built "+name+" ("+number+")");
		}
		return true;
	}	
	return false;
}

function getButton(name){
	const btn = game.tabs[0].buttons.filter((btn) => btn.name===name);
	if(btn && btn[0]){
		return btn[0]
	}
}

function buttonMaxed(button){
	return button.buttonTitle.classList.contains("limited");
}

function getFirstNonMaxed(order){
	var list = order.filter((name) => {
		const button = getButton(name);						
		return !buttonMaxed(button);
	});
	return list[0];
}

function autoCraft() {
    var resources = [
        ["wood",     "beam" ],
        ["minerals", "slab" ],
        ["coal",     "steel"],
        ["iron",     "plate"],
        ["oil",     "kerosene"]
    ];

    for (var i = 0; i < resources.length; i++) {
        var curRes = gamePage.resPool.get(resources[i][0]);
        if (curRes.value / curRes.maxValue > 0.90
         && gamePage.workshop.getCraft(resources[i][1]).unlocked) {
            gamePage.craftAll(resources[i][1]);
        }
    }
};

function autoCompendium() {
    var science = gamePage.resPool.get('science');
    if (science.value / science.maxValue > 0.90) {
        if (gamePage.workshop.getCraft('compedium').unlocked) { gamePage.craftAll('compedium'); }
    }
};

function automanuscript() {
    var culture = gamePage.resPool.get('culture');
    if (culture.value / culture.maxValue > 0.90) {
        if (gamePage.workshop.getCraft('manuscript').unlocked) { gamePage.craftAll('manuscript'); }
    }
};

function autoHunt() {
    var catpower = gamePage.resPool.get('manpower');
    if (catpower.value / catpower.maxValue > 0.90) {
        $("a:contains('Send hunters')").click();    
        if (gamePage.workshop.getCraft('parchment').unlocked)  { gamePage.craftAll('parchment');  }    
    }
};

function starClick() { $("#observeButton").find("input").click(); };

function autoCatnip(){
	var catnip = gamePage.resPool.get('catnip');
    var calendar = gamePage.calendar;

    // Only run if positive catnip and not in last half of Autumn
    //if (catnip.perTickUI < 0) { return; }
    //if (catnip.value / catnip.maxValue < 0.95) { return; }
    //if (calendar.season == 2 && calendar.day > 50) { return; }
    gamePage.craftAll('wood');
}
