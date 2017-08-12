var bodyParser = require("body-parser"); // for POST requests
var jsonBodyParser = bodyParser.json();

module.exports = function(app) {

    // ON LOAD SCRIPT
    app.post("/postjson", jsonBodyParser, function(req, res) {  
        console.log(req.body.name);
        console.log(req.body.surname);
    });

    // REST API
    app.get("/api/persons", function(req, res) {
        // get all from DB
        res.json([ 
             {name: "Ray", surname: "Stenders"},
             {name: "Bruno", surname: "Stradivari"}
        ]);
    });

    app.get("/api/person/:id", function(req, res) {
        // get from DB
     res.json({ name: "Ray", surname: "Stenders" });
    });

    app.post("/api/person/:id", function(req, res) {
        // save to DB
        res.json({ name: "Ray", surname: "Stenders" });
    });

    app.put("/api/person/:id", function(req, res) {
        // update in DB
        res.json({ name: "Ray", surname: "Stenders" });
    });

    app.delete("/api/person/:id", function(req, res) {
        // remove from DB
        res.json({ name: "Ray", surname: "Stenders" });
    });
}
