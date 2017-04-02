// var data={};
//     data["displayNames"] = ["2xx","3xx"];
//     data["names"]=["lala","yoyo"];
//     data["colors"] = ["green","orange"];
//     data["scale"] = "pow";
//     data["values"] = [[1,5,8,9,9,7,7,4], [5,6,1,2,9,9,8,4]];
//     data["start"] = 1490887328719;
//     data["end"] = 1490888328719;
//     data["step"] = 28719;
var data = {
    "start": 1336594920000,
    "end": 1336680960000,
    "step": ((1336680960000-1336594920000)/11),
    "names": ["Stats_count2xx"],
    "values": [
        [1,5,7,8,4,5,8,7,5,6,2]
    ]
};

/* 
 * delta updates to data that would be incrementally appended to the original every 2 minutes (120000ms)
 */

var l1 = new LineGraph({
    containerId: "chart",
    data: data
});

//    setInterval(function() {
//     /*
//     * The following will simulate live updating of the data (see dataA, dataB, dataC etc in data.js which are real examples)
//     * This is being simulated so this example functions standalone without a backend server which generates data such as data.js contains.
//     */
//     // for each data series ...
//     var newData = [];
//     data.values.forEach(function(dataSeries, index) {
//         // take the first value and move it to the end
//         // and capture the value we're moving so we can send it to the graph as an update
//         var v = dataSeries.shift();
//         dataSeries.push(v);
//         // put this value in newData as an array with 1 value
//         newData[index] = [v];
//     })

//     // we will reuse dataA each time
//     dataA.values = newData;
//     // increment time 1 step
//     dataA.start = dataA.start + dataA.step;
//     dataA.end = dataA.end + dataA.step; 

//     l1.slideData(dataA);
// }, 2000);