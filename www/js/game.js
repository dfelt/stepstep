
ACTIVE_UPGRADES = [
	{
		name: 'Trailblazer',
		description: 'Add 1 StepStep per step',
		image: "css/images/trail.png",
		baseCost: 5,
		effect: 1,
		unlockAt: 0,
		locked: false,
	}, {
		name: 'Steamroller',
		description: 'Add 3 StepSteps per step',
		image: "css/images/steamroller.png",
		baseCost: 20,
		effect: 3,
		unlockAt: 5
	},
];

PASSIVE_UPGRADES = [
	{
		name: 'Walka Walka',
		description: 'Add 1 StepSteps per second',
		image: "css/images/walkawalka.png",
		baseCost: 40,
		idle: 1,
		unlockAt: 20
	},
];

ACHIEVEMENTS = [
	{
		name: 'The Locomotor',
		description: 'Get 10 StepSteps.',
		multiplier: 1.01,
		unlockType: 'ss',
		unlockValue: 10,
	},
	{
		name: 'The Jaywalker',
		description: 'Get 30 total StepSteps.',
		multiplier: 1.02,
		unlockType: 'totalSs',
		unlockValue: 30,
	},
	{
		name: 'The Psycho Path',
		description: 'Walk 60 steps.',
		multiplier: 1.05,
		unlockType: 'steps',
		unlockValue: 60,
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
		lastStepUpdate: +new Date(),
	},
	
	initialize: function() {
		this.upgrades = new Backbone.Collection(ACTIVE_UPGRADES, { model: Upgrade });
		this.passives = new Backbone.Collection(PASSIVE_UPGRADES, { model: Upgrade });
		this.achievements = new Backbone.Collection(ACHIEVEMENTS, { model: Achievement });
		
		this.upgrades.on('change:count', this.recalculate, this);
		this.passives.on('change:count', this.recalculate, this);
		this.achievements.on('change:count', this.recalculate, this);
	},
	
	recalculate: function() {
		var ssps = this.upgrades.reduce(function(acc, up) {
			return acc + up.get('count') * up.get('effect');
		}, 0);
		var sspt = this.passives.reduce(function(acc, up) {
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
			passives: this.passives.invoke('toSaveJSON'),
			achievements: this.achievements.invoke('toSaveJSON')
		});
	},
}, /* class properties */ {
	fromSaveJSON: function(data) {
		var game = new Game(_.omit(data, 'upgrades', 'achievements'));
		game.upgrades.each(function(u, i) { u.set(data.upgrades[i]); });
		game.passives.each(function(u, i) { u.set(data.passives[i]); });
		game.achievements.each(function(a, i) { a.set(data.achievements[i]); });
		return game;
	}
});

GameView = Backbone.View.extend({
	events: {
		'tap #step-button': 'step',
		'tap .upgrade': 'buyUpgrade',
	},
	
	initialize: function(options) {
		// Initialize views, adding upgrades and achievements to page
		new CounterView({ model: this.model });
		this.model.upgrades.each(function(u) {
			new UpgradeView({ model: u }).$el
				.data('model', u)
				.appendTo('#upgrades-list');
		});
		this.model.passives.each(function(u) {
			new UpgradeView({ model: u }).$el
				.data('model', u)
				.appendTo('#passives-list');
		});
		this.model.achievements.each(function(a) {
			new AchievementView({ model: a }).$el.appendTo('#achievements-list');
		});

        this.tryGetStepHistory();
		
		this.model.on('change', this.tryUnlocks, this);
		
		setInterval(_.bind(this.idleUpdate, this), 1000);
	},
	
	step: function(nSteps) {
		var n = _.isNumber(nSteps) ? nSteps : 1;
		var ss = n * this.model.get('ssps');
		this.model.set({
			ss:      this.model.get('ss') + ss,
			totalSs: this.model.get('totalSs') + ss,
			steps:   this.model.get('steps') + n,
            lastStepUpdate: +new Date(),
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
        this.tryGetStepHistory();
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
		this.model.passives.each(function(u) {
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
		this.model.upgrades.each(function(u) { u.set(u.defaults); });
		this.model.passives.each(function(u) { u.set(u.defaults); });
		this.model.achievements.each(function(a) { a.set(a.defaults); });
		this.model.set(this.model.defaults);
	},

    tryGetStepHistory: function() {
        var minutesSinceLastStep = (new Date() - this.model.get('lastStepUpdate')) / (1000*60*60);
        if (minutesSinceLastStep >= 60 && window.pedometer) {
            window.pedometer.queryPedometerDataFromDate(this.model.get('lastStepUpdate'),
                _.bind(this.onQueryPedometerDataFromDate, this),
                function(err) { alert('Error:' + err); });
        }
    },

    onQueryPedometerDataFromDate: function(pedometerData) {
        var n = pedometerData.numberOfSteps;
        if (n > 0) {
            var ss = n * this.model.get('ssps');
            alert("Welcome back! You\'ve stepped " + n + ' times since you were gone, earning you ' + ss + ' StepSteps.');
            this.step(n);
        }
    },
});
