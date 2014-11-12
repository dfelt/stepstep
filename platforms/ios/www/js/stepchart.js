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
				strokeColor : "rgb(255, 255, 255)",
				pointColor : "rgb(255, 255, 255)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgb(255, 255, 255)",
				data : data.reverse()
			}
		]
	};
    
	this.chart.Line(lineChartData, {
        padding: 50,
		responsive: true,
		scaleFontSize: 14,
        scaleFontColor: "white",
        scaleFontFamily:"'Avenir Next'",
        scaleGridLineColor : "rgba(250, 250, 250, 0.05)",
        scaleLineColor: "rgba(255,255,255,1)"
	});
};