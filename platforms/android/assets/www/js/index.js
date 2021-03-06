
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
			if (data) { return Game.fromSaveJSON(data); }
		} catch (e) { }
		return new Game();
	},
	
	onDeviceReady: function() {
		//app.stepometer = cordova.require('edu.cornell.stepometer.Stepometer');
		app.pedometer = pedometer;
		app.stepSubscribe();
	},
	
	stepSubscribe: function() {
		if (app.game && app.stepometer) {
			app.stepometer.subscribe(function() { app.game.step(1); });
		} else if (app.game && app.pedometer) {
			app.pedometer.isStepCountingAvailable(app.onStepCountingAvailable, app.onError);
		}
	},

	onStepCountingAvailable: function(available) {
		if (available) {
			app.pedometer.startPedometerUpdates(app.onStep, app.onError);
		} else {
			app.onError(arguments);
		}
	},

	onStep: function(pedometerData) {
		console.log(pedometerData);
		app.game.step(pedometerData.numberOfSteps);
	},
	

	onError: function() {
		console.log('Error occurred');
		console.log(new Error().stack);
	},
};

app.initialize();
