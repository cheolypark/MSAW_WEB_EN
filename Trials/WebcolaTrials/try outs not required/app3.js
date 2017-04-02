var width = 700,height = 400;
var color = d3.scaleOrdinal(d3.schemeCategory20);
var nodesData=[{"name":"Input","width":60,"height":40,"color":"#01c795"},
{"name":"Process 1","image":"o.png","width":60,"height":40,"color":"#7ec7e8"},
{"name":"Process 2","width":60,"height":40,"color":"#ff7f0e"},
{"name":"Output","width":60,"height":40,"color":"#ffbb78"},
{"name":"Control 1","width":60,"height":40,"color":"#2ca02c"},
{"name":"Control 2","width":60,"height":40,"color":"#98df8a"},
{"name":"Item","width":60,"height":40,"color":"#d62728"},
{"name":"i11","width":60,"height":40,"color":"#ffffff"},
{"name":"i12","width":60,"height":40,"color":"#ffffff"},
{"name":"i13","width":60,"height":40,"color":"#ffffff"},
{"name":"o11","width":60,"height":40,"color":"#ffffff"},
{"name":"o12","width":60,"height":40,"color":"#ffffff"},
{"name":"o13","width":60,"height":40,"color":"#ffffff"},
{"name":"c11","width":60,"height":40,"color":"#ffffff"},
{"name":"c12","width":60,"height":40,"color":"#ffffff"},
{"name":"c21","width":60,"height":40,"color":"#ffffff"},
{"name":"c22","width":60,"height":40,"color":"#ffffff"},
{"name":"it1","width":60,"height":40,"color":"#ffffff"},
{"name":"it2","width":60,"height":40,"color":"#ffffff"}] ;//gt json;
var linksData=[
      {"source":0,"target":1},
      {"source":1,"target":2},
      {"source":2,"target":3},
      {"source":4,"target":1},
      {"source":5,"target":2},
      {"source":6,"target":1},
      {"source":6,"target":2}
    ] ;
var groupsData=[{"leaves":[0,7,8,9]},{"leaves":[1]},{"leaves":[2]},{"leaves":[3,10,11,12]},{"leaves":[4,13,14]},{"leaves":[5,15,16]},{"leaves":[6,17,18]}];
var conData=[
    {"type":"alignment",
     "axis":"y",
     "offsets":[
       {"node":"0", "offset":"-100"},
       {"node":"1", "offset":"0"},
       {"node":"2", "offset":"0"},
       {"node":"3", "offset":"0"},
       {"node":"6", "offset":"-100"}
     ]},
    {"type":"alignment",
     "axis":"x",
     "offsets":[
       {"node":"0", "offset":"-100"},
       {"node":"4", "offset":"100"}
     ]}
  ];
var cola = cola.d3adaptor(d3)
    .linkDistance(5)
    .avoidOverlaps(true)
    .handleDisconnected(true)
    .size([width, height]);
var svg = d3.select("#svgcontainer").append("svg")
            .attr("height",600);

var node  = svg.selectAll(".node");
var link  = svg.selectAll(".link");
var group = svg.selectAll(".group");
var label = svg.selectAll(".label");
var pad=4;
// d3.json("http://127.0.0.1:8000/msaw/",function(err, j) {          
//         nodesData = j.groups;
//         linksData = j.links;
//         groupsData = j.ggroup;
//     render();
//     });
//svg.on("dblclick",refresh);    
// function refresh(){
//   d3.json("http://127.0.0.1:8000/msaw/",function(err, j) {          
//         nodesData = j.groups;
//         linksData = j.links;
//         groupsData = j.ggroup;

//     });
//     update();
//     console.info("Graph updating from server");
//   setTimeout(refresh, 1000);
// }
render();

function render()
{
  nodesData.forEach(function(v)
    {
        v.width=60;
        v.height=20;
    });   
  cola.nodes(nodesData)
    .links(linksData)
    .groups(groupsData);
   // cola.constraints(conData);
    cola.start(10,10,10);
  cola.on("tick", tick );
   
    
  group=group.data(groupsData)
  .enter().append("rect")
        .attr("rx", 8).attr("ry", 8)
        .attr("class", "group")
        .style("fill", function (d, i) { return "#aec7e8"; })
        .call(cola.drag) 
        ;
   // group.exit().remove();
  link=link.data(linksData)
    .enter().insert("line", ".node").attr("class", "link")
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.source.x; })
        .attr("y2", function (d) { return d.source.y; });
  //  link.exit().remove();

    node=node.data(nodesData)     
    .enter().append("rect")
        .attr("width", function (d) { return d.width; })
        .attr("height", function (d) { return d.height; })
       // .attr("rx", 5).attr("ry", 5)
        .attr("class", "node")
        .style("fill",  function (d, i) { return d.color; })
        .call(cola.drag)
       ;

    
    label=label.data(nodesData,function(d){return d.name;})   
  .enter()
        .append("text")
        .attr("class", "label")
        .text(function (d){ return d.name; });
    
}
function tick() { 
  
  console.info("fhjddfghhfgfg"); 

  node
    .attr("x", function (d) { return d.x - d.width / 2 + pad; })
    .attr("y", function (d) { return d.y - d.height / 2 + pad; });
  group
    .attr("x", function (d) {return d.bounds.x; })
    .attr("y", function (d) { return d.bounds.y; })
    .attr("width", function (d) { return d.bounds.width(); })
    .attr("height", function (d) { return d.bounds.height(); });
  link 
     .attr("x1", function (d) 
      { return d.source.x; })
    .attr("y1", function (d) 
      { return d.source.y; })
    .attr("x2", function (d) 
      { return d.target.x; })
    .attr("y2", function (d) 
      { return d.target.y; });
  label
    .attr("x", function (d) { return d.x; })
    .attr("y", function (d) { return d.y;
       // var h = this.getBBox().height;
       // return d.y + h/4;
    });
}
//get json, extract json
//ut data
//initialize
//render mein jo hai wo
//settimeout
//