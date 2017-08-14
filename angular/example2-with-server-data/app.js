var express = require("express");
var app = express();

app.use("/assets", express.static(__dirname + "/public"));  
app.set("view engine", "ejs"); 
var port = process.env.PORT || 3000; 

var persons = [
        { name: "Ray" },
        { name: "Kevin" },
        { name: "Kva" }];

app.get("/", function(req, res) {
    res.render("index", { serverData: persons });
});

app.listen(port);
