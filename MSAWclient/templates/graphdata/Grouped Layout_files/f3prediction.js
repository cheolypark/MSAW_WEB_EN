var color = ["#ffcccc", "#7ec7e8", "#7ec7e8","#7ec7e8", "#ffbb78", "#98df8a", "#98df8a", "#98df8a", "#aa80ff", "#aa80ff"];

var data={};

var l1;

var nodesData;
var linksData;
var attributes;
var headings;
var conData = [
    {"type":"alignment",
     "axis":"y",
     "offsets":[
       {"node":0, "offset":0},
       {"node":1, "offset":0},
       {"node":2, "offset":0},
       {"node":3, "offset":0},
       {"node":4, "offset":0},
       {"node":5, "offset":50},
       {"node":6, "offset":50},
       {"node":7, "offset":50},
       {"node":8, "offset":-150},
       {"node":9, "offset":-150}
     ]},
    {"type":"alignment",
     "axis":"x",
     "offsets":[
       {"node":0, "offset":0},
       {"node":1, "offset":150},
       {"node":2, "offset":300},
       {"node":3, "offset":450},
       {"node":4, "offset":600},
       {"node":5, "offset":150},
       {"node":6, "offset":300},
       {"node":7, "offset":450},
       {"node":8, "offset":225},
       {"node":9, "offset":375}
     ]}
  ];
  var conData2=[
    {"type":"alignment",
     "axis":"y",
     "offsets":[
     ]},
    {"type":"alignment",
     "axis":"x",
     "offsets":[
     ]}
  ];


var width = 1000,
    height = 400,
    imageScale = 0.25;

var cola = cola.d3adaptor(d3)
    .linkDistance(50)
    .avoidOverlaps(true)
    .size([width, height]);

var svg = d3.select("#svgdiv").append("svg")
    .attr("height", 500)
    .attr("width", 760)
    .attr("pointer-events", "all");

svg.append('rect')
    .attr('class', 'background')
    .attr('width', "100%")
    .attr('height', "100%")
    .style('border',"none")
    .call(d3.behavior.zoom().on("zoom", redraw));

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
//var image = svg.selectAll(".imageC")
var pad = 0;

var totalnodes = [];
var grps = [];
d3.json("graphdata/md1.json", function(err, j) {
    var insideNodes = j.nodes;
    linksData = j.links;
    nodify(insideNodes);

    render();
});


attributes = [];

function nodify(insideNodes) {
    totalnodes = [];
    grps = [];
    headings = [];
    var l = [];
    var k = 1;
    var con = {};
    var c = 1;

    conData[1]["offsets"].forEach(function(v) {
        conData2[1]['offsets'].push(v);
    });
    conData[0]["offsets"].forEach(function(v) {
        conData2[0]['offsets'].push(v);
    }); //append 
    for (i = 0; i < 10; i++) {
        var x = {};
        x.name = insideNodes[i].tag;
        if(i==1||i==2||i==3)
        {       
            x.width = 140;
            x.height = 40;
        }
        else{
            x.width = 120;
            x.height = 20;
        }
        x.color = color[i];
        headings.push(x);
        headings[i].color = color[i];
        l.push(i);
        var offsetx = conData[1]["offsets"][i].offset;
        var offsety = conData[0]["offsets"][i].offset;
        insideNodes[i].array.forEach(function(n) {
            n.height = 18;
            n.width = 100;
            n["group"]=insideNodes[i].tag;
            con['node'] = 9 + k;
            con['offset'] = offsety + (c++ * 18);
            conData2[0].offsets.push(con);
            con = {};
            con['node'] = 9 + k;
            con['offset'] = offsetx -45;
            conData2[1].offsets.push(con);
            con = {};
            attributes.push(n);

            l.push(9 + k);
           // console.info((6 + k) + "k i" + i + " " + n.name);
            k = k + 1;
        });
        c = 1;
        grps.push({
            "leaves": l
        });
        l = [];
    }
    headings.forEach(function(n) {
        totalnodes.push(n);
    });
    attributes.forEach(function(n) {
        totalnodes.push(n);
    });

    //    console.info(JSON.stringify(attributes));
    //    console.info(JSON.stringify(conData2));
}
function render() {
    cola.nodes(totalnodes)
        .links(linksData)
        .groups(grps)
        .constraints(conData2);

    cola.start(10, 10, 10);
    cola.on("tick", tick);

    group = group.data(grps)
        .enter().append("rect")
        .attr("rx", 8).attr("ry", 8)
        .attr("class", "group")
        .style("fill", function(d, i) {
            return color[i];
        })
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
    //  link.exit().remove();

    node = node.data(headings)
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
    //  .call(cola.drag)
    ;
    attnode = attnode.data(attributes)
        .enter().append("rect")
        .attr("width", function(d) {
            return 100;
        })
        .attr("height", function(d) {
            return 18;
        })
        // .attr("rx", 5).attr("ry", 5)
        .attr("class", "attnode")
        .style("fill", function(d, i) {
            return d.color;
        })
        .on("click",function(d){
            if(d.group==headings[4].name){
                data["outputAttribute"]=d.name;
                d3.selectAll(".attnode").transition()
                .attr("width", function(d) {
                    return 100;
                })
                .attr("height", function(d) {
                    return 18;
                })
                .style("fill", function(d, i) {
                    return d.color;
                });
                d3.select(this).transition()
                .attr("width", function(d) {
                    return 102;
                })
                .attr("height", function(d) {
                    return 22;
                })
                .style("fill", function(d, i) {
                    return "#ffdd99";
                });
            }

        })
    //  .call(cola.drag)
    ;

    //   node.exit().remove();
    label = label.data(attributes, function(d) {
            return d.group+d.name;
        })
        .enter()
        .append("text")
        .attr("class", "label")
        .text(function(d) {
            return d.name + ": " ;
        });

    labelH = labelH.data(headings, function(d) {
            return d.name;
        })
        .enter()
        .append("text")
        .attr("class", "labelH")
        .text(function(d) {
            return d.name;
        });
    //   label.exit().remove();

    img = img.data(attributes)
        .enter()
        .append("image")
        .attr("class", "imgC")
        .attr("xlink:href", function(d) {
            var url = "graphdata/o.png";
            var simg = this;
            var img = new Image();
            img.onload = function() {
                d.width = 15;
                d.height = 15;
                simg.setAttribute("width", d.width);
                simg.setAttribute("height", d.height);
            }
            return img.src = url;
        });


}

