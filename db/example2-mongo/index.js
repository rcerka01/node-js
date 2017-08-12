var express = require("express");
var mongoose= require("mongoose");
var htmlController = require(__dirname + "/controllers/htmlController");
var apiController = require(__dirname + "/controllers/apiController");

// --------------------------- MONGO
mongoose.connect("mongodb://rcerka01:test@ds145303.mlab.com:45303/addressbook");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    surname: String,
    address: String
});

var Person = mongoose.model("Person", personSchema);

var ray = Person({
    name: "Ray",
    surname: "Standers",
    address: "Cīruļu 49A"
});

ray.save(function(err) {
    if (err) throw err;
    console.log("Saved in Mongo!");
});
// -----------------------------------

var app = express();

app.use("/assets", express.static(__dirname + "/public"));  // css, img, etc.

app.set("view engine", "ejs"); // set view engine

// MIDDLEWARE
app.use("/", function(req, res, next) {  

    Person.find({}, function(err, users) {
        if (err) throw err;
        console.log(users); // log users
        console.log(req.url); // log routes

         next(); // go to router and do a response
    }); // return all Mongo persons
});

// // DB OUTPUT(!)
// app.get("/mongo", function(req, res) {
//     res.send();
// });

htmlController(app);
apiController(app);

var port = process.env.PORT || 3000; // use env variable "port", if not thet then 3000
app.listen(port);
