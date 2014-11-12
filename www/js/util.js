
Util = {
	render: function(el, attributes) {
		_.each(attributes, function(val, key) {
			var valStr = _.isNumber(val) ? Util.numberToStringWithCommas(val) : val.toString();
			el.find('.' + key).html(valStr);
		});
	},

	rotateArray: function(a, n) {
		return a.slice(n, a.length).concat(a.slice(0, n));
	},

	numberToStringWithCommas: function(n) {
    	return Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
};