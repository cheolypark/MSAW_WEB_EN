
$('#consoletextinputP').bind('input propertychange', function() {
      //console.info(this.value);
      data["targetVariables"]=JSON.parse(this.value);
     // updateOutputAttribFromConsole();
      console.info(JSON.stringify(data));
      
});

$('#consoletextinput').bind('input propertychange', function() {
      //console.info(this.value);
      data["targetVariables"]=JSON.parse(this.value);
     // updateOutputAttribFromConsole();
      console.info(JSON.stringify(data));
      
});

$body = $("body");
