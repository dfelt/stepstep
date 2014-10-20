
UPGRADES = [
	{
		name: 'Baby\'s first step',
		description: 'Add 1 StepStep per step',
		baseCost: 5,
		effect: 1,
		idle: 0.1,
		unlockAt: 0,
		locked: false,
	}, {
		name: 'Upgrade 2',
		description: 'Add 5 StepSteps per step',
		baseCost: 50,
		effect: 5,
		idle: 1,
		unlockAt: 10
	}
];

ACHIEVEMENTS = [
	{
		name: 'Baby\'s first achievement',
		description: 'Well done!',
		multiplier: 1,
		unlockType: 'ss',
		unlockValue: 10,
	},
	{
		name: 'Baby\'s second achievement',
		description: 'Well done!',
		multiplier: 1.05,
		unlockType: 'totalSs',
		unlockValue: 100,
	},
	{
		name: 'Actually moving',
		description: 'You actually got off the couch!',
		multiplier: 1.05,
		unlockType: 'steps',
		unlockValue: 15,
	},
];
		
Game = Backbone.Model.extend({
	defaults: {
		ss: 0,
		ssps: 1,
		sspt: 0,
		totalSs: 0,
		steps: 0,
		lastIdleUpdate: +new Date(),
	},
	
	initialize: function() {
		this.upgrades = new Backbone.Collection(UPGRADES, { model: Upgrade });
		this.achievements = new Backbone.Collection(ACHIEVEMENTS, { model: Achievement });
		
		this.upgrades.on('change:count', this.recalculate, this);
		this.achievements.on('change:count', this.recalculate, this);
	},
	
	recalculate: function() {
		var ssps = this.upgrades.reduce(function(acc, up) {
			return acc + up.get('count') * up.get('effect');
		}, 0);
		var sspt = this.upgrades.reduce(function(acc, up) {
			return acc + up.get('count') * up.get('idle');
		}, 0);
		var multiplier = this.achievements.reduce(function(acc, a) {
			return a.get('locked') ? acc : acc * a.get('multiplier');
		}, 1);
		
		this.set({
			ssps: (1 + ssps) * multiplier,
			sspt: sspt * multiplier
		});
	},
	
	toSaveJSON: function() {
		return _.extend({}, this.attributes, {
			upgrades: this.upgrades.invoke('toSaveJSON'),
			achievements: this.achievements.invoke('toSaveJSON')
		});
	},
}, /* class properties */ {
	fromSaveJSON: function(data) {
		var game = new Game(_.omit(data, 'upgrades', 'achievements'));
		game.upgrades.each(function(u, i) { u.set(data.upgrades[i]) });
		game.achievements.each(function(a, i) { a.set(data.achievements[i]) });
		return game;
	}
});

GameView = Backbone.View.extend({
	events: {
		'touchstart #step-button': 'step',
		'click .upgrade': 'buyUpgrade',
		'click #save-game': 'save',
		'click #reset-game': 'reset',
	},
	
	initialize: function(options) {
		// Initialize views, adding upgrades and achievements to page
		new CounterView({ model: this.model });
		this.model.upgrades.each(function(u) {
			new UpgradeView({ model: u }).$el
				.data('model', u)
				.appendTo('#upgrades-list');
		});
		this.model.achievements.each(function(a) {
			new AchievementView({ model: a }).$el.appendTo('#achievements-list');
		});
		
		this.model.on('change', this.tryUnlocks, this);
		
		setInterval(_.bind(this.idleUpdate, this), 1000);
	},
	
	step: function() {
		var ssps = this.model.get('ssps');
		this.model.set({
			ss:      this.model.get('ss') + ssps,
			totalSs: this.model.get('totalSs') + ssps,
			steps:   this.model.get('steps') + 1,
		});
	},
	
	idleUpdate: function() {
		var now = +new Date();
		var nTicks = (now - this.model.get('lastIdleUpdate')) / 1000;
		var sspt = this.model.get('sspt') * nTicks;
		this.model.set({
			ss:      this.model.get('ss') + sspt,
			totalSs: this.model.get('totalSs') + sspt,
			lastIdleUpdate: now,
		});
	},
	
	buyUpgrade: function(event) {
		var upgrade = $(event.currentTarget).data('model');
		var ss = this.model.get('ss');
		var cost = upgrade.get('cost');
		if (ss >= cost) {
			this.model.set('ss', ss - cost);
			upgrade.set('count', upgrade.get('count') + 1);
		}
	},
	
	tryUnlocks: function() {
		this.unlockUpgrades();
		this.unlockAchievements();
	},
	
	unlockUpgrades: function() {
		var ss = this.model.get('ss');
		this.model.upgrades.each(function(u) {
			if (ss >= u.get('unlockAt')) {
				u.set('locked', false);
			}
			u.set('affordable', ss >= u.get('cost'));
		});
	},
	
	unlockAchievements: function() {
		var values = this.model.attributes;
		this.model.achievements.each(function(a) {
			if (values[a.get('unlockType')] >= a.get('unlockValue')) {
				a.set('locked', false);
			}
		});
	},
	
	save: function() {
		localStorage.game = JSON.stringify(this.model.toSaveJSON());
	},
	
	reset: function() {
		this.model.upgrades.each(function(u) { u.set(u.defaults) });
		this.model.achievements.each(function(a) { a.set(a.defaults) });
		this.model.set(this.model.defaults);
	},
});