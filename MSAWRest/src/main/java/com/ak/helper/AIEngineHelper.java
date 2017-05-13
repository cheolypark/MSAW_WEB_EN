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

import msaw.engine.helper.FilePaths;
import msaw.engine.helper.Fun1_reas;
import msaw.engine.helper.Fun2_optimal;
import msaw.engine.helper.Fun3_prediction;
import msaw.engine.helper.Fun4_sensitivity;
import msaw.sim.core.MProcessSet;


public class AIEngineHelper {

	public String runPrediction(final MProcessSet map) {
		// TODO Auto-generated method stub

		System.out.println(map.toString());
		try{
		final String pass=map.passcode;
		File file=new File(FilePaths.F3_PRE_PROCESSSETS()+"prediction-"+pass+".txt");
		//String s=file.getAbsolutePath();
		
		if(!file.exists())
		{
			new Thread(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					new Fun3_prediction().startPrediction(map, pass);;
				}
			}).start();
			return "{\"success\":1}";
		}
		else
		{
			return "{\"success\":2}";
		}
		}catch (Exception e) {
			// TODO: handle exception
			return "{\"success\":2}";
		}

	}
	public String getPredictionModelfromFile(String pass)
	{
		String s="";
		try{
			File optFile = new File(FilePaths.F3_PRE_PROCESSSETS()+"prediction-"+pass+".txt");
	        if (!optFile.exists()) {
	        	 return "{\"ID\":\"nope\"}";//does not exist
	        }

	        System.out.println(pass);
	        System.out.println(optFile.exists());
	        System.out.println(optFile);
	        FileReader fr = new FileReader(optFile.getAbsoluteFile());
	        BufferedReader br= new BufferedReader(fr);
	        String sCurrentLine="";
	        while ((sCurrentLine = br.readLine()) != null) {
				s=s+(sCurrentLine);
			}
	        System.out.println(s);
	        br.close();
	        fr.close();
	        
	        new JSONObject(s);
	        return s;
        
	    } 
		catch (Exception e){
			e.printStackTrace();
			 //error in file.
		}
		return s;
	
	}
	
	
	public String runOptimal(final MProcessSet map) {
		// TODO Auto-generated method stub
		
		System.out.println(map.toString());
		try{
		final String pass=map.passcode;
		File file=new File(FilePaths.F2_OPT_PROCESSSETS()+"optimization-"+pass+".txt");
		//String s=file.getAbsolutePath();
		if(!file.exists())
		{
			new Thread(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					new Fun2_optimal().startOptimalValueFind(map, pass);
				}
			}).start();
			return "{\"success\":1}";
		}
		}
		catch (Exception e) {
		
			return "{\"success\":2}";
		}
		return "";
	}
	public String getOptimalModelfromFile(String pass)
	{
		String s="";
		try{
			File optFile = new File(FilePaths.F2_OPT_PROCESSSETS()+"optimization-"+pass+".txt");
	        if (!optFile.exists()) {
	        	 return "{\"ID\":\"nope\"}";//does not exist
	        }

	        System.out.println(pass);
	        System.out.println(optFile.exists());
	        System.out.println(optFile);
	        FileReader fr = new FileReader(optFile.getAbsoluteFile());
	        BufferedReader br= new BufferedReader(fr);
	        String sCurrentLine="";
	        while ((sCurrentLine = br.readLine()) != null) {
				s=s+(sCurrentLine);
			}
	        System.out.println(s);
	        br.close();
	        fr.close();
	        
	        new JSONObject(s);
	        return s;
        
	    } 
		catch (Exception e){
			e.printStackTrace();
			 //error in file.
		}

			
	    
		return s;
	
	}
	
	
	
	public String runReasoning(MProcessSet map){
		return new Fun1_reas().getReasoning(map);
	}
	
	public String runSensitivity(MProcessSet map){
		return new Fun4_sensitivity().getSensitivity(map);
	}
	public String testFile() {
		// TODO Auto-generated method stub
		return new Fun1_reas().testFile();
		
	}

	
	
	

}
