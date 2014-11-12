
UPGRADE_COST_MULTIPLIER = 1.2;

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
	tagName: 'li',
	className: 'upgrade',
	
	initialize: function(options) {
		this.$el.html($('#upgrade-tpl').html()).attr('data-icon', 'false');
		this.model.on('change', this.render, this);
		this.render();
	},
	
	render: function() {
		this.$el.toggleClass('locked', this.model.get('locked'));
		this.$el.toggleClass('affordable', this.model.get('affordable'));
		Util.render(this.$el, this.model.attributes);
		this.$('img').attr('src', this.model.get('image'));
		return this;
	},
});