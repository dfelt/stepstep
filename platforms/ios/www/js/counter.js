
CounterView = Backbone.View.extend({
	el: '#counter',
	
	initialize: function(options) {
		this.$count = this.$('#stepstep-count');
		this.$ssps = $('.ssps');
		this.$sspt = $('.sspt');
		
		this.model.on('change', this.render, this);
		
		this.render();
	},
	
	render: function() {
		this.$count.html(this.formatNumber(this.model.get('ss')));
		this.$ssps.html(this.formatNumber(this.model.get('ssps')));
		this.$sspt.html(this.formatNumber(this.model.get('sspt')));
		return this;
	},
	
	formatNumber: function(n) {
		return Math.floor(n).toString();
	},
});