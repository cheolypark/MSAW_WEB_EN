package com.ak.utils;

import java.io.IOException;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.ServletContextAware;

public class ProjectConstants {

	public static String getFilePath(ServletContext context) {
		// TODO Auto-generated method stub

		String path = context.getRealPath("/");
        //System.out.println(path);
		return "/home/aakarshika/w/engine/MSAW_ENGINE/MSAW_ENGINE/";
	}
	
	
}
