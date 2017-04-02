var width = 800,height = 400;
var color = ["#01c795","#7ec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728"];


var nodesData ;//gt json;
var linksData ;
//var groupsData;
//var insideNodes;
var attributes;
var headings;
var conData=[
    {"type":"alignment",
     "axis":"y",
     "offsets":[
       {"node":0, "offset":0},
       {"node":1, "offset":0},
       {"node":2, "offset":0},
       {"node":3, "offset":0},
       {"node":5, "offset":100},
       {"node":4, "offset":100},
       {"node":6, "offset":-150}
     ]},
    {"type":"alignment",
     "axis":"x",
     "offsets":[
       {"node":0, "offset":0},
       {"node":1, "offset":200},
       {"node":2, "offset":400},
       {"node":3, "offset":600},
       {"node":4, "offset":200},
       {"node":5, "offset":400},
       {"node":6, "offset":300}
     ]}
  ] ;
var cola = cola.d3adaptor(d3)
    .linkDistance(90)
    .avoidOverlaps(true)
    .handleDisconnected(false)
    .size([width, height]);
var svg = d3.select("#svgcontainer").append("svg")
            .attr("height",400)
            .call(d3.behavior.zoom().on("zoom", redraw))
            ;

function redraw() {
    if (nodeMouseDown) return;
    vis.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}
var node  = svg.selectAll(".node");
var attnode  = svg.selectAll(".attnode");
var link  = svg.selectAll(".link");
var group = svg.selectAll(".group");
var label = svg.selectAll(".label");
//var image = svg.selectAll(".imageC")
var pad=0;

    var totalnodes=[];
    var grps=[];
d3.json("graphdata/md.json",function(err, j) {          
        var insideNodes=j.nodes;
        nodesData = j.groups;
        linksData = j.links;
        //groupsData = j.ggroup;
        nodify(insideNodes);
        render();
    });
svg.on("dblclick",refresh);    
function refresh(){
    d3.json("graphdata/md.json",function(err, j) {          
        insideNodes=j.nodes;
        nodesData = j.groups;
        linksData = j.links;
       // groupsData = j.ggroup;
        nodify(insideNodes);

    });
    update();
    console.info("Graph updating from server");
    setTimeout(refresh, 5000);
}
function nodify(insideNodes){
    totalnodes=[];
    grps=[];
    headings=[];
    attributes=[];
    var l=[];
    var k=1;
    for(i=0;i<7;i++)
    {
        //console.info(insideNodes[i].tag);
       // console.info(nodesData[i].name);
        //totalnodes.push(nodesData[i]);
        nodesData[i].width=120;
        nodesData[i].height=30;

        headings.push(nodesData[i]);
        headings[i].color=color[i];
        l.push(i);
        insideNodes[i].array.forEach(function(n){
         //   console.info(n.name);
            n.height=25;
            n.width=100;
            attributes.push(n);
            //totalnodes.push(n);
            //attributes[6+k].color=co1or[i];
            l.push(6+k++);
        });
        grps.push({"leaves":l});
        //console.info(grps[i]);
        l=[];
    }
    totalnodes=headings;
    attributes.forEach(function(n){totalnodes.push(n);});
    console.info(JSON.stringify(totalnodes));
    console.info(JSON.stringify(grps));
  //  console.info(JSON.stringify(attributes));
    //console.info(JSON.stringify(headings));


    // insideNodes.forEach(function(n){
    //     var tag= n.tag;
    //     console.info(tag);
    //     n.array.forEach(function(v){
    //         console.info(v.name);
    //     });
    //     i++;
    // });
}
function render()
{  
  cola.nodes(totalnodes)
    .links(linksData)
    .groups(grps)
     .constraints(conData)
    .start(20,20,20);
  cola.on("tick", tick );
   
    
  group=group.data(grps)
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

    node=node.data(headings)     
    .enter().append("rect")
        .attr("width", function (d) { return d.width; })
        .attr("height", function (d) { return d.height; })
       // .attr("rx", 5).attr("ry", 5)
        .attr("class", "node")
        .style("fill",  function (d, i) { return d.color; })
        .call(cola.drag)
       ;

    attnode=attnode.data(attributes)     
    .enter().append("rect")
        .attr("width", function (d) { return d.width; })
        .attr("height", function (d) { return d.height; })
       // .attr("rx", 5).attr("ry", 5)
        .attr("class", "attnode")
        .style("fill",  function (d, i) { return d.color; })
        .call(cola.drag)
       ;
    //    // image=image
       //      .data(nodesData)
       //      .enter()
       //      .attr("class", "imageC")
       //      .append("image")
       //      .attr("xlink:href", function (d) {
       //          var url = "graphdata/o.png";
       //          var simg = this;
       //          var img = new Image();
       //          img.onload = function () {
       //              d.width = this.width * imageScale;
       //              d.height = this.height * imageScale;
       //              simg.setAttribute("width", d.width);
       //              simg.setAttribute("height", d.height);
       //          }
       //          return img.src = url;
       //      })
       //      .on("mouseover", function () { imageZoom(this, 1/imageScale) })
       //      .on("touchend", function () { toggleImageZoom(this) })
       //      .on("mouseout", function () { imageZoom(this, 1) });
 //   node.exit().remove();
    label=label.data(totalnodes,function(d){return d.name;})   
  .enter()
        .append("text")
        .attr("class", "label")
        .text(function (d){ return d.name; });
 //   label.exit().remove();
    
}
function update()
{
//  inData=nodesData;
    node.data(headings)     
    .transition()
        .attr("width", function (d) { return d.width ; })
        .attr("height", function (d) { return d.height ; })
       // .attr("rx", 5).attr("ry", 5)
        .style("fill",  function (d, i) { return d.color; })
     //   .call(cola.drag)
        ;
    attnode.data(attributes)     
    .transition()
        .attr("width", function (d) { return d.width ; })
        .attr("height", function (d) { return d.height ; })
       // .attr("rx", 5).attr("ry", 5)
        .style("fill",  function (d, i) { return d.color; })
     //   .call(cola.drag)
        ;
    
   // group.call(cola.drag);
    label.data(totalnodes)   
      .transition().text(function (d){ return d.name; });
}

function tick() { 
  
  console.info("fhjddfghhfgfg"); 

  node
    .attr("x", function (d) { return d.x - d.width / 2 + pad; })
    .attr("y", function (d) { return d.y - d.height / 2 + pad; });
  attnode
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
    .attr("y", function (d) { //return d.y;
        var h = this.getBBox().height;
        return d.y + h/4;
    });
  // image
  //   .attr("x", function (d) { return d.x; })
  //   .attr("y", function (d) { return d.y;
  //   });
}
//get json, extract json
//ut data
//initialize
//render mein jo hai wo
//settimeout
//