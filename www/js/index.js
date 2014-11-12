
var app = {
	initialize: function() {
		$('#home').on('pagebeforecreate', app.initializeGame);
		$(document).on('deviceready', app.onDeviceReady);
		_.extend(app, Backbone.Events);
	},

	initializeGame: function() {
		app.game = new GameView({ model: app.loadGame(), el: $('#home'), gameEvents: app });
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
            var lastOpened = app.game.model.get('lastOpened');
            app.pedometer.startPedometerUpdates(app.onStep, app.onError);
			app.prevPedometerData = {
				numberOfSteps: 0,
				distance: 0,
				floorsAscended: 0,
				floorsDescended: 0
			};

			// var chart = new StepChart($('#canvas')[0]);
			// Util.lastWeekStepData(app.pedometer, _.bind(chart.update, chart), app.onError);
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
