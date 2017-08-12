var express = require("express");
var htmlController = require(__dirname + "/controllers/htmlController");
var apiController = require(__dirname + "/controllers/apiController");

var app = express();

app.use("/assets", express.static(__dirname + "/public"));  // css, img, etc.

app.set("view engine", "ejs"); // set view engine

// LOG ROUTES
app.use("/", function(req, res, next) {  // midleware http://expressjs.com/en/guide/writing-middleware.html
    console.log(req.url); // middleware function
    next(); // go to router and do a response
});

htmlController(app);
apiController(app);

var port = process.env.PORT || 3000; // use env variable "port", if not thet then 3000
app.listen(port);
