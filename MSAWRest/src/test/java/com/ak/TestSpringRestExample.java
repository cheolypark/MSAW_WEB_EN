package com.ak;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.web.client.RestTemplate;

import com.ak.model.MyD;
import com.ak.utils.RestURIConstants;

public class TestSpringRestExample {

	public static final String SERVER_URI = "http://localhost:9090/aakarshika";
	
	public static void main(String args[]){
		
		testGetDummyEmployee();
		System.out.println("*****");
		testCreateEmployee();
		System.out.println("*****");
		testGetEmployee();
		System.out.println("*****");
		testGetAllEmployee();
	}

	private static void testGetAllEmployee() {
		RestTemplate restTemplate = new RestTemplate();
		//we can't get List<Employee> because JSON convertor doesn't know the type of
		//object in the list and hence convert it to default JSON object type LinkedHashMap
		List<LinkedHashMap> emps = restTemplate.getForObject(SERVER_URI+RestURIConstants.GET_ALL_EMP, List.class);
		System.out.println(emps.size());
		for(LinkedHashMap map : emps){
			System.out.println("ID="+map.get("id")+",Name="+map.get("name")+",CreatedDate="+map.get("createdDate"));;
		}
	}

	private static void testCreateEmployee() {
		RestTemplate restTemplate = new RestTemplate();
		MyD emp = new MyD();
		MyD response = restTemplate.postForObject(SERVER_URI+RestURIConstants.CREATE_EMP, emp, MyD.class);
		printEmpData(response);
	}

	private static void testGetEmployee() {
		RestTemplate restTemplate = new RestTemplate();
		MyD emp = restTemplate.getForObject(SERVER_URI+"/rest/emp/1", MyD.class);
		printEmpData(emp);
	}

	private static void testGetDummyEmployee() {
		RestTemplate restTemplate = new RestTemplate();
		MyD emp = restTemplate.getForObject(SERVER_URI+RestURIConstants.DUMMY_EMP, MyD.class);
		printEmpData(emp);
	}
	
	public static void printEmpData(MyD emp){
		System.out.println("OA="+emp.getOutputAttributes());
	}
}
