var http = require("http");
var fs = require("fs");

http.createServer(function(req, res) {

    res.writeHead(200, { "Content-Type": "text/json" });
   
    var obj = {
        person: "Ray",
        ocupation: "Policeman"
    }
    
    var output = JSON.stringify(obj);

    res.end(output);

}).listen(7777, "127.0.0.1");
