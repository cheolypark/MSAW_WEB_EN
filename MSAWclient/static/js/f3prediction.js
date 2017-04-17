var color = ["#98df8a", "#7ec7e8", "#ffbb78","#7ec7e8","#ffbb78", "#7ec7e8","#ffbb78","#ffff99","#ffff99"];
var imgURLs={};
var data={};
var initialinput="";



var width = 1530,
    height = 250,
    imageScale = 0.25;

var cola = cola.d3adaptor(d3)
    .linkDistance(50)
    .avoidOverlaps(true)
    .size([width, height]);

var svg = d3.select("#svgdiv").append("svg")
    .attr("height", 900)
    .attr("width", 1350)
    .attr("pointer-events", "all")
    .attr("transform","scale(0.6)");

svg.append('rect')
    .attr('class', 'background')
    .attr('width', "100%")
    .attr('height', "100%")
    .style('border',"none")
    .call(d3.behavior.zoom().on("zoom", redraw))
    //.call(cola.drag)
    ;

var vis = svg
    .append('g')
    ;

var nodeMouseDown = false;

function redraw() {
    if (nodeMouseDown) return;
    vis.attr("transform", "translate(" + d3.event.translate + ")" 
        + " scale(" + d3.event.scale + ")");
}


var node = vis.selectAll(".node");
var attnode = vis.selectAll(".attnode");
var link = vis.selectAll(".link");
var group = vis.selectAll(".group");
var label = vis.selectAll(".label");
var labelH = vis.selectAll(".labelH");
var img = vis.selectAll(".imgC");

var gpad = 5;
var pad=0;

var constraintsData =  [
    {"type":"alignment",
     "axis":"y",
     "offsets":[
       {"node":0, "offset":0},//sg
       {"node":1, "offset":50},//sga
       {"node":2, "offset":300},//htrcon
       {"node":3, "offset":70},//htrcona
       {"node":4, "offset":0},//htr
       {"node":5, "offset":-270},//hta
       {"node":6, "offset":300},//rmcon
       {"node":7, "offset":70},//rmcona
       {"node":8, "offset":0},//rm
       {"node":9, "offset":-270},//rma
       {"node":10, "offset":300},//fmcon
       {"node":11, "offset":70},//fmcona
       {"node":12, "offset":0},//fm
       {"node":13, "offset":0},//fma
       {"node":14, "offset":-300},//est
       {"node":15, "offset":-260},//esta
       {"node":16, "offset":-180},//total
       {"node":17, "offset":-140}//totala
     ]},
    {"type":"alignment",
     "axis":"x",
     "offsets":[
       {"node":0, "offset":0},//sg
       {"node":1, "offset":0},//sga
       {"node":2, "offset":100},//htc
       {"node":3, "offset":100},//htca
       {"node":4, "offset":100},//ht
       {"node":5, "offset":150},//hta
       {"node":6, "offset":200},//rmc
       {"node":7, "offset":200},//rmca
       {"node":8, "offset":200},//rm
       {"node":9, "offset":250},//rma
       {"node":10, "offset":300},//fmc
       {"node":11, "offset":300},//fmca
       {"node":12, "offset":300},//fm
       {"node":13, "offset":400},//fma
       {"node":14, "offset":400},//e
       {"node":15, "offset":400},//ea
       {"node":16, "offset":400},//t
       {"node":17, "offset":400}//ta
     ]}
  ];

var constraintsData2 =  [
    {"type":"alignment",
     "axis":"y",
     "offsets":[
     ]},
    {"type":"alignment",
     "axis":"x",
     "offsets":[
     ]}
  ];
var mapping={};

var linksData=[
      
];

var hHeight=50;
var hWidth=200;
var aHeight=20;
var aWidth=245;

var procNamesData=[];
var attributesData=[];
var renderingNodesData2=[];
var groups=[];
var allNodesData2;

d3.json(BACKEND_URL+"simulation", function(err, j) {
    allNodesData2 = j.processes;
    initialinput=JSON.stringify(j);
    data["targetVariables"]=[];
    no();
    render();
});

