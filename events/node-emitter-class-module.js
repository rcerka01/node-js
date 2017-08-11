var NodeEmitter = require("events"); // core module

module.exports = class Greeting extends NodeEmitter{
    constructor() {
        super();
        this.greeting = "Hallo from Greeting function constructor! (with classes)";
    }

    greet(data) {
        console.log(this.greeting + " Data was passed in: " + data + "(with classes)") 
        this.emit("greet-c", data)
    }
}
