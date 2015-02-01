
CounterView = Backbone.View.extend({
	el: '#counter',
	
	initialize: function(options) {
		this.$count = this.$('#stepstep-count');
		this.$ssps = $('.ssps');
		this.$sspt = $('.sspt');
        this.$totalSs = $('#totalSs');
		
		this.model.on('change', this.render, this);
		
		this.render();
	},
	
	render: function() {
		this.$count.html(this.formatNumber(this.model.get('ss')));
		this.$ssps.html(this.formatNumber(this.model.get('ssps')));
		this.$sspt.html(this.formatNumber(this.model.get('sspt')));
        this.$totalSs.html(this.formatNumber(this.model.get('totalSs')));

        Util.render($("#stats-panel"), this.model.attributes);
		return this;
	},
	
	formatNumber: Util.numberToAbbreviatedString,
});