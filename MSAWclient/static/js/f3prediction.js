data["inputs"]={};
function rendernext(argument) {
    attnode = attnode.data(attributesData)
        .enter().append("rect")
        .attr("width", function(d) {
            return d.width;
        })
        .attr("height", function(d) {
            return d.height;
        })
        // .attr("rx", 5).attr("ry", 5)
        .attr("class", "attnode")
        .style("fill", function(d, i) {
            return d.color;
        })
        .on("click",function(d){
                var index=getIndex(data["targetVariables"],(d.group+"."+d.name));
                if(index==-1)
                {
                    console.info("adding "+d.group+"."+d.name);
                    data["targetVariables"].push({name:d.group+"."+d.name, lessthan:0,morethan:0});
                }
                else{
                    removeElement(data["targetVariables"],index);
                    console.info("after removing"+JSON.stringify(data["targetVariables"]));
                }
                $('#consoletextinputP').val(JSON.stringify(data["targetVariables"]));

                d3.select(this).transition()
                .style("fill", function(d, i) {
                    var index=getIndex(data["targetVariables"],d.group+"."+d.name);
                    if(index==-1)
                    {
                        return "#fff";
                    }
                    else{            
                        return "#ffe6b3";}
                });
            

        })
        .call(cola.drag);

    label = label.data(attributesData, function(d) {
             return d.group+d.name;
        })
        .enter()
        .append("text")
        .attr("class", "label")
        .text(function(d) {
            if((d.group)==(procNamesData[0].name))
                //return d.name + ": " + d.value.substring(0,d.value.length-12);
                return d.name + ": " + d.value;
            return d.name + ": "    ;
        })
        .call(cola.drag);

    labelH = labelH.data(procNamesData, function(d) {
            return d.name;
        })
        .enter()
        .append("text")
        .attr("class", "labelH")
        .text(function(d) {
            return d.name;
        })
        .call(cola.drag);
}

function getIndex(jsonArray,groupname)
{
    var i=-1,c=0;
    jsonArray.forEach(function(v){
        
        if(v.name==groupname)
        {
           // console.info("contains "+v.name+"  "+name);
            i=c;  
        }
        c++;
    });
    return i;
}
function removeElement(jsonArray, index)
{
    var d=[]; var i=0;
    data["targetVariables"].forEach(function(v){
        //console.info(JSON.stringify(v));
        if(i!=index)
            d.push(v);
        i++;
    });
    data["targetVariables"]=d;
}



function runPrediction()
{

    var itemFlow=parseInt($("#itemFlow").val());
    if(data["targetVariables"]==null)
    {
        alert("Select an output attribute for prediction and alarm analysis.");
    }
    else{
        if(itemFlow==0)
            alert("Number of item flows cannot be empty. Enter an integer.");
        else{
            data["inputs"]["itemFlows"]=itemFlow;

            var passcode=prompt("Please enter a unique code for this run.");
            if(passcode!=null)
            {
                data["passcode"]=passcode;

                var postingData=JSON.parse(initialinput);
                postingData["targetVariables"]=data["targetVariables"];
                postingData["inputs"]=data["inputs"];
                postingData["passcode"]=data["passcode"];
                
                console.info("posting data: "+JSON.stringify(postingData));
                //$body.addClass("loading");

                d3.xhr(BACKEND_URL+"prediction")
                    .header("Content-Type", "application/json")
                    .post(
                        JSON.stringify(postingData),
                        function(err, rawData){

                            //$body.removeClass("loading"); 
                            console.info(rawData.response);

                            var j2= JSON.parse(rawData.response);
                            if(j2.success==1)
                                alert("Your analysis is running. Come back after a while to retrieve your data.");
                            else if (j2.success==2)
                            {
                                alert("This passcode is taken. Please use a different passcode.");
                                runPrediction();
                            }
                            }
                    );

                //$body.removeClass("loading"); 
            }
        }
    }
    //console.info(JSON.stringify(data));

}

var processSets;
var nSets;

var pass;
function getPrevPrediction(){
    pass=prompt("Enter passcode to access your data.");
    //get json for chart.
    //chart se select kar ke get attribs

    // d3.json(BACKEND_URL+"optimalChart/"+pass,function(err, j) {          
    //     var ready=1;
    //     if(ready==0)
    //         alert("Analysis not ready yet.\n Please come back after a while.");
    //     else if(ready==9)
    //         alert("No data for such passcode.");
    //     else{
    //         var caseValues=j.values;
    //         //var xAxis=j.xAxis;
    //         renderChart();
    //     }
    // });
    d3.json(BACKEND_URL+"allprediction/"+pass,function(err, j2) {          
            processSets=j2.processSets;
            //console.info(JSON.stringify(processSets[0]));
            nSets=j2.processSets.length;
            getChartValues(j2);
            //setDownloadLink(j2.pathToCSV);
        
    });

   
    
}
function getChartValues(j){
    targetVariable=j.processSets[0].targetVariables[0];
    console.info(JSON.stringify(targetVariable)+" targetVariable");

    var pr=targetVariable.name.split('.')[0];

    var caseValues=[];
    j.processSets.forEach(function(p){
        console.info(p.ID);
        p.processes.forEach(function(pro){
            console.info(pro.ID);
            if(pro.ID==pr)
                pro.output.properties.forEach(function(att){
                    //console.info();
                    console.info(JSON.stringify(att));
                       
                    if(targetVariable.name==att.name){
                       caseValues.push(parseFloat(att.value));
                    }
                });
        });
    
    });
    console.info('chart: '+JSON.stringify(caseValues));

    //caseValues=[2.5,4.34,7.654,5.234,5.23,4.23,3.23,3.1,4.12,7.234,5.23,4.123,3.12];
    var textX="Item Flow";
    var textY=targetVariable.name;

    RenderGraph(caseValues,textY,textX);
    
    var x = $('#showButton').show();
    var x = $('#downloadButton').show();
}
function download()
{
    window.location.replace(DOWNLOAD_URL_prediction+pass);
    //$('#downloadButton').attr("href", pathToCSV);
}
function showChart()
{
     $('#dialogChart').dialog({
            modal: true,
            width: 550,
            height: 530,
            dialogClass: "dlg-no-title",

            buttons:{
                 Select_case : function() {
                    var caseId = parseInt($('#ipcase').val());
                    console.info("case selected"+caseId);
                    if(caseId<1 || caseId > nSets)
                        $("p:last").text("Invalid item flow number.");
                    else
                    {
                        getCaseData((caseId-1));
                        $(this).dialog("close"); 
                    }


                },
                 Close : function() {
                    $(this).dialog("close"); 

                }
            }
        }); 
     //getcaseanalysis
}

function getCaseData(caseId) {
            
    var newProcD=processSets[caseId];
    updateAttrib(newProcD.processes);

    update();
    console.info("Process Model updated for case: "+caseId);
}

function update() {
    label.data(attributesData)
        .transition()
        .delay(500)
        .text(function(d) {
            return d.name + ": "+d.value;
        });

    attnode.data(attributesData)
        .transition()
        .duration(750)
        .styleTween("fill", function(d) {
                 return d3.interpolate("#ffffff", "#ffffcc");
         });
}

function updateAttrib(newProcS)
{
    var k=0;
    newProcS.forEach(function(v){
        // v.output.properties.forEach(function(v){
        //     attributesData[k++]=n;
        // });

        v.output.properties.forEach(function(a){

            var aname=a.name.split(".")[1];
            a.name=aname;
            // console.info(a);
            a.group=v.ID;
            a.width=aWidth;
            a.height=aHeight;
            a.color="#fff";
//            a.id=TI;
            attributesData[k++]=(a);
        });
        

    });

}