function tick() {

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
            return 120 + pad;
        })
        .attr("height", function(d) {
            return d.bounds.height() + pad;
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
            return d.x;
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
    img
        .attr("x", function(d) {
            return d.x + 76;
        })
        .attr("y", function(d) {
            var h = this.getBBox().height;
            return d.y -h/2;
        });
}

function runPrediction()
{
    data["inputs"]=[];
    var less=document.getElementById("lessthan").value;
    var more=document.getElementById("morethan").value;
    if(data["outputAttribute"]==null)
    {
        alert("Select an output attribute for prediction.");
    }
    else{
            data["inputs"].push({"totalCost": document.getElementById("cost").value});
            data["inputs"].push({"totalTime": document.getElementById("time").value});
            data["inputs"].push({"totalQualityRate": document.getElementById("qrate").value});
            data["inputs"].push({"totalEvaluationMeasure": document.getElementById("emeasure").value});
            var passcode=prompt("Please enter a unique code for this prediction run.");
            if(passcode!=null)
            {
                data["passcode"]=passcode;
            }
        
    }
    console.info(JSON.stringify(data));

}
function update() {
    label.data(attributes)
        .transition().text(function(d) {
            return d.name + ": " + d.value;
        });
}

function updateAttrib(insideNodes)
{
    var k=0;
    for(i=0;i<7;i++)
    {
        insideNodes[i].array.forEach(function(n){
            n.height=18;
            n.width=100;
            attributes[k++]=n;
        });
    }
}

function getPrevPrediction(){
    var pass=prompt("Enter passcode to access your prediction data.");
    //get json for chart.
    //chart se select kar ke get attribs
    d3.json("http://localhost:9019/aakarshika/cases/"+pass,function(err, j) {          
        var ready=j.ready;
        if(ready==1)
            alert("Analysis not ready yet.\n Please come back after a while.");
        else if(ready==9)
            alert("No data for such passcode.");
        else{
            var caseValues=j.caseValues;
            renderChart(caseValues);
        }
    });
   
    
}
function renderChart(caseValues)
{
    
    var no=caseValues.length;

    console.info("renderchart");
    var dataChart = {
        "start": 1,
        "end": no+1,
        "step": 1,
        "names": ["Cases"],
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
function downloadAnalysis()
{

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
    d3.json("graphdata/md1.json",function(err, j) {          
        insideNodes=j.nodes;
        linksData = j.links;
        updateAttrib(insideNodes);

    });
    update();
    console.info("Process Model updating from server");
}