function no(){
    var i=0;
    var TI=0;
    var len={};
    var l=[];
    allNodesData2.forEach(function(v){
        var x={};
        x.name=v.ID;
        x.value="";
        x.width=hWidth;
        x.height=hHeight;
        x.color=color[i];
        var i2=i*2;
       console.info(i2);
        var offsetxh = 2.7*constraintsData[1]["offsets"][i2].offset;
        var offsetyh = constraintsData[0]["offsets"][i2].offset;
        if(i2==2||i2==6||i2==10)
        {
            offsetyh = v.output.properties.length * aHeight +100;
        }
        var con = {};
        con['node'] = TI;
        con['offset'] = offsetyh;
        constraintsData2[0].offsets.push(con);
        con = {};
        con['node'] = TI;
        con['offset'] = offsetxh;
        constraintsData2[1].offsets.push(con);

       // console.info(TI+""+i);
        x.id=TI;
        procNamesData.push(x);
        renderingNodesData2.push(x);

        var offsetxa = 2.7*constraintsData[1]["offsets"][i2+1].offset;
        var offsetya = constraintsData[0]["offsets"][i2+1].offset;
        var c=0;

        linksData.push({"source":TI,"target":TI+1});

        mapping[""+(2*i)]=TI;
        mapping[""+(2*i +1)]=TI+1;
        
        TI++;
        i++;
        v.output.properties.forEach(function(a){
            
            var aname=a.name.split('.')[1];
            a.name=aname;
            a.group=x.name;
            a.width=aWidth;
            a.height=aHeight;
            a.color="#fff";
            attributesData.push(a);
            renderingNodesData2.push(a);

            var con = {};
            con['node'] = TI;
            con['offset'] = offsetya + (c++ * aHeight);
            constraintsData2[0].offsets.push(con);
            con = {};
            con['node'] = TI;
            con['offset'] = offsetxa;
            constraintsData2[1].offsets.push(con);
        
            l.push(TI);
            TI++;
        
        });
        groups.push({
            "leaves": l
        });
        l = [];

    });

    linksData.push({"source":mapping["1"],"target":mapping["4"]});
    linksData.push({"source":mapping["5"],"target":mapping["8"]});
    linksData.push({"source":mapping["9"],"target":mapping["12"]});
    linksData.push({"source":mapping["3"],"target":mapping["4"]});
    linksData.push({"source":mapping["7"],"target":mapping["8"]});
    linksData.push({"source":mapping["11"],"target":mapping["12"]});
}
function render() {
     cola.nodes(renderingNodesData2)
        .links(linksData)
        .groups(groups)
        .constraints(constraintsData2)
        ;

    cola.start(10,10,10);
    cola.on("tick", tick2);

    group = group.data(groups)
        .enter().append("rect")
        .attr("rx", 8).attr("ry", 8)
        .attr("class", "group")
        .style("fill", function(d, i) {
            return color[i];
        }).call(cola.drag)
    
    //  .call(cola.drag) 
    ;
    // group.exit().remove();

    link = link.data(linksData)
        .enter().insert("line", ".node").attr("class", "link")
        .attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.source.x;
        })
        .attr("y2", function(d) {
            return d.source.y;
        });
     //link.exit().remove();

    node = node.data(procNamesData)
        .enter().append("rect")
        .attr("width", function(d) {
            return d.width;
        })
        .attr("height", function(d) {
            return d.height;
        })
        // .attr("rx", 5).attr("ry", 5)
        .attr("class", "node")
        .style("fill", function(d, i) {
            return d.color;
        })
      .call(cola.drag)
    ;
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
            //if(d.group==procNamesData[4].name){
                data["outputTargetAttribute"]={"tag":d.group,"attribute":d.name};
                d3.selectAll(".attnode").transition()
                 .style("fill", function(d, i) {
                    return d.color;
                });
                d3.select(this).transition()
               .style("fill", function(d, i) {
                    return "#ffdd99";
                });
            

        })
    //  .call(cola.drag)
    ;

    //   node.exit().remove();
    label = label.data(attributesData, function(d) {
             return d.group+d.name;
        })
        .enter()
        .append("text")
        .attr("class", "label")
        .text(function(d) {
            if((d.group)==(procNamesData[0].name))
                return d.name + ": " + d.value.substring(0,d.value.length-12);
            return d.name + ": " + d.value.substring(0,d.value.length-12)   ;
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

function tick2() {

    console.info("tick");

    node
        .attr("x", function(d) {
            return d.x - d.width / 2 + pad;
        })
        .attr("y", function(d) {
            return d.y - d.height / 2 + pad;
        });
    attnode
        .attr("x", function(d) {
            return d.x - d.width / 2 + pad;
        })
        .attr("y", function(d) {
            return d.y - d.height / 2 + pad;
        });
    group
        .attr("x", function(d) {
            return d.bounds.x;
        })
        .attr("y", function(d) {
            return d.bounds.y;
        })
        .attr("width", function(d) {
            return d.bounds.width() + gpad;
        })
        .attr("height", function(d) {
            return d.bounds.height() + gpad;
        });
    link
        .attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        });
    label
        .attr("x", function(d) {
            return d.x - d.width/2 +4;
        })
        .attr("y", function(d) { //return d.y;
            var h = this.getBBox().height;
            return d.y + h / 4;
        });
    labelH
        .attr("x", function(d) {
            return d.x;
        })
        .attr("y", function(d) { //return d.y;
            var h = this.getBBox().height;
            return d.y + h / 4;
        });
    // img
    //     .attr("x", function(d) {
    //         return d.x + d.width/2 -d.height/2 -3;
    //     })
    //     .attr("y", function(d) {
    //         var h = this.getBBox().height;
    //         return d.y -h/2;
    //     });
}

