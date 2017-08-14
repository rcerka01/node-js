var express = require("express");
var app = express();

app.use("/assets", express.static(__dirname + "/public"));  
app.set("view engine", "ejs"); 
var port = process.env.PORT || 3000; 

// DB OUTPUT(!)
app.get("/", function(req, res) {
    res.render("index");
});

app.listen(port);
