
// Time between cloud updates in minutes
CLOUD_UPDATE_TIME = 1;

// Upgrades which improve StepSteps/Step (PowerWalk)
ACTIVE_UPGRADES = [
	{
		name:"Trailblazer",
		description: 'Add 1 StepStep per step',
		image:"css/images/trail.png",
		baseCost: 10,
		effect:1,
		unlockAt:0
	}, {
		name:"Steamroller",
		description:"Add 3 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:100,
		effect:3,
		unlockAt:50
	}, {
		name:"Happy Feet",
		description:"Add 10 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:1000,
		effect:10,
		unlockAt:500
	}, {
		name:"Power Walker",
		description:"Add 30 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:10000,
		effect:30,
		unlockAt:5000
	}, {
		name:"Robowalker",
		description:"Add 60 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:50000,
		effect:60,
		unlockAt:25000
	}, {
		name:"Battle of Marathon",
		description:"Add 200 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:200000,
		effect:200,
		unlockAt:100000
	}, {
		name:"Walkaholic",
		description:"Add 400 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:500000,
		effect:400,
		unlockAt:250000
	}, {
		name:"Walka Walka",
		description:"Add 700 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:1000000,
		effect:700,
		unlockAt:500000
	}, {
		name:"Unstoppable",
		description:"Add 3,000 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:5000000,
		effect:3000,
		unlockAt:2500000
	}, {
		name:"The Road Less Taken",
		description:"Add 15,000 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:30000000,
		effect:15000,
		unlockAt:15000000
	}, {
		name:"Oregon Trail",
		description:"Add 30,000 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:70000000,
		effect:30000,
		unlockAt:35000000
	}, {
		name:"Where Nobody Has Gone...",
		description:"Add 80,000 StepSteps per step",
		image:"css/images/steamroller.png",
		baseCost:200000000,
		effect:80000,
		unlockAt:100000000
	},
];

PASSIVE_UPGRADES = [
	{
		name: 'Extra Steps',
		description: 'Add 1 StepSteps per second',
		image: "css/images/walkawalka.png",
		baseCost: 150000,
		idle: 1,
		unlockAt: 0
	}, {
		name: 'Phantom Steps',
		description: 'Add 3 StepSteps per second',
		image: "css/images/walkawalka.png",
		baseCost: 450000,
		idle: 3,
		unlockAt: 200000
	}, {
		name: 'Flash Steps',
		description: 'Add 5 StepSteps per second',
		image: "css/images/walkawalka.png",
		baseCost: 1500000,
		idle: 5,
		unlockAt: 750000
	}, {
		name: 'Doppelganger',
		description: 'Add 10 StepSteps per second',
		image: "css/images/walkawalka.png",
		baseCost: 8000000,
		idle: 10,
		unlockAt: 4000000
	},

];

