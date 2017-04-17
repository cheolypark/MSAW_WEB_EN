var color = ["#98df8a", "#7ec7e8", "#ffbb78","#7ec7e8","#ffbb78", "#7ec7e8","#ffbb78","#ffff99","#ffff99"];
var urlList=["graphdata/p.png","graphdata/o.png"];
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
    data["freeVariables"]=[];
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



// function link(){

// 1-4
// 5-8
// 9-12
// 3-4
// 7-8
// 11-12


// }
//function no(){
//     var i=0;
//     var TI=0;

//     var l=[];
//     allNodesData2.forEach(function(v){
//         var x={};
//         x.name=v.ID;
//         x.value="";
//         x.width=hWidth;
//         x.height=hHeight;
//         x.color=color[i];

//         var offsetxh = constraintsData[1]["offsets"][i].offset;
//         var offsetyh = constraintsData[0]["offsets"][i].offset;
//             var con = {};
//             con['node'] = TI;
//             con['offset'] = offsetyh;
//             constraintsData2[0].offsets.push(con);
//             con = {};
//             con['node'] = TI;
//             con['offset'] = offsetxh;
//             constraintsData2[1].offsets.push(con);

//         console.info(TI+""+i);
//         x.id=TI;
//         procNamesData.push(x);
//         renderingNodesData2.push(x);

//         var offsetxa = constraintsData[1]["offsets"][i+1].offset;
//         var offsetya = constraintsData[0]["offsets"][i+1].offset;
//         var c=1;
//         TI++;

//         i++;
//         for(var k in v.output.properties)
//         {
//             var a={};
//             var key=k.split(".")[1];
//             a.name=key;
//             a.value=v["output"]["properties"][k];
//             a.group=x.name;
//             a.width=aWidth;
//             a.height=aHeight;
//             a.color="#fff";
//             a.id=TI;
//             attributesData.push(a);
//             renderingNodesData2.push(a);

//             var con = {};
//             con['node'] = TI;
//             con['offset'] = offsetya + (c++ * aHeight);
//             constraintsData2[0].offsets.push(con);
//             con = {};
//             con['node'] = TI;
//             con['offset'] = offsetxa;
//             constraintsData2[1].offsets.push(con);

//         //console.info(TI+""+i);
        
//             l.push(TI);
//             TI++;
//            // console.info(a);
        
//         }
//         groups.push({
//             "leaves": l
//         });
//         l = [];

//     }); 
// }




function render(){
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
        	selMode=$('[name="selMode"]:checked').val();
        	if(selMode=="tSel"){
                
                if(data["targetVariables"].length==0)
                    data["targetVariables"].push({"name":d.group+"."+d.name});
                else{
                    data["targetVariables"].shift();
                    data["targetVariables"].push({"name":d.group+"."+d.name});
                    
                }
                d3.selectAll(".attnode").transition()
                .style("fill", function(d, i) {
                    if(data["targetVariables"][0].name==(d.group+"."+d.name))
                    {
                    	return "#ffff99";
                    }
                    else
                    	return d.color;
                });
            }
            else{
            	var index=getIndex(data["freeVariables"],d.group+"."+d.name);
	            if(index==-1)
	            {
	                console.info("adding "+d.name);
	                data["freeVariables"].push({"name":d.group+"."+d.name});
	            }
	            else{
	                removeElement(data["freeVariables"],index);
	                console.info("after removing"+JSON.stringify(data["freeVariables"]));
	            }
	            $('#consoletextinput').val(JSON.stringify(data["freeVariables"]));

	            d3.select(this).transition()
	            .style("fill", function(d, i) {
	                var index=getIndex(data["freeVariables"],d.group+"."+d.name);
	                if(index==-1)
	                {
	                	d.color="#fff";
	                    return d.color;
	                }
	                else{
	                	d.color="#ddff99";
	                    return "#ddff99";
	                }
	            });
            }


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
                return d.name + ": " + d.value.substring(0,d.value.length-12);
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
    //   label.exit().remove();

    img = img.data(attributesData)
        .enter()
        .append("image")
        .attr("class", "imgC")
        .attr("xlink:href", function(d) {
            var url = urlList[1];
            var simg = this;
            var img = new Image();
            img.onload = function() {
               // d.width = 15;
               // d.height = 15;
                simg.setAttribute("width", d.height/2);
                simg.setAttribute("height", d.height/2);
            }
            return img.src = url;
        });


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
    img
        .attr("x", function(d) {
            return d.x + d.width/2 -d.height/2 -3;
        })
        .attr("y", function(d) {
            var h = this.getBBox().height;
            return d.y -h/2;
        });
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

function runSensitivity()
{
    if(data["targetVariables"].length==0){
        alert("Output attributes not set for reasoning.");
    }
    else{
        // data["inputs"]["totalCost"]= $("#cost").val();
        // data["inputs"]["totalTime"]= $("#time").val();
        // data["inputs"]["totalQualityRate"]= $("#qrate").val();
        // data["inputs"]["totalEvaluationMeasure"]= $("#emeasure").val();
         getSens();
    }
    //console.info(JSON.stringify(data));
}

$body = $("body");

function getSens()
{
    if(data["targetVariables"].length==0)
    {
        alert("Select target attribute for sensitivity analysis.");
    }
    else
    {
        var postingData=JSON.parse(initialinput);
        postingData["targetVariables"]=data["targetVariables"];
        postingData["freeVariables"]=data["freeVariables"];
        $body.addClass("loading");
        
        console.info("posting data: "+JSON.stringify(postingData));
        d3.xhr(BACKEND_URL+"sensitivity")
        .header("Content-Type", "application/json")
        .post(
            JSON.stringify(postingData),
            function(err, rawData){
                console.info(rawData.response);
                j2= JSON.parse(rawData.response);
                allNodesData=j2.processes;
                updateAttrib(allNodesData);
                $body.removeClass("loading"); 
                update();
            }
        );
    }
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
            if(d.group!=procNamesData[0].name)
                 return d3.interpolate("#ffffff", "#ffffcc");
            else
                return;
         });
    img.data(attributesData)
        .transition()
        .attr("xlink:href", function(d) {
            var url = urlList[d.type];
            var simg = this;
            var img = new Image();
            img.onload = function() {
               // d.width = 10;
               // d.height = 10;
                simg.setAttribute("width", d.height/2);
                simg.setAttribute("height", d.height/2);
            }
            return img.src = url;
        });
}

function updateAttrib(allNodesData)
{
    // var k=0;
    // for(i=0;i<7;i++)
    // {
    //     allNodesData[i].attributes.forEach(function(n){
    //         n.height=18;
    //         n.width=100;
    //         attributes[k++]=n;
    //     });
    // }
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
