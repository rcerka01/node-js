var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("index");
});

var accountController = require("./controllers/accountController");
var bettingsController = require("./controllers/bettingsController");
accountController(app);
bettingsController(app);

var port = 3000;
app.listen(port);
