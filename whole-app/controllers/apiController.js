var Todo = require("../models/todoModel");
var bodyParser = require("body-parser");

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get("/todos/:name", function(req, res) {
        Todo.find({ name: req.params.name }, function(err, results) {
            if (err) throw err
            res.send(results);
        });
    });

    app.get("/todo/:id", function(req, res) {
        Todo.findById({ _id: req.params.id }, function(err, results) {
            if (err) throw err
            res.send(results);
        });
    });

    app.post("todo", function(req, res) {
        if (req.body.id) {
            Todo.findByIdAndUpdate(req.body.id, {
                job: req.body.job,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function(err) {
                if (err) throw err;
                res.send("Successfuly updated!");
            });
        } else {
            var newTodo = Todo({
                name: "ray",
                job: req.body.job,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment 
            })
            newTodo.save(function(err) {
                if (err) throw err;
                res.send("Successfuly created!");
            });
        }
    });

    app.delete("todo", function(req, res) {
        Todo.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err;
            res.send("Successfuly deleted!");
        });
    });
}
