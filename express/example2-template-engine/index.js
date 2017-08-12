var express = require("express");
var app = express();

var bodyParser = require("body-parser"); // for POST requests
var urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
var jsonBodyParser = bodyParser.json();

var port = process.env.PORT || 3000; // use env variable "port", if not thet then 3000

app.use("/assets", express.static(__dirname + "/public"));  // css, img, etc.

app.set("view engine", "ejs"); // set view engine

app.use("/", function(req, res, next) {  // midleware http://expressjs.com/en/guide/writing-middleware.html
    console.log(req.url); // middleware function
    next(); // go to router and do a response
});

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/name/:name", function(req, res) {
    res.render("person", { 
        ID: req.params.name, 
        Qpar: req.query.param
    });
});

app.post("/person", urlencodedBodyParser, function(req, res) {
   res.send("Thanks!");
   console.log(req.body.name);
   console.log(req.body.do);
});

app.post("/postjson", jsonBodyParser, function(req, res) {
   console.log(req.body.name);
   console.log(req.body.surname);
});

app.get("/api", function(req, res) {
    res.json({ name: "Ray", surname: "Stenders" });
});

app.listen(port);
