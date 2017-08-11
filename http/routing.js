var http = require("http");
var fs = require("fs");

http.createServer(function(req, res) {

    if (req.url === "/api") {
        var obj = {
            person: "Ray",
            ocupation: "Policeman"
        }
    
        var output = JSON.stringify(obj);
        res.writeHead(200, { "Content-Type": "text/json" });
        res.end(output);
    }

    else if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(__dirname + "/index.html").pipe(res);
    }

    else {
        res.writeHead(404);
        res.end("Not found");
    }

}).listen(7777, "127.0.0.1");
