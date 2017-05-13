package com.ak.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
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
import org.springframework.core.io.FileSystemResource;
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

import msaw.engine.helper.FilePaths;
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
		//return processmodeldemo;
		return new Fun0_sim().getSimulation();
	}



	@RequestMapping(value = RestURIConstants.GET_testing, method = RequestMethod.GET)
	public @ResponseBody String test(){
		logger.info("Get process model for optimal");
		System.out.println("dgfghjkjhgfdffghbjkjhgfdfghjk");
		String ee="yo";
		try{
			AIEngineHelper p=new AIEngineHelper();		
			ee=ee+p.testFile();
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
		AIEngineHelper p=new AIEngineHelper();		
		return p.getOptimalModelfromFile(pass);
	}
	@RequestMapping(value = RestURIConstants.GET_predictionAllCases, method = RequestMethod.GET)
	public @ResponseBody String getPredictionPM(@PathVariable("pass") String pass) {
		logger.info("Get process model for prediction");
		AIEngineHelper p=new AIEngineHelper();		
		return p.getPredictionModelfromFile(pass);
	}

	@RequestMapping(value = RestURIConstants.POST_getreasoning, method = RequestMethod.POST)
	public @ResponseBody String postGetReasoning(@RequestBody MProcessSet map) {
		logger.info("reasoning data");
		System.out.println("reasssssss");
		System.out.println(map.toString());
		AIEngineHelper p=new AIEngineHelper();		
		//return "fghhjhghgjhhkhjgh";
		return p.runReasoning(map);

	}
	@RequestMapping(value = RestURIConstants.POST_getsensitivity, method = RequestMethod.POST)
	public @ResponseBody String postGetSensitivity(@RequestBody MProcessSet map) {
		logger.info("sensitivity data");
		AIEngineHelper p=new AIEngineHelper();			
		return p.runSensitivity(map);
	}

	@RequestMapping(value = RestURIConstants.POST_prediction, method = RequestMethod.POST)
	public @ResponseBody String postToPrediction(@RequestBody MProcessSet map) {
		logger.info("prediction chart data");
		AIEngineHelper aihelper=new AIEngineHelper();
		return aihelper.runPrediction(map);
	}
	@RequestMapping(value = RestURIConstants.POST_optimal, method = RequestMethod.POST)
	public @ResponseBody String postToOptimal(@RequestBody MProcessSet map) {
		logger.info("prediction chart data");
		System.out.println("fxdghjbn vcfghjbnvcfgyjh");
		System.out.println(map.toString());


		AIEngineHelper aihelper=new AIEngineHelper();
		return aihelper.runOptimal(map);
		//return map.toString();
	}

	@RequestMapping(value = RestURIConstants.DOWNLOAD_csv_optimal, method = RequestMethod.GET)
	public @ResponseBody FileSystemResource downloadCSVoptimal(@PathVariable("pass") String pass,HttpServletResponse response ) throws Exception {
		response.setContentType("application/csv");      
        response.setHeader("Content-Disposition", "attachment; filename=OptimizationResultSets-"+pass+".csv"); 
		return new FileSystemResource(new File(FilePaths.F2_OPT_CSV()+"optimization-"+pass+".csv"));

	}
	@RequestMapping(value = RestURIConstants.GET_testDownload, method = RequestMethod.GET)
	public @ResponseBody FileSystemResource downloadtest(HttpServletResponse response ) throws Exception {
		response.setContentType("application/csv");      
        response.setHeader("Content-Disposition", "attachment; filename=yo.csv"); 
		return new FileSystemResource(new File(FilePaths.F2_OPT_CSV()+ "lala.csv"));

	}
	
	@RequestMapping(value = RestURIConstants.DOWNLOAD_csv_prediction, method = RequestMethod.GET)
	public @ResponseBody FileSystemResource downloadCSVprediction(@PathVariable("pass") String pass,HttpServletResponse response ) throws Exception {
		response.setContentType("application/csv");      
        response.setHeader("Content-Disposition", "attachment; filename=PredictionResultSets-"+pass+".csv"); 
		return new FileSystemResource(new File(FilePaths.F3_PRE_CSV()+"prediction-"+pass+".csv"));

	}




	@Override
	public void setServletContext(ServletContext arg0) {
		// TODO Auto-generated method stub
		this.context=arg0;
	}

}
