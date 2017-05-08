package com.ak.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.json.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;

import com.ak.helper.AIEngineHelper;
import com.ak.model.Book1;
import com.ak.model.ProcessModel;
import com.ak.utils.ProjectConstants;
import com.ak.utils.RestURIConstants;

import msaw.engine.helper.Fun0_sim;
import msaw.sim.core.MProcessSet;
import msaw.sim.core.MProperty;

@Controller
public class MyController implements ServletContextAware{
	@Autowired
    ServletContext context; 
	private static final Logger logger = LoggerFactory.getLogger(MyController.class);	
	
	@RequestMapping(value = RestURIConstants.GET_simulation, method = RequestMethod.GET)
	public @ResponseBody String getProcessModel() {
		logger.info("Get process model");
		
		return new Fun0_sim().getSimulation();
	}

	

	@RequestMapping(value = RestURIConstants.GET_testing, method = RequestMethod.GET)
	public @ResponseBody String test(){
		logger.info("Get process model for optimal");
		System.out.println("dgfghjkjhgfdffghbjkjhgfdfghjk");
		String ee="yo";
		try{
			File dir=new File("./yo/");
			ee=dir.getAbsolutePath();
			if(!dir.exists()){
				ee=ee+dir.mkdir();
			}
			//new Fun2_optimal().startOptimalValueFind(new MProcessSet(), "msaw");
			
		}
		catch(Exception e){
			ee=e.getMessage();
		}
		return ee;
	}
	@RequestMapping(value = RestURIConstants.POST_yo, method = RequestMethod.POST)
	public @ResponseBody Book1 testYO(@RequestBody Book1 book){
		logger.info("Get process model for optimal");
		System.out.println("dgfghjkjhgfdffghbjkjhgfdfghjk");
		book.booknames.add(null);
		book.booknames.add(null);
		return book;
	}
	
	@RequestMapping(value = RestURIConstants.GET_optimalAllCases, method = RequestMethod.GET)
	public @ResponseBody String getOptimalPM(@PathVariable("pass") String pass) {
		logger.info("Get process model for optimal");
		System.out.println("dgfghjkjhgfdffghbjkjhgfdfghjk");
		ProcessModel p=new ProcessModel();		
		return p.getOptimalModelfromFile(pass);
	}
	@RequestMapping(value = RestURIConstants.GET_predictionAllCases, method = RequestMethod.GET)
	public @ResponseBody String getPredictionPM(@PathVariable("pass") String pass) {
		logger.info("Get process model for prediction");
		ProcessModel p=new ProcessModel();		
		return p.getOptimalModelfromFile(pass);
	}

	@RequestMapping(value = RestURIConstants.POST_getreasoning, method = RequestMethod.POST)
	public @ResponseBody String postGetReasoning(@RequestBody MProcessSet map) {
		logger.info("reasoning data");
		System.out.println("reasssssss");
		System.out.println(map.toString());
		ProcessModel p=new ProcessModel();
		//return "fghhjhghgjhhkhjgh";
		return p.getReasoning(map);
		
	}
	@RequestMapping(value = RestURIConstants.POST_getsensitivity, method = RequestMethod.POST)
	public @ResponseBody String postGetSensitivity(@RequestBody MProcessSet map) {
		logger.info("sensitivity data");
		ProcessModel p=new ProcessModel();		
		return p.getSensitivity(map);
	}

