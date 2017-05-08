package com.ak.helper;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.ak.model.ProcessModel;

import msaw.engine.helper.Fun1_reas;
import msaw.engine.helper.Fun2_optimal;
import msaw.engine.helper.Fun3_prediction;
import msaw.engine.helper.Fun4_sensitivity;
import msaw.sim.core.MProcessSet;


public class AIEngineHelper {

	public String runPrediction(String path, Map<String, Object> map) {
		// TODO Auto-generated method stub

			return "{\"success\":1}";

	}
	
	public String runOptimal(MProcessSet map) {
		// TODO Auto-generated method stub


		//call a method in ai engine with parameters: map- target attributes, input attributes
		
		System.out.println(map.toString());
		String pass=map.passcode;
		
		new Fun2_optimal().startOptimalValueFind(map, pass);
//		try{
//			File dirFile = new File(path, "files");
//	        if (!dirFile.exists()) {
//	        	dirFile.mkdir();
//	        }
//			File predFile = new File(path, "optimal-"+pass+"-chart.txt");
//	        if (!predFile.exists()) {
//	        	predFile.createNewFile();
//	        }
//	        FileWriter fw = new FileWriter(predFile.getAbsoluteFile());
//	        BufferedWriter bw= new BufferedWriter(fw);
//	        bw.write("{\"ready\":1,");
//	        bw.write("\"values\":[25.3,65.3,51,15.6,65.3],\"passcode\":\""+pass+"\"}");
//
//	        bw.close();
//	        fw.close();
//	        
//	        File predCaseFile; 
//	        
//	        for(int i=0;i<5;i++)
//	        {
//	        	fw = new FileWriter(predFile.getAbsoluteFile());
//		        bw= new BufferedWriter(fw);
//		        
//	        	predCaseFile= new File(path, "optimal-"+pass+"-"+i+".txt");
//		        predFile.createNewFile();
//		        bw.write(getSimulation());		        
//
//		        bw.close();
//		        fw.close();
//
//	        }
//	        

			return "{\"success\":1}";
	  
	}
	
	public String runReasoning(MProcessSet map){
		return new Fun1_reas().getReasoning(map);
	}
	
	public String runSensitivity(MProcessSet map){
		return new Fun4_sensitivity().getSensitivity(map);
	}

	public String getSimulation() {
		
		return ""
				+ "{    \"nodes\":[      {\"tag\":\"Input\",\"attributes\":[          {\"name\":\"i"+((int)(Math.random()*10))+""+((int)(Math.random()*10))+"\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"i"+((int)(Math.random()*10))+"2\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"i"+((int)(Math.random()*10))+"3\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"}      ]},      {\"tag\":\"Process "+((int)(Math.random()*10))+": Heater\",\"attributes\":[      ]},      {\"tag\":\"Process 2: Roughing Mill\",\"attributes\":[      ]},      {\"tag\":\"Process 3: Finishing Mill\",\"attributes\":[      ]},      {\"tag\":\"Output\",\"attributes\":[          {\"name\":\"o"+((int)(Math.random()*10))+""+((int)(Math.random()*10))+"\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"o"+((int)(Math.random()*10))+"2\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"o"+((int)(Math.random()*10))+"3\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"}      ]},      {\"tag\":\"Control "+((int)(Math.random()*10))+"\",\"attributes\":[          {\"name\":\"c"+((int)(Math.random()*10))+""+((int)(Math.random()*10))+"\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"c"+((int)(Math.random()*10))+"2\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"}      ]},      {\"tag\":\"Control 2\",\"attributes\":[          {\"name\":\"c2"+((int)(Math.random()*10))+"\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"c22\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"}      ]},      {\"tag\":\"Control 3\",\"attributes\":[          {\"name\":\"c2"+((int)(Math.random()*10))+"\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"c22\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"}      ]},      {\"tag\":\"Item "+((int)(Math.random()*10))+"\",\"attributes\":[          {\"name\":\"it"+((int)(Math.random()*10))+"\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"it2\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"}      ]},      {\"tag\":\"Item 2\",\"attributes\":[          {\"name\":\"it"+((int)(Math.random()*10))+"\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"},          {\"name\":\"it2\",\"value\":"+((int)(Math.random()*10))+",\"iconType\":"+((int)(Math.random()*10))+"}      ]}    ]}"
				+ "";
	}


}
