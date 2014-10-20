
UPGRADE_COST_MULTIPLIER = 1.1;

Upgrade = Backbone.Model.extend({
	defaults: {
		locked: true,
		affordable: false,
		count: 0,
	},
	
	initialize: function() {
		this.on('change:count', this.updateCost, this);
		this.updateCost();
	},
	
	updateCost: function() {
		var base = this.get('baseCost');
		var mul = Math.pow(UPGRADE_COST_MULTIPLIER, this.get('count'));
		this.set('cost', Math.round(base * mul));
	},
	
	toSaveJSON: function() {
		return this.pick('locked', 'count');
	},
});

UpgradeView = Backbone.View.extend({
	tagName: 'div',
	className: 'upgrade',
	
	template: _.template($('#upgrade-tpl').html()),
	
	initialize: function(options) {
		this.model.on('change', this.render, this);
		this.render();
	},
	
	render: function() {
		this.$el.toggleClass('locked', this.model.get('locked'));
		this.$el.toggleClass('affordable', this.model.get('affordable'));
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
});