
Achievement = Backbone.Model.extend({
	defaults: { locked: true },
	
	toSaveJSON: function() {
		return this.pick('locked');
	},
});

AchievementView = Backbone.View.extend({
	tagName: 'div',
	className: 'achievement',
	
	template: _.template($('#achievement-tpl').html()),

	initialize: function(options) {
		this.render();
		this.model.on('change', this.render, this);
	},
	
	render: function() {
		this.$el.toggleClass('locked', this.model.get('locked'));
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
});