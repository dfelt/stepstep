function StepChart(canvas) {
	this.chart = new Chart(canvas.getContext('2d'));
}

StepChart.prototype.update = function(data) {
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
	this.chart.Line(lineChartData, {
		responsive: true,
		scaleFontSize: 20
	});
};