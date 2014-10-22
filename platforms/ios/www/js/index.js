
var app = {
    initialize: function() {
		$('#home').on('pagebeforecreate', app.initializeGame);
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },
	
	initializeGame: function() {
		console.log('pagebeforecreate');
		new GameView({ model: app.loadGame(), el: $('#home') });
	},
		
	loadGame: function() {
		try {
			var data = JSON.parse(localStorage.game);
			if (data) { return Game.fromSaveJSON(data) }
		} catch (e) { }
		return new Game();
	},
};

app.initialize();