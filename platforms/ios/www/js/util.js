
Util = {
	render: function(el, attributes) {
		_.each(attributes, function(val, key) {
			el.find('.' + key).html(val);
		});
	},

	rotateArray: function(a, n) {
		return a.slice(n, a.length).concat(a.slice(0, n));
	},
};