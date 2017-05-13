package com.ak.utils;

import java.io.File;

public class RestURIConstants {

	

//	public static final String GET_ProcessModel = "/processmodel";
	
	public static final String POST_getreasoning = "/reasoning";
	public static final String POST_getsensitivity = "/sensitivity";

	
	public static final String POST_prediction = "/prediction";
	public static final String POST_optimal = "/optimal";
	
	public static final String GET_predictionChart = "/predictionChart/{pass}";
	public static final String GET_optimalChart = "/optimalChart/{pass}";
	
	public static final String GET_simulation = "/simulation";

	public static final String POST_yo = "/yo";
	public static final String GET_testing = "/test";
	public static final String GET_testDownload = "/testdownload";
	
	
	public static final String GET_optimalAllCases = "/alloptimal/{pass}";
	public static final String GET_predictionAllCases = "/allprediction/{pass}";
	
	public static final String DOWNLOAD_csv_prediction = "/downloadprediction/{pass}";
	public static final String DOWNLOAD_csv_optimal = "/downloadoptimal/{pass}";
	
	
	public static final String DUMMY_EMP = "/yo";
	public static final String GET_EMP = "/rest/emp/{id}";
	public static final String GET_ALL_EMP = "/rest/emps";
	public static final String CREATE_EMP = "/rest/emp/create";
	public static final String DELETE_EMP = "/rest/emp/delete/{id}";
}
