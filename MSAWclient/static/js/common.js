var color = ["#98df8a", "#7ec7e8", "#ffbb78","#7ec7e8","#ffbb78", "#7ec7e8","#ffbb78","#ffff99","#ffff99"];
var urlList=["../static/img/c0.png","../static/img/c1.png","../static/img/c2.png","../static/img/c3.png","../static/img/c4.png","../static/img/c5.png","../static/img/c6.png","../static/img/c7.png"];
var data={};
data["targetVariables"]=[];

var initialinput="";

var width = svgwidth,
    height = 780;

var cola = cola.d3adaptor(d3)
    .linkDistance(50)
    .avoidOverlaps(true)
    .size([width, height]);

var svg = d3.select("#svgdiv").append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("pointer-events", "all")
    //.attr("transform","scale(0.6)")
    ;

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
    .attr("id","g")
    ;

var nodeMouseDown = false;

function redraw() {
    if (nodeMouseDown) return;
    vis.attr("transform", "translate(" + d3.event.translate + ")" 
        + " scale(" + d3.event.scale + ")");
}


var node = vis.selectAll(".imgNodeBack");
var nodeB = vis.selectAll(".nodeBorder");
var attnode = vis.selectAll(".attnode");
var link = vis.selectAll(".link");
var group = vis.selectAll(".group");
var label = vis.selectAll(".label");
var labelH = vis.selectAll(".labelH");
var imgType = vis.selectAll(".imgType");

var gpad = 5;
var pad=0;

var constraintsData =  [
    {"type":"alignment",
     "axis":"y",
     "offsets":
     [
       {"node":0, "offset":0},//sg
       {"node":1, "offset":50},//sga
       {"node":2, "offset":350},//htrcon
       {"node":3, "offset":100},//htrcona
       {"node":4, "offset":50},//htr
       {"node":5, "offset":-220},//hta
       {"node":6, "offset":350},//rmcon
       {"node":7, "offset":100},//rmcona
       {"node":8, "offset":50},//rm
       {"node":9, "offset":-220},//rma
       {"node":10, "offset":350},//fmcon
       {"node":11, "offset":100},//fmcona
       {"node":12, "offset":50},//fm
       {"node":13, "offset":50},//fma
       {"node":14, "offset":-240},//est
       {"node":15, "offset":-200},//esta	
       {"node":16, "offset":-100},//total
       {"node":17, "offset":-60}//totala
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

var hHeight=40;
var hWidth=230;
var aHeight=17;
var aWidth=230;



var procNamesData=[];
var attributesData=[];
var renderingNodesData2=[];
var groups=[];
// d3.json("graphdata/process-model.json", function(err, j) {
//     var allNodesData = j.nodes;
//     initialinput=JSON.stringify(allNodesData[0]);
    
//    // console.info(JSON.stringify(j));
//     //no(allNodesData);
//     nodify(allNodesData);
//     render();
// });
var allNodesData2;

//d3.json(BACKEND_URL+"simulation", function(err, j) {
d3.json(BACKEND_URL+"simulation", function(err, j) {
    console.info(JSON.stringify(j));
    allNodesData2 = j.processes;
    ////console.info(JSON.stringify(j));
    initialinput=JSON.stringify(j);
    nodify();
    render();
    rendernext();
});

vis.attr("transform","translate(300,-200) scale(1)");
// d3.json("graphdata/process-model.json", function(err, j) {
//     var allNodesData = j.nodes;
//     initialinput=JSON.stringify(allNodesData[0]);
//     console.info(JSON.stringify(j));
//     nodify(allNodesData);
//     render();
// });

// h1  0,0
// a1  0,1
// h2  0,2
// a2  -1,2.5
// h3  0,3
// a3  -1,3.5
// h4  0,4
// a4  0,5
// c2  2,2
// ac2 1,2
// c3  2,3
// ac3 1,3
// c4  2,4
// ac4 1,4
// tp  3,5
// atp 2,5

function nodify(){
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
        x.color="#00f";
        var i2=i*2;
       console.info(i2);
        var offsetxh = 2.7*constraintsData[1]["offsets"][i2].offset;
        var offsetyh = constraintsData[0]["offsets"][i2].offset;
        if(i2==2||i2==6||i2==10)
        {
            offsetyh = v.output.properties.length * aHeight +125;
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



function render(){
    cola.nodes(renderingNodesData2)
        .links(linksData)
        .groups(groups)
        .constraints(constraintsData2)
        ;
    cola.start(10,10,10);
    cola.on("tick", tick);

    group = group.data(groups)
        .enter().append("rect")
        .attr("rx", 8).attr("ry", 8)
        .attr("class", "group")
        .style("fill", function(d, i) {
            return color[i];
        }).call(cola.drag)
    ;

    link = link.data(linksData)
        .enter().insert("line", ".nodeBorder").attr("class", "link")
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
        .enter()
        .append("image")
        .attr("class", "imgNodeBack")
        .attr("width", function(d) {
            return d.width;
        })
        .attr("height", function(d) {
            return d.height;
        })
        .attr("xlink:href", function(d) {
           // var url = "http://www.timepasssms.com/images/big/Abstract/big_1258050901.jpg";
            var url = "../static/img/blueback.jpg";
            var simg = this;
            var imgn = new Image();
            imgn.onload = function() {
                //simg.setAttribute("width", d.width);
                //simg.setAttribute("rx", "5px");
                simg.setAttribute("preserveAspectRatio", "none");
            }
            return imgn.src = url;
        });


    nodeB = nodeB.data(procNamesData)
        .enter().append("rect")
        .attr("width", function(d) {
            return d.width;
        })
        .attr("height", function(d) {
            return d.height;
        })
         .attr("rx", 3).attr("ry", 3)
        .attr("class", "nodeBorder")
        .attr("style", "fill-opacity:0.05; stroke: #00004d; stroke-width: 3px; stroke-opacity:0.95;")
      .call(cola.drag)
    ;

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

    nodeB
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
    imgType
        .attr("x", function(d) {
            return d.x + d.width/2 -d.height/2 -3;
        })
        .attr("y", function(d) {
            var h = this.getBBox().height;
            return d.y -h/2;
        });
}