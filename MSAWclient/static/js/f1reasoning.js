
function rendernext(argument) {
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
            if(d.group==procNamesData[0].name)
                return "#caefc3";
            return d.color;
        })
        .on("click",function(d){
            if(d.group!=procNamesData[0].name){
                var index=getIndex(data["targetVariables"],(d.group+"."+d.name));
                if(index==-1)
                {
                    console.info("adding "+d.group+"."+d.name);
                    data["targetVariables"].push({name:d.group+"."+d.name, value:"0"});
                }
                else{
                    removeElement(data["targetVariables"],index);
                    console.info("after removing"+JSON.stringify(data["targetVariables"]));
                }
                $('#consoletextinput').val(JSON.stringify(data["targetVariables"]));

                d3.select(this).transition()
                .style("fill", function(d, i) {
                    var index=getIndex(data["targetVariables"],d.group+"."+d.name);
                    if(index==-1)
                    {
                        return "#fff";
                    }
                    else{            
                        return "#ffe6b3";}
                });
            }

        })
        .call(cola.drag);

    label = label.data(attributesData, function(d) {
             return d.group+d.name;
        })
        .enter()
        .append("text")
        .attr("class", "label")
        .text(function(d) {
            if((d.group)==(procNamesData[0].name))
                //return d.name + ": " + d.value.substring(0,d.value.length-12);
                return d.name + ": " + d.value;
            return d.name + ": "    ;
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

$('#consoletextinput').bind('input propertychange', function() {
      //console.info(this.value);
      data["targetVariables"]=JSON.parse(this.value);
     // updateOutputAttribFromConsole();
      //console.info(JSON.stringify(data));
      
});
function runReasoning()
{
     if(data["targetVariables"].length==0){
         alert("Output attributes not set for reasoning.");
     }
     else{
    //     // data["inputs"]["totalCost"]= $("#cost").val();
    //     // data["inputs"]["totalTime"]= $("#time").val();
    //     // data["inputs"]["totalQualityRate"]= $("#qrate").val();
    //     // data["inputs"]["totalEvaluationMeasure"]= $("#emeasure").val();
          getReasoning();
     }
    // //console.info(JSON.stringify(data));
}

$body = $("body");

function getReasoning()
{
    var postingData=JSON.parse(initialinput);
    postingData["targetVariables"]=data["targetVariables"];
	$body.addClass("loading");
    
    console.info("posting data: "+JSON.stringify(postingData));
    d3.xhr(BACKEND_URL+"reasoning")
    .header("Content-Type", "application/json")
    .post(
        JSON.stringify(postingData),
        function(err, rawData){
            
            $body.removeClass("loading"); 
            console.info("raw data:         "+rawData.response);

            j2= JSON.parse(rawData.response);
            allNodesData=j2.processes;
            updateAttrib(allNodesData);
            update();
        }
    );

    // var postingData={"bookname":"lalala"};
    // console.info("posting data: "+JSON.stringify(postingData));
    // d3.xhr(BACKEND_URL+"yo")
    // .header("Content-Type", "application/json")
    // .post(
    //     JSON.stringify(postingData),
    //     function(err, rawData){
            
    //         $body.removeClass("loading"); 
    //         console.info("raw data:         "+rawData.response);
    //     }
    // );
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
}

function updateAttrib(allNodesData)
{
    var k=0;
    allNodesData.forEach(function(v){
        v.output.properties.forEach(function(a){

            var aname=a.name.split(".")[1];
            a.name=aname;
            a.group=v.ID;
            a.width=aWidth;
            a.height=aHeight;
            a.color="#fff";
            attributesData[k++]=(a);
        });
        

    });



}
