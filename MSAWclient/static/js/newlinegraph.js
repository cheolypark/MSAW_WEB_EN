function RenderGraph(caseValues,textY,textX){
var margin = {top: 10, right: 20, bottom: 30, left: 50},
  width = 500 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom;
 
// Parse the date / time

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var nticks=caseValues.length+1;
// Define the axes
var xAxis = d3.svg.axis().tickFormat(d3.format("d")).scale(x)
  .orient("bottom").ticks(nticks);
 
var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(nticks);
 
// Define the line
var valueline = d3.svg.line()
  .x(function(d) { return x(d.case); })
  .y(function(d) { return y(d.tvalue); });
    
// Adds the svg canvas
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
// Get the data
data=[];
var i=1;
caseValues.forEach(function(d) {
      var c={};
      c.tvalue = d;
      c.case = +i++;
      data.push(c);
});
console.info(data);
  // Scale the range of the data
var ys=d3.extent(data, function(d) { return d.tvalue; })[0]/300;
//console.info(d3.extent(data, function(d) { return d.tvalue; }));
ymin=d3.min(data, function(d) { return d.tvalue; })-ys;
ymax=d3.max(data, function(d) { return d.tvalue; })+ys;
y.domain([ymin,ymax]);
x.domain(d3.extent(data, function(d) { return d.case; }));

// Add the valueline path.
svg.append("path")  
  .attr("class", "line")
  .attr("d", valueline(data));

// Add the X Axis
svg.append("g")   
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

// Add the Y Axis
svg.append("g")   
  .attr("class", "y axis")
  .call(yAxis);

console.info(textX);
console.info(textY);

svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x", margin.top - (height / 2))
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(textY);

svg.append("text")
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height+margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text(textX);

}