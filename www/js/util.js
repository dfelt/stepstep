
Util = {
	render: function(el, attributes) {
		_.each(attributes, function(val, key) {
			el.find('.' + key).html(val);
		});
	}
};