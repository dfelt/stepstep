
var app = {
    initialize: function() {
		$('#home').on('pagebeforecreate', app.initializeGame);
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },
	
	initializeGame: function() {
		app.game = new GameView({ model: app.loadGame(), el: $('#home') });
		app.stepSubscribe();
	},
		
	loadGame: function() {
		try {
			var data = JSON.parse(localStorage.game);
			if (data) { return Game.fromSaveJSON(data) }
		} catch (e) { }
		return new Game();
	},
	
	onDeviceReady: function() {
		app.stepometer = cordova.require('edu.cornell.stepometer.Stepometer');
		app.stepSubscribe();
	},
	
	stepSubscribe: function() {
		if (app.game && app.stepometer) {
			app.stepometer.subscribe(function() {
				console.log('***** step ******');
				app.game.step();
			});
		}
	},
};

app.initialize();