	@RequestMapping(value = RestURIConstants.POST_prediction, method = RequestMethod.POST)
	public @ResponseBody String postToPrediction(@RequestBody Map<String, Object> map) {
		logger.info("prediction chart data");
		AIEngineHelper aihelper=new AIEngineHelper();
		return aihelper.runPrediction(ProjectConstants.getFilePath(context),map);
	}
	@RequestMapping(value = RestURIConstants.POST_optimal, method = RequestMethod.POST)
	public @ResponseBody String postToOptimal(@RequestBody MProcessSet map) {
		logger.info("prediction chart data");
		AIEngineHelper aihelper=new AIEngineHelper();
		return aihelper.runOptimal(map);
	}
	
//	
//	@RequestMapping(value = RestURIConstants.GET_predictionChart, method = RequestMethod.GET)
//	public @ResponseBody String getPredictionChart(@PathVariable("pass") String pass) {
//		logger.info("Get chart for prediction"+pass);
//		ProcessModel p=new ProcessModel();		
//		return p.getPredictionChartfromFile(ProjectConstants.getFilePath(context),pass);
//	}
//	@RequestMapping(value = RestURIConstants.GET_optimalChart, method = RequestMethod.GET)
//	public @ResponseBody String getOptimalChart(@PathVariable("pass") String pass) {
//		logger.info("Get chart for optimal"+pass);
//		ProcessModel p=new ProcessModel();		
//		return p.getOptimalChartfromFile(ProjectConstants.getFilePath(context),pass);
//	}
//	
	@RequestMapping(value = RestURIConstants.DOWNLOAD_csv_optimal, method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> downloadCSV(@PathVariable("pass") String pass ) {
 
//        String csvFileName = "books.csv";
 
        HttpHeaders headers = new HttpHeaders();
	    headers.add("Content-Type", "text/csv");
	   // headers.add("Content-Disposition", "attachment; filename=\""+csvFileName+"\"");
	    String data2="1,2,3";
	    return new ResponseEntity<String>(data2,headers,HttpStatus.OK);
    }

	
	//
//	public @ResponseBody ResponseEntity<String> getSim() {
//		logger.info("Get Simuation");
//		HttpHeaders headers = new HttpHeaders();
//	    headers.add("Content-Type", "application/json; charset=UTF-8");
//	    headers.add("Refresh", "1");
//		Calendar calendar = new GregorianCalendar();
//		String am_pm;
//		int hour = calendar.get(Calendar.HOUR);
//		int minute = calendar.get(Calendar.MINUTE);
//		int second = calendar.get(Calendar.SECOND);
//		String data2="{\n    \"nodes\":[\n      {\"tag\":\"Input\",\"array\":[\n          {\"name\":\"i11\",\"value\":"+second+"},\n          {\"name\":\"i12\",\"value\":1},\n          {\"name\":\"i13\",\"value\":1}\n      ]},\n      {\"tag\":\"Process 1\",\"array\":[\n      ]},\n      {\"tag\":\"Process 2\",\"array\":[\n      ]},\n      {\"tag\":\"Output\",\"array\":[\n          {\"name\":\"o11\",\"value\":1},\n          {\"name\":\"o12\",\"value\":1},\n          {\"name\":\"o13\",\"value\":1}\n      ]},\n      {\"tag\":\"Control 1\",\"array\":[\n          {\"name\":\"c11\",\"value\":1},\n          {\"name\":\"c12\",\"value\":1}\n      ]},\n      {\"tag\":\"Control 2\",\"array\":[\n          {\"name\":\"c21\",\"value\":1},\n          {\"name\":\"c22\",\"value\":1}\n      ]},\n      {\"tag\":\"Item\",\"array\":[\n          {\"name\":\"it1\",\"value\":1},\n          {\"name\":\"it2\",\"value\":1}\n      ]}\n    ],\n    \"links\":[\n      {\"source\":0,\"target\":1},\n      {\"source\":1,\"target\":2},\n      {\"source\":2,\"target\":3},\n      {\"source\":4,\"target\":1},\n      {\"source\":5,\"target\":2},\n      {\"source\":6,\"target\":1},\n      {\"source\":6,\"target\":2}\n    ],\n  \"constraints\":[\n    {\"type\":\"alignment\",\n     \"axis\":\"y\",\n     \"offsets\":[\n       {\"node\":0, \"offset\":0},\n       {\"node\":1, \"offset\":0},\n       {\"node\":2, \"offset\":0},\n       {\"node\":3, \"offset\":0},\n       {\"node\":5, \"offset\":100},\n       {\"node\":4, \"offset\":100},\n       {\"node\":6, \"offset\":-150}\n     ]},\n    {\"type\":\"alignment\",\n     \"axis\":\"x\",\n     \"offsets\":[\n       {\"node\":0, \"offset\":0},\n       {\"node\":1, \"offset\":200},\n       {\"node\":2, \"offset\":400},\n       {\"node\":3, \"offset\":600},\n       {\"node\":4, \"offset\":200},\n       {\"node\":5, \"offset\":400},\n       {\"node\":6, \"offset\":300}\n     ]}\n  ]\n}";
//		return new ResponseEntity<String>(data2,headers,HttpStatus.OK);
//	}

	
	
	@Override
	public void setServletContext(ServletContext arg0) {
		// TODO Auto-generated method stub
		this.context=arg0;
	}
	
}
