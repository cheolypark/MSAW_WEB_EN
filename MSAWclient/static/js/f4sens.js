data["freeVariables"]=[];
function rendernext(){
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

    imgType = imgType.data(attributesData)
        .enter()
        .append("image")
        .attr("class", "imgC")
        .attr("xlink:href", function(d) {
            var url = urlList[7];
            var simg = this;
            var imgt = new Image();
            imgt.onload = function() {
               // d.width = 15;
               // d.height = 15;
                simg.setAttribute("width", d.height/2);
                simg.setAttribute("height", d.height/2);
            }
            return imgt.src = url;
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
    imgType
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
                 return d3.interpolate("#ffffff", "#ffffcc");
         });
    imgType.data(attributesData)
        //.transition()
        .attr("xlink:href", function(d) {
            console.info(d.type);
            var simg = this;
            var imgt = new Image();
            imgt.onload = function() {
               // d.width = 10;
               // d.height = 10;
                simg.setAttribute("width", d.height/2);
                simg.setAttribute("height", d.height/2);
            }
            return imgt.src = urlList[d.type];
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