data["inputs"]={};

data["inputs"]["optimise"]="max";
$(document).on("change","input[type=radio]",function(){
    var optimise=$('[name="optimise"]:checked').val();
    data["inputs"]["optimise"]="min";
    console.info(optimise);
});

$body = $("body");


function runPrediction()
{
    data["inputs"]=[];
    var lessthan=$("#lessthan").val();
    var morethan=$("#morethan").val();
    data.inputs.lessthan=lessthan;
    data.inputs.morethan=morethan;

    if(data["targetVariables"]==null)
    {
        alert("Select an output attribute for prediction and alarm analysis.");
    }
    else{
            var passcode=prompt("Please enter a unique code for this run.");
            if(passcode!=null)
            {
                data["passcode"]=passcode;
                //post data
                $body.addClass("loading");



                var postingData=JSON.parse(initialinput);
                postingData["targetVariables"]=data["targetVariables"];
                postingData["inputs"]=data["inputs"];
                postingData["passcode"]=data["passcode"];


                console.info("posting data: "+JSON.stringify(postingData));

                d3.xhr(BACKEND_URL+"prediction")
                    .header("Content-Type", "application/json")
                    .post(
                        JSON.stringify(postingData),
                        function(err, rawData){
                            console.info(rawData.response);
                            // j2= JSON.parse(rawData.response);
                            // allNodesData=j2.processes;
                            // updateAttrib(allNodesData);
            $body.removeClass("loading"); 

                            // update();
                        }
                    );

                alert("Your analysis is running. Come back after a while to retrieve your data.");
            
        }
    }
    console.info(JSON.stringify(data));

}

var processSets;

function getPrevPrediction(){
    var pass=prompt("Enter passcode to access your data.");
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
            getChartValues(j2);
            //setDownloadLink(j2.pathToCSV);
        
    });

   
    
}
function getChartValues(j){
    targetVariable=j.processSets[0].targetVariables[0];
    var caseValues={"values":[]};
    j.processSets.forEach(function(p){
        p.processes.forEach(function(pro){
            pro.output.properties.forEach(function(att){
                if(targetVariable==att.name){
                    caseValues.values.push(att.value);
                }
            });
        });
    });
    console.info('chart: '+JSON.stringify(caseValues));

    renderChart(caseValues.values);
}
function renderChart(caseValues)
{

    
    var no=caseValues.length;

    console.info("renderchart");
    var dataChart = {
        "start": 1,
        "end": no,
        "step": (no<12 ? 1 : no/10),
        "names": ["Item Flows"],
        "values": [caseValues]
    };


    $("#chart").html("");
    var l1 = new LineGraph({
        containerId: "chart",
        data: dataChart
    });


    
    var x = document.getElementById('chartButton');
    x.style.display = 'block';
    var y = document.getElementById('downloadButton');
    y.style.display = 'block';
}
function setDownloadLink(pathToCSV)
{
    $('#downloadButton').attr("href", pathToCSV);
}
function showChart()
{
    
     $('#dialogChart').dialog({
            modal: true,
            width: 400,
            height: 405,
            dialogClass: "dlg-no-title",

            buttons:{
                 Select_case : function() {
                    var caseId = $('#ipcase').val();
                    console.info("case selected"+caseId);
                    getCaseData(caseId);
                    $(this).dialog("close"); 

                },
                 Close : function() {
                    $(this).dialog("close"); 

                }
            }
        }
    ); 
     //getcaseanalysis
}

function getCaseData(caseId) {
            
    allNodesData=processSets[caseId];
    updateAttrib(allNodesData.processes);

    update();
    console.info("Process Model updated for case: "+caseId);
}

function update() {
    label.data(attributesData)
        .transition()
        .delay(500)
        .text(function(d) {
            return d.name + ": "+d.value.substring(0,d.value.length-12);
        });

    attnode.data(attributesData)
        .transition()
        .duration(750)
        .styleTween("fill", function(d) {
            if(d.group!=procNamesData[0].name)
                 return d3.interpolate("#ffffff", "#ffffcc");
            else
                return;
         });
}

function updateAttrib(allNodesData)
{
    var k=0;
    allNodesData.forEach(function(v){
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