StepChart = {

	data: new Array(7),

	updateFromData: function(data) {
		var dayOfWeek = new Date().getDay();
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var lineChartData = {
			labels: Util.rotateArray(days, dayOfWeek).reverse(),
			datasets: [
				{
					label: "My First dataset",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : data.reverse()
				}
			]
		};
		var ctx = document.getElementById("canvas").getContext("2d");
		var c = new Chart(ctx).Line(lineChartData, {
			responsive: true,
			scaleFontSize: 20
		});
	},

	updateFromPedometer: function(pedometer) {
		var stepData = new Array(7);
		var now = new Date();

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

			pedometer.queryPedometerDataFromDate(startT, endT, StepChart.onStepData(stepData, i), StepChart.onError);
		}
	},

	onStepData: function(stepData, i) {
		return function(pedometerData) {
			console.log('stepData ' + i + ' = ' + pedometerData.numberOfSteps);
			stepData[i] = pedometerData.numberOfSteps;
			if (_.every(stepData, _.isNumber)) {
				StepChart.updateFromData(stepData);
			}
		};
	},

	onError: function() {
		console.log('Error occurred');
		console.log(new Error().stack);
	},
};