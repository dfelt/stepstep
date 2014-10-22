package edu.cornell.stepometer;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.util.Log;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;

public class Stepometer extends CordovaPlugin implements StepListener {
	private final String TAG = "Stepometer";
	
	StepDetector mStepDetector;
	SensorManager mSensorManager;
	Sensor mSensor;
	CallbackContext mCallbackContext;
	
	@Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
		mStepDetector = new StepDetector();
        mSensorManager = (SensorManager) cordova.getActivity().getSystemService(Context.SENSOR_SERVICE);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        mCallbackContext = callbackContext;
    	if (action.equals("subscribe")) {
    		Log.d(TAG, "subscribing");
    		subscribe();
    		return true;
        }
        return false;
    }
    
    private void subscribe() {
        mSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        mSensorManager.registerListener(mStepDetector, mSensor, SensorManager.SENSOR_DELAY_FASTEST);
    	mStepDetector.addStepListener(this);
    }

	@Override
	public void onStep() {
        PluginResult result = new PluginResult(PluginResult.Status.OK);
        result.setKeepCallback(true);
        mCallbackContext.sendPluginResult(result);
	}

	@Override
	public void passValue() {
	}
}