// Upgrades that improve StepSteps/Second (AutoWalk)
ACHIEVEMENTS = [
	{
		name: 'The Jaywalker',
		description: 'Get 10 total StepSteps.',
		multiplier: 1.01,
		unlockType: 'totalSs',
		unlockValue: 10,
	},
	{
		name: 'The Speedwalker',
		description: 'Get 100 total StepSteps.',
		multiplier: 1.01,
		unlockType: 'totalSs',
		unlockValue: 100,
	},
	{
		name: 'The Quick-Footed',
		description: 'Walk 200 steps.',
		multiplier: 1.01,
		unlockType: 'steps',
		unlockValue: 200,
	},
	{
		name: 'The Purveyor of Speed',
		description: 'Walk 1,000 steps.',
		multiplier: 1.01,
		unlockType: 'steps',
		unlockValue: 1000,
	},
	{
		name: 'The Dedicated',
		description: 'Walk 5,000 steps.',
		multiplier: 1.01,
		unlockType: 'steps',
		unlockValue: 5000,
	},
	{
		name: 'The Untiring',
		description: 'Get 10,000 total StepSteps.',
		multiplier: 1.01,
		unlockType: 'totalSs',
		unlockValue: 10000,
	},
	{
		name: 'The Ambulator',
		description: 'Walk 100,000 steps.',
		multiplier: 1.05,
		unlockType: 'steps',
		unlockValue: 100000,
	},
	{
		name: 'The Locomotor',
		description: 'Get 1,000,000 total StepSteps.',
		multiplier: 1.05,
		unlockType: 'totalSs',
		unlockValue: 1000000,
	},
	{
		name: 'The Step Mason',
		description: 'Get 50,000,000 total StepSteps.',
		multiplier: 1.05,
		unlockType: 'steps',
		unlockValue: 5000000,
	},
	{
		name: 'The Psycho Path',
		description: 'Reach 1,000 StepSteps per second.',
		multiplier: 1.1,
		unlockType: 'sspt',
		unlockValue: 60,
	},
	{
		name: 'The Ascended',
		description: 'Walk 1,000,000 steps.',
		multiplier: 1.1,
		unlockType: 'steps',
		unlockValue: 1000000,
	},
	{
		name: 'The God of Steps',
		description: 'Get 1,000,000,000 total StepSteps.',
		multiplier: 1.2,
		unlockType: 'steps',
		unlockValue: 1000000000,
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
		lastCloudSave: 0,
		sonaId: '',
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

	toCloudSaveJSON: function() {
		return _.extend({}, this.attributes, {
			upgrades: this.upgrades.pluck('count'),
			passives: this.passives.pluck('count'),
			achievements: this.achievements.pluck('locked')
		});
	},
}, /* class properties */ {
	fromSaveJSON: function(data) {
		var game = new Game(_.omit(data, 'upgrades', 'passives', 'achievements'));
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
		'tap #stepstep-count': 'reset',
		'click #sona-login-btn': 'login',
	},
	
	initialize: function(options) {
		// Global event pump, used for interfacing with UI
		this.gameEvents = options.gameEvents;
		this.gameEvents.on('update-stats', this.updateStepChart, this);

		// Prepare cloud storage
		this.cloudStorage = this.makeCloudStorage();

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

		// Welcome the user back if they've been gone
        this.testStepUpdate();
		
		this.model.on('change', this.tryUnlocks, this);
		
		setInterval(_.bind(this.idleUpdate, this), 1000);
		setInterval(_.bind(this.testStepUpdate, this), 1000*60);
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
		this.gameEvents.trigger('step', nSteps);
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
		this.save();
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
	
	tryUnlocks: _.debounce(function() {
		this.unlockUpgrades();
		this.unlockAchievements();
	}, 100, true),
	
	unlockUpgrades: function() {
		var gameEvents = this.gameEvents;
		var ss = this.model.get('ss');
		this.model.upgrades.each(function(u) {
			if (u.get('locked') && ss >= u.get('unlockAt')) {
				u.set('locked', false);
				gameEvents.trigger('upgrade-unlocked', u.attributes);
			}
			u.set('affordable', ss >= u.get('cost'));
		});
		this.model.passives.each(function(u) {
			if (u.get('locked') && ss >= u.get('unlockAt')) {
				u.set('locked', false);
				gameEvents.trigger('passive-unlocked', u.attributes);
			}
			u.set('affordable', ss >= u.get('cost'));
		});
	},
	
	unlockAchievements: function() {
		var gameEvents = this.gameEvents;
		var values = this.model.attributes;
		this.model.achievements.each(function(a) {
			if (a.get('locked') && values[a.get('unlockType')] >= a.get('unlockValue')) {
				a.set('locked', false);
				gameEvents.trigger('achievement-unlocked', a.attributes);
			}
		});
	},
	
	save: function() {
		localStorage.game = JSON.stringify(this.model.toSaveJSON());
		if (Util.minutesSince(this.model.get('lastCloudSave')) >= CLOUD_UPDATE_TIME) { this.cloudSave(); }
	},

	cloudSave: function() {
		if (!this.model.get('sonaId')) {
			return;
		}
		this.stepHistorySave();
		if (new Date() > this.cloudStorage.expiration) {
			this.cloudStorage = this.makeCloudStorage();
			console.log('New cloud storage with expiration date: ' + this.cloudStorage.expiration);
		}
		this.model.set('lastCloudSave', +new Date());
		this.cloudStorage.save(this.model.toCloudSaveJSON());
	},

	stepHistorySave: _.once(function() {
		var id = this.model.get('sonaId');
		Util.lastWeekStepData(window.pedometer, function(stepData) {
			var StepHistory = Parse.Object.extend('StepHistory');
			new StepHistory().save({ sonaId: id, data: stepData });
		}, this.onError);
	}),
	
	reset: function() {
		this.model.upgrades.each(function(u) { u.set(u.defaults); });
		this.model.passives.each(function(u) { u.set(u.defaults); });
		this.model.achievements.each(function(a) { a.set(a.defaults); });
		this.model.set(this.model.defaults);
	},

	login: function() {
		var input = $('#sona-login-id').val().trim();
		if (input.length == 4 && _.isFinite(+input)) {
			this.model.set('sonaId', input);
			this.cloudSave();
			this.stepHistorySave();
			$('#sona-login').popup('close');
		} else {
			$('#sona-login-error').show();
		}
	},

	updateStepChart: function() {
		if (!this.chart) {
			this.chart = new StepChart($('#canvas')[0]);
		}
		Util.lastWeekStepData(window.pedometer, _.bind(this.chart.update, this.chart), this.onError);
	},

    testStepUpdate: function() {
        var minutesSinceLastStep = Util.minutesSince(this.model.get('lastStepUpdate'));
        if (minutesSinceLastStep >= 60 && window.pedometer) {
            window.pedometer.queryPedometerDataFromDate(this.model.get('lastStepUpdate'), +new Date(), this.onError);
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

	// Makes cloud storage, which expires at the end of today. This means we get
	// overwrite the record until the end of the day (or the app is restarted),
	// and then start a new record the next day.
    makeCloudStorage: function() {
		var SonaUser = Parse.Object.extend('SonaUser');
		var cloudStorage = new SonaUser();
		cloudStorage.expiration = new Date();
		cloudStorage.expiration.setHours(23, 59, 59, 999);
		return cloudStorage;
    },

	onError: function() {
		console.log('Error occurred');
		console.log(new Error().stack);
	},
});
