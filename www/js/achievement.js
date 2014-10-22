
Achievement = Backbone.Model.extend({
	defaults: { locked: true },
	
	toSaveJSON: function() {
		return this.pick('locked');
	},
});

AchievementView = Backbone.View.extend({
	tagName: 'li',
	className: 'achievement',

	initialize: function(options) {
		this.$el.html($('#achievement-tpl').html());
		this.model.on('change', this.render, this);
		this.render();
	},
	
	render: function() {
		this.$el.toggleClass('locked', this.model.get('locked'));
		Util.render(this.$el, this.model.attributes);
		this.$('.mult').html(Math.round(100 * (this.model.get('multiplier') - 1)));
		return this;
	},
});