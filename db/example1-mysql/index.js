var express = require("express");
var mysql = require("mysql");
var htmlController = require(__dirname + "/controllers/htmlController");
var apiController = require(__dirname + "/controllers/apiController");

var app = express();

app.use("/assets", express.static(__dirname + "/public"));  // css, img, etc.

app.set("view engine", "ejs"); // set view engine

// MIDDLEWARE
app.use("/", function(req, res, next) {  
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test-node"
    }); // connect MySql

    console.log(req.url); // log routes

    con.query("SELECT * FROM `test-node`.People;", function(err, rows) {
        if (err) throw err;
        console.log(rows);
    }); // mysql query

    next();
});

// // DB OUTPUT(!)
// app.get("/mysql", function(req, res) {
//     res.send();
// });

htmlController(app);
apiController(app);

var port = process.env.PORT || 3000; // use env variable "port", if not thet then 3000
app.listen(port);
