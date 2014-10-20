
CounterView = Backbone.View.extend({
	el: '#counter',
	
	initialize: function(options) {
		this.$count = this.$('#stepstep-count');
		this.$ssps = this.$('#ssps');
		this.$sspt = this.$('#sspt');
		
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
		var iPart = Math.floor(n);
		var fPart = (n % 1);
		if (iPart.toString().length >= 4)
			return n.toPrecision(4);
		if (fPart < 0.1)
			return n.toFixed(0);
		return n.toFixed(1);
	},
});