
Util = {
	render: function(el, attributes) {
		_.each(attributes, function(val, key) {
			var valStr = _.isNumber(val) ? Util.numberToAbbreviatedString(val) : val.toString();
			el.find('.' + key).html(valStr);
		});
	},

	rotateArray: function(a, n) {
		return a.slice(n, a.length).concat(a.slice(0, n));
	},

	numberToStringWithCommas: function(n) {
    	return Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	numberToAbbreviatedString: function(n) {
		var len = Math.log10(n);
		if (len >= 9) {
			return Util.sigFigs(n / 1e9, 4).toString() + 'B';
		} else if (len >= 6) {
			return Util.sigFigs(n / 1e6, 4).toString() + 'M';
		} else {
			return Math.floor(n).toString();
		}
	},

	sigFigs: function(n, sig) {
	    var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
	    return Math.round(n * mult) / mult;
	},

	lastWeekStepData: function(pedometer, ok, fail) {
		if (!pedometer) {
			_.defer(fail);
			return;
		}

		var stepData = new Array(7);
		var now = new Date();

		function onStepData(i) {
			return function(pedometerData) {
				console.log('stepData ' + i + ' = ' + pedometerData.numberOfSteps);
				stepData[i] = pedometerData.numberOfSteps;
				if (_.every(stepData, _.isNumber)) {
					ok(stepData);
				}
			};
		}

		// Get data for last 7 days.
		for (var i = 0; i < 7; i++) {
			var day = new Date(+now);
			day.setDate(day.getDate() - i);

			var start = new Date(+day);
			start.setHours(0, 0, 0, 0);

			var end = new Date(+day);
			end.setHours(23, 59, 59, 999);

			var startT = +start;
			var endT = +end;

			console.log(start, end);

			pedometer.queryPedometerDataFromDate(startT, endT, onStepData(i), fail);
		}
	},

	secondsSince: function(time) {
		return (new Date() - time) / 1000;
	},

	minutesSince: function(time) {
		return (new Date() - time) / (1000 * 60);
	},
};