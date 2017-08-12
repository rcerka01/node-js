var bodyParser = require("body-parser"); // for POST requests
var urlencodedBodyParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    // ROOT
    app.get("/", function(req, res) {
        res.render("index");
    });

    // DET WITH PARAMETTERS
    app.get("/name/:name", function(req, res) {
            res.render("person", { 
            ID: req.params.name, 
            Qpar: req.query.param
        });
    });

    // POST
    app.post("/person", urlencodedBodyParser, function(req, res) {
        res.send("Thanks!");
        console.log(req.body.name);
        console.log(req.body.do);
    });
}
