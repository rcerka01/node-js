var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: String,
    job: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
