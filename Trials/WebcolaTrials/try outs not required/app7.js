var color = ["#01c795", "#7ec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728"];

var data={};

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
var conData2 = [{
        "type": "alignment",
        "axis": "y",
        "offsets": []
    },
    {
        "type": "alignment",
        "axis": "x",
        "offsets": []
    }
];


var width = 1100,
    height = 400,
    imageScale = 0.25;

var cola = cola.d3adaptor(d3)
    .linkDistance(90)
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
d3.json("http://localhost:8000/msaw/", function(err, j) {
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
    for (i = 0; i < 7; i++) {
        var x = {};
        x.name = insideNodes[i].tag;
        x.width = 120;
        x.height = 20;
        x.color = color[i];
        headings.push(x);
        headings[i].color = color[i];
        l.push(i);
        var offsetx = conData[1]["offsets"][i].offset;
        var offsety = conData[0]["offsets"][i].offset;
        insideNodes[i].array.forEach(function(n) {
            n.height = 18;
            n.width = 100;
            con['node'] = 6 + k;
            con['offset'] = offsety + (c++ * 18);
            conData2[0].offsets.push(con);
            con = {};
            con['node'] = 6 + k;
            con['offset'] = offsetx -45;
            conData2[1].offsets.push(con);
            con = {};
            attributes.push(n);

            l.push(6 + k);
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

    //    console.info(JSON.stringify(totalnodes));
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
            return "#aec7e8";
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
            $("#dialogMinMax").dialog({
                modal: true,
                dialogClass: "dlg-no-title",
                buttons: {
                    Maximise: function() {
                        data["OutputAttribute"]=d.name;
                        data["optimise"]="max";
                        $(this).dialog("close"); 
                    },
                    Minimise: function() { 
                        data["OutputAttribute"]=d.name;
                        data["optimise"]="min";
                        $(this).dialog("close"); 
                    }
                },
                width: "300px"
            });
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

        })
    //  .call(cola.drag)
    ;

    //   node.exit().remove();
    label = label.data(attributes, function(d) {
            return d.name;
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

    console.info("fhjddfghhfgfg");

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

function runSensitivity(event)
{
    data["input"]=[];
    var cases=document.getElementById("cases").value;
    if(data["OutputAttribute"]==null)
    {
        alert("Select an output attribute for sensitivity analysis.");
    }
    else{
        if(cases=="")
            alert("Number of cases cannot be empty. Enter an integer.");
        else{
            data["input"].push({"Cases": cases});
            data["input"].push({"Total Cost": document.getElementById("cost").value});
            data["input"].push({"Total Time": document.getElementById("time").value});
            data["input"].push({"Total Quality Rate": document.getElementById("qrate").value});
            data["input"].push({"Total Evaluation Measure": document.getElementById("emeasure").value});
            var passcode=prompt("Please enter a unique code to access your sensitivity analysis when it is done.");
            if(passcode!=null)
            {
                data["passcode"]=passcode;
                //post data
                var x = document.getElementById('getPrevButton');
                x.style.display = 'block';
                
            }
        }
    }
    console.info(JSON.stringify(data));

    return false;
}
function getPrevAnalysis(){
    var pass=prompt("Enter passcode to access your sensitivity analysis data.");
    d3.json("http://localhost:8000/msaw/",function(err, j) {          
        insideNodes=j.nodes;
       // nodesData = j.groups;
        linksData = j.links;
       // groupsData = j.ggroup;
        updateAttrib(insideNodes);

    });
    update();
    console.info("Graph updating from server");
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
