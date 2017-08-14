var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/public"));

var databaseConnection = require("./config/database");
databaseConnection();

var setupController = require("./controllers/setupController");
setupController(app);

var apiController = require("./controllers/apiController");
apiController(app);

var port = process.env.port || 3000;
app.listen(port);
