function Greeting() {
    this.greeting = "Hallo p4";
    this.greet = function() { console.log(this.greeting) };
}

module.exports = Greeting;
