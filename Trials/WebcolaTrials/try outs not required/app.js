var width = 400,height = 500;
var color = d3.scaleOrdinal(d3.schemeCategory20);
var cola = cola.d3adaptor(d3)
    .linkDistance(100)
    .avoidOverlaps(true)
    .handleDisconnected(false)
    .size([width, height]);

var svg = d3.select("#svgcontainer").append("svg")
            .attr("height",700);
var jobj = null;

d3.json("http://127.0.0.1:8000/msaw/",function(err, j) {
    jobj=j;
    render(jobj);
});
var firstIter=true;

function render(j) 
{
    var graph=j;
    graph.groups.forEach(function(v)
    {
        v.width=v.gname.length * 20;
        v.height=60;
    });
    cola
        .nodes(graph.groups)
        .links(graph.links)
        .groups(graph.ggroup)
        .constraints(graph.constraints)
        .start(10,10,10);
    cola.on("tick", tick);
    var ggroup = svg.selectAll(".group")
        .data(graph.ggroup)
        .enter().append("rect")
        .attr("rx", 8).attr("ry", 8)
        .attr("class", "group")
        .style("fill", function (d, i) { return color(i); })
        .call(cola.drag) 
        .on('mouseup',function(d){
            d3.select(this)
            .transition()
            .attr("height", function (g) { return g.bounds.height(); });
        });
    var pad=4;
    var link = svg.selectAll(".link")
        .data(graph.links)

        .enter().insert("line", ".node")
        .attr("class", "link");
    link.exit().remove();

    var node = svg.selectAll(".node")
        .data(graph.groups)
        .enter().append("rect")
        .attr("width", function (d) { return d.width - 2 * pad; })
        .attr("height", function (d) { return d.height - 2 * pad; })
        .attr("rx", 5).attr("ry", 5)
        .attr("class", "node")
        .style("fill",  function (d, i) { return color(i); })
        .call(cola.drag)
        .on('dblclick',function(d){
            d3.select(this)
            .transition()
            .attr("height", function (g) { return g.bounds.height(); });
        });
    node.exit().remove();

    function updateNode()
    {
        node.data(graph.groups)
        .attr("width",function(d){d.gname.length * 20});
    }
    
    var label = svg.selectAll(".label")
        .data(graph.groups,function(d) 
        { return d.gname;})
        .enter()
        .append("text")
        .attr("class", "label")
        .text(function (d) 
        { return d.gname; });
    label.exit().remove();

    function tick() {  
      node
        .attr("x", function (d) { return d.x - d.width / 2 + pad; })
        .attr("y", function (d) { return d.y - d.height / 2 + pad; });
      ggroup
        .attr("x", function (d) { return d.bounds.x; })
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
        .attr("y", function (d) {
            var h = this.getBBox().height;
            return d.y + h/4;
        });
    }
}
d3.select("#tj").on("change",function(){
    render(JSON.parse(this.value));
});