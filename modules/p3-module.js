function Greeting() {
    this.greeting = "Hallo p3";
    this.greet = function() { console.log(this.greeting) };
}

module.exports = new Greeting();
