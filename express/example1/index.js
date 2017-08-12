var express = require("express");
var app = express();

var port = process.env.PORT || 3000; // use env variable "port", if not thet then 3000

app.use("/assets", express.static(__dirname + "/public"));  // css, img, etc.

app.use("/", function(req, res, next) {  // midleware http://expressjs.com/en/guide/writing-middleware.html
    console.log(req.url); // middleware function
    next(); // go to router and do a response
});

app.get("/", function(req, res) {
    res.send("<html><head></head><body><h1>Hallo Ray</h1></body></html>");
});

app.get("/name/:name", function(req, res) {
    res.send("<html><head><link href=/assets/style.css type=text/css rel=stylesheet /></head><body><h1>Hallo " + req.params.name + "</h1></body></html>");
});

app.get("/api", function(req, res) {
    res.json({ name: "Ray", surname: "Stenders" });
});

app.listen(port);
