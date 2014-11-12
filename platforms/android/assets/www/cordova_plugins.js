cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/edu.cornell.stepometer/www/stepometer.js",
        "id": "edu.cornell.stepometer.Stepometer"
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "edu.cornell.stepometer": "0.2.10",
    "org.apache.cordova.console": "0.2.11",
    "org.apache.cordova.splashscreen": "0.3.5-dev"
}
// BOTTOM OF METADATA
});