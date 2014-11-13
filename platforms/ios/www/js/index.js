
var app = {
	initialize: function() {
		$('#home').on('pagebeforecreate', app.initializeGame);
		$(document).on('deviceready', app.onDeviceReady);
		_.extend(app, Backbone.Events);
		Parse.initialize("CTA88xkiQrusIuEpIgmzcktxeI7d02OmZjK3iUay", "TEnNf0PDARVZC3e5tk1wiEMF7CC3dcb6YFdVPbo4");
	},

	initializeGame: function() {
		app.game = new GameView({ model: app.loadGame(), el: $('#home'), gameEvents: app });
		if (!app.game.model.get('sonaId')) {
			_.delay(function() { $('#sona-login').popup('open'); }, 1000);
		}
		app.begin();
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
		app.begin();
	},

	stepSubscribe: function() {
		if (app.game && app.pedometer) {
			game.begin();
			app.pedometer.isStepCountingAvailable(app.onStepCountingAvailable, app.onError);
		}
	},

	onStepCountingAvailable: function(available) {
		if (available) {
            var lastOpened = app.game.model.get('lastOpened');
            app.pedometer.startPedometerUpdates(app.onStep, app.onError);
			app.prevPedometerData = {
				numberOfSteps: 0,
				distance: 0,
				floorsAscended: 0,
				floorsDescended: 0
			};
		} else {
            alert('You must have an iPhone 5s or iPhone 6 running iOS 8 in order to use this app.');
		}
	},

	onStep: function(pedometerData) {
		console.log(pedometerData);
		app.game.step(pedometerData.numberOfSteps - app.prevPedometerData.numberOfSteps);
		app.prevPedometerData = pedometerData;
	},

	onError: function() {
		console.log('Error occurred');
		console.log(new Error().stack);
	},
};

app.initialize();
