var Stepometer = {
	subscribe: function(callback) {
		cordova.exec(callback, function(err) { }, "Stepometer", "subscribe", []);
	}
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.stepometer) {
    window.plugins.stepometer = Stepometer;
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = Stepometer;
}