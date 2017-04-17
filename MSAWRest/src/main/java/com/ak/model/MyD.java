
package com.ak.model;

import java.io.Serializable;
import java.util.ArrayList;

import org.json.JSONObject;


public class MyD implements Serializable{

	private static final long serialVersionUID = -7788619177798333712L;

	private ArrayList<NVPair> OutputAttributes;
	private ArrayList<JSONObject> thresholds;
	private JSONObject initialinput;
	
	public ArrayList<NVPair> getOutputAttributes() {
		return OutputAttributes;
	}
	public void setOutputAttributes(ArrayList<NVPair> outputAttributes) {
		OutputAttributes = outputAttributes;
	}
	public ArrayList<JSONObject> getThresholds() {
		return thresholds;
	}
	public void setThresholds(ArrayList<JSONObject> thresholds) {
		this.thresholds = thresholds;
	}
	public JSONObject getInitialinput() {
		return initialinput;
	}
	public void setInitialinput(JSONObject initialinput) {
		this.initialinput = initialinput;
	}
}

