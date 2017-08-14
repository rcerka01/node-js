var Todos = require("../models/todoModel");

module.exports = function(api) {
    api.get("/setup", function(req, res) {
        
        var setupTodos = [
            {
                name: "ray",
                job: "love life",
                isDone: false,
                hasAttachment: false
            },
            {
                name: "ray",
                job: "lhave a sex",
                isDone:  false,
                hasAttachment: false
            },
            {
                name: "ray",
                job: "woke up",
                isDone: false,
                hasAttachment: false
            },
        ];

        Todos.create(setupTodos, function(err, results) {
            res.send(results);
        });
    });
}
