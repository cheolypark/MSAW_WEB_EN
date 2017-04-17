package com.ak.model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.internal.matchers.StringContains;

import com.ak.helper.AIEngineHelper;

import msaw.engine.helper.FilePaths;

public class ProcessModel
{
	
	public String getOptimalModelfromFile(String pass)
	{
		String s="";
		try{
			File optFile = new File(FilePaths.F2_OPT_PROCESSSETS()+"optimization-"+pass+".txt");
	        if (!optFile.exists()) {
	        	//passcode doesnt exist
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
	        
	        JSONObject jobj= new JSONObject(s);
        
	    } 
		catch (IOException e){
			e.printStackTrace();
		}
		catch( JSONException e){
	    	e.printStackTrace();
	    }
		return s;
	
	}
	public String getPredictionModelfromFile(String pass)
	{
		String s="";
		try{
			File optFile = new File(FilePaths.F3_PRE_PROCESSSETS()+"prediction"+pass+".txt");
	        if (!optFile.exists()) {
	        	//passcode doesnt exist
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
	        
	        JSONObject jobj= new JSONObject(s);
        
	    } catch (IOException e){
	    	e.printStackTrace();
	    }catch( JSONException e){
	    	e.printStackTrace();
	    }
		return s;
	
	}
	public String getReasoning(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return new AIEngineHelper().runReasoning(map);
	}
	public String getSensitivity(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return new AIEngineHelper().runSensitivity(map);
	}
//	public String getPredictionChartfromFile(String filePath, String pass) {
//		return "";
//	}
//	public String getOptimalChartfromFile(String path, String pass) {
//		// TODO Auto-generated method stub
//		String s="";
//		try{
//			File optFile = new File(path, "Function2_Optimizing/Chart/prediction-"+pass+".txt");
//	        if (!optFile.exists()) {
//	        	//passcode doesnt exist
//	        }
//
//	        System.out.println(pass);
//	        System.out.println(optFile.exists());
//	        System.out.println(optFile);
//	        FileReader fr = new FileReader(optFile.getAbsoluteFile());
//	        BufferedReader br= new BufferedReader(fr);
//	        String sCurrentLine="";
//	        while ((sCurrentLine = br.readLine()) != null) {
//				s=s+(sCurrentLine);
//			}
//	        System.out.println(s);
//	        br.close();
//	        fr.close();
//	        
//	        JSONObject jobj= new JSONObject(s);
//        
//	    } catch (IOException e){}catch( JSONException e){
//	    	e.printStackTrace();
//	    }
//		return s;
//	}

}