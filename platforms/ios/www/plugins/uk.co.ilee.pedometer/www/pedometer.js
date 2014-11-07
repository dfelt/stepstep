cordova.define("uk.co.ilee.pedometer.Pedometer", function(require, exports, module) { 
var exec = require("cordova/exec");

var Pedometer = function () {
    this.name = "Pedometer";
};

Pedometer.prototype.isStepCountingAvailable = function (onSuccess, onError) {
    exec(onSuccess, onError, "Pedometer", "isStepCountingAvailable", []);
};

Pedometer.prototype.isDistanceAvailable = function (onSuccess, onError) {
    exec(onSuccess, onError, "Pedometer", "isDistanceAvailable", []);
};

Pedometer.prototype.isFloorCountingAvailable = function (onSuccess, onError) {
    exec(onSuccess, onError, "Pedometer", "isFloorCountingAvailable", []);
};

Pedometer.prototype.startPedometerUpdates = function (onSuccess, onError) {
    exec(onSuccess, onError, "Pedometer", "startPedometerUpdates", []);
};

Pedometer.prototype.stopPedometerUpdates = function (onSuccess, onError) {
    exec(onSuccess, onError, "Pedometer", "stopPedometerUpdates", []);
};

Pedometer.prototype.queryPedometerDataFromDate = function (date, onSuccess, onError) {
    exec(onSuccess, onError, "Pedometer", "queryPedometerDataFromDate", [date]);
};

module.exports = new Pedometer();

});
