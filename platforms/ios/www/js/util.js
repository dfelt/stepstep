
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
	},

	lastWeekStepData: function(pedometer, ok, fail) {
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

			pedometer.queryPedometerDataFromDate(startT, endT, onStepData(i), fail);
		}
	},
};