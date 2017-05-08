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
	String processmodeldemo= "{\r\n  \"ID\": \"MSAW_sim\",\r\n  \"targetVariables\": [],\r\n  \"processes\": [\r\n    {\r\n      \"ID\": \"SlabGenerator\",\r\n      \"output\": {\r\n        \"ID\": \"72\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"SlabGenerator.Steel_Grade\",\r\n            \"value\": \"50.9056122238389352\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Thickness\",\r\n            \"value\": \"55.35321052439074\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Width\",\r\n            \"value\": \"51.432688514481999\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Length\",\r\n            \"value\": \"57.4126650442368085\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Weight\",\r\n            \"value\": \"58.699202228639924\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Temperature\",\r\n            \"value\": \"57.842014014079368\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Temperature_Distribution\",\r\n            \"value\": \"57.8166639617841716\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Foreign_Substance\",\r\n            \"value\": \"51.9563126857486135\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Shape\",\r\n            \"value\": \"57.928083794876738\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.External_Defect\",\r\n            \"value\": \"51.3631888484973254\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          },\r\n          {\r\n            \"name\": \"SlabGenerator.Internal_Defect\",\r\n            \"value\": \"53.7341942829824593\",\r\n            \"mean\": 1.0,\r\n            \"variance\": 4.0\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"ID\": \"HeaterCON\",\r\n      \"output\": {\r\n        \"ID\": \"73\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"HeaterCON.NumberOfSlab\",\r\n            \"value\": \"57.969774967757513\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"HeaterCON.ProductionTime\",\r\n            \"value\": \"59.184496156068793\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"HeaterCON.FurnaceTemperature\",\r\n            \"value\": \"58.17716851730707\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"HeaterCON.HeaterTotalEnergy\",\r\n            \"value\": \"59.365499453714195\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"ID\": \"Heater\",\r\n      \"output\": {\r\n        \"ID\": \"74\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"Heater.Steel_Grade\",\r\n            \"value\": \"58.538876157787342\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Thickness\",\r\n            \"value\": \"57.344889873791801\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Width\",\r\n            \"value\": \"59.89978954503334\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Length\",\r\n            \"value\": \"50.06864850574369918\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Weight\",\r\n            \"value\": \"53.588368509982799\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Temperature\",\r\n            \"value\": \"59.493145378965819\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Temperature_Distribution\",\r\n            \"value\": \"59.75726612000744\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Foreign_Substance\",\r\n            \"value\": \"57.756953988718945\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Shape\",\r\n            \"value\": \"57.5132679067397135\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.External_Defect\",\r\n            \"value\": \"54.304831633049845\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          },\r\n          {\r\n            \"name\": \"Heater.Internal_Defect\",\r\n            \"value\": \"58.509001356192869\",\r\n            \"mean\": 2.0,\r\n            \"variance\": 8.0\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"ID\": \"RMCON\",\r\n      \"output\": {\r\n        \"ID\": \"75\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"RMCON.WorkRollDiameter\",\r\n            \"value\": \"57.072518959813436\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.BackupRollDiameter\",\r\n            \"value\": \"58.555575118575668\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.NumberOfJobsForWorkRoll\",\r\n            \"value\": \"52.8854838687283757\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.AmountOfWorkForWorkRoll\",\r\n            \"value\": \"55.332493671273117\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.WorkRollState\",\r\n            \"value\": \"55.533486348794108\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.BackupRollState\",\r\n            \"value\": \"58.100516637917524\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.OrderedThickness\",\r\n            \"value\": \"55.1281466170682455\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.OrderedWidth\",\r\n            \"value\": \"57.552475126920135\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.OrderedLength\",\r\n            \"value\": \"53.5610594255919246\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.OrderedTemperature\",\r\n            \"value\": \"59.560580082648586\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.PressureForce\",\r\n            \"value\": \"57.540196839904745\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.Torque\",\r\n            \"value\": \"55.996811752385069\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.RollGap\",\r\n            \"value\": \"59.833375561346926\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.RollingSpeed\",\r\n            \"value\": \"53.3222557211059778\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.PressureHardness\",\r\n            \"value\": \"58.18672138255971\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.ReductionAmount\",\r\n            \"value\": \"55.974593876683555\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.ReductionRate\",\r\n            \"value\": \"59.766829184595014\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.ReductionSpeed\",\r\n            \"value\": \"56.3495424938982605\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.ProductionTime\",\r\n            \"value\": \"51.9074953456313126\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.NumberOfPassing\",\r\n            \"value\": \"57.397223485828238\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RMCON.TotalEnergy\",\r\n            \"value\": \"50.09146139135199682\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"ID\": \"RM\",\r\n      \"output\": {\r\n        \"ID\": \"76\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"RM.Steel_Grade\",\r\n            \"value\": \"52.469911647682148\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Thickness\",\r\n            \"value\": \"54.286868162563176\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Width\",\r\n            \"value\": \"51.4012059819379352\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Length\",\r\n            \"value\": \"50.4655420606941052\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Weight\",\r\n            \"value\": \"52.1125671467188223\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Temperature\",\r\n            \"value\": \"55.990634662752679\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Temperature_Distribution\",\r\n            \"value\": \"54.98173983685092\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Foreign_Substance\",\r\n            \"value\": \"53.865492378123357\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Shape\",\r\n            \"value\": \"58.32547688887118\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.External_Defect\",\r\n            \"value\": \"50.03122729338780328\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          },\r\n          {\r\n            \"name\": \"RM.Internal_Defect\",\r\n            \"value\": \"59.60908708745926\",\r\n            \"mean\": 3.0000000000000004,\r\n            \"variance\": 12.000000000000004\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"ID\": \"FMCON\",\r\n      \"output\": {\r\n        \"ID\": \"77\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"FMCON.WorkRollDiameter\",\r\n            \"value\": \"51.0908063435901283\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.BackupRollDiameter\",\r\n            \"value\": \"59.266795222480116\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.NumberOfJobsForWorkRoll\",\r\n            \"value\": \"53.2823408321802097\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.AmountOfWorkForWorkRoll\",\r\n            \"value\": \"54.575103244582652\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.WorkRollState\",\r\n            \"value\": \"51.139648511033542\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.BackupRollState\",\r\n            \"value\": \"56.047933136540412\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.OrderedThickness\",\r\n            \"value\": \"50.13635673391402037\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.OrderedWidth\",\r\n            \"value\": \"50.9051908885596804\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.OrderedLength\",\r\n            \"value\": \"58.439319652740675\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.OrderedTemperature\",\r\n            \"value\": \"58.799675660178375\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.PressureForce\",\r\n            \"value\": \"50.5827063300303947\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.Torque\",\r\n            \"value\": \"57.071332351047901\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.RollGap\",\r\n            \"value\": \"59.95679837419419\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.RollingSpeed\",\r\n            \"value\": \"53.1393863258245815\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.PressureHardness\",\r\n            \"value\": \"57.182575408366469\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.ReductionAmount\",\r\n            \"value\": \"53.4547537318148724\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.ReductionRate\",\r\n            \"value\": \"50.06808015500320508\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.ReductionSpeed\",\r\n            \"value\": \"53.836479003907929\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.ProductionTime\",\r\n            \"value\": \"55.425118415534685\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.NumberOfPassing\",\r\n            \"value\": \"58.532150782677395\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FMCON.TotalEnergy\",\r\n            \"value\": \"58.73105524672567\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"ID\": \"FM\",\r\n      \"output\": {\r\n        \"ID\": \"78\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"FM.Steel_Grade\",\r\n            \"value\": \"52.4049762172326195\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Thickness\",\r\n            \"value\": \"59.772617008137022\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Width\",\r\n            \"value\": \"56.097313399828836\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Length\",\r\n            \"value\": \"58.985176480579915\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Weight\",\r\n            \"value\": \"50.5961185350876752\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Temperature\",\r\n            \"value\": \"53.3367815037911805\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Temperature_Distribution\",\r\n            \"value\": \"59.480361784078932\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Foreign_Substance\",\r\n            \"value\": \"53.092191318078088\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Shape\",\r\n            \"value\": \"52.3206229061046777\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.External_Defect\",\r\n            \"value\": \"52.575661952348235\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"FM.Internal_Defect\",\r\n            \"value\": \"55.689706059092777\",\r\n            \"mean\": 4.0,\r\n            \"variance\": 16.000000000000007\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"ID\": \"EstimatedResults\",\r\n      \"output\": {\r\n        \"ID\": \"79\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"EstimatedResults.EstimatedCost\",\r\n            \"value\": \"52.735719017125912\",\r\n            \"mean\": 5.0,\r\n            \"variance\": 20.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"EstimatedResults.EstimatedTime\",\r\n            \"value\": \"52.3993375741645084\",\r\n            \"mean\": 5.0,\r\n            \"variance\": 20.000000000000007\r\n          },\r\n          {\r\n            \"name\": \"EstimatedResults.EstimatedQuality\",\r\n            \"value\": \"59.660398077925336\",\r\n            \"mean\": 5.0,\r\n            \"variance\": 20.000000000000007\r\n          }\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"ID\": \"Total\",\r\n      \"output\": {\r\n        \"ID\": \"80\",\r\n        \"properties\": [\r\n          {\r\n            \"name\": \"Total.TotalEvaluationMeasure\",\r\n            \"value\": \"59.67723262724498\",\r\n            \"mean\": 5.999999999999999,\r\n            \"variance\": 24.00000000000001\r\n          }\r\n        ]\r\n      }\r\n    }\r\n  ]\r\n}";
	private static final Logger logger = LoggerFactory.getLogger(MyController.class);	
	
	@RequestMapping(value = RestURIConstants.GET_simulation, method = RequestMethod.GET)
	public @ResponseBody String getProcessModel() {
		logger.info("Get process model");
		return processmodeldemo;
		//return new Fun0_sim().getSimulation();
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
