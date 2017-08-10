var x = 1;
x = x + 1;
console.log('Hallo master! ' + x)

function sayHay() {
    console.log("hi");
}

// function first class
function callFunction(fn) {
    fn();
}
callFunction(sayHay);

// function expression
var loveLife = function() { console.log("Love Life") }
callFunction(loveLife)

// function expression on the fly
callFunction(function(){console.log("On the fly")})

// include module
var greetingsModule = require("./greetings-module");
greetingsModule()

// object literals
var person = {
    name: "Ray",
    surname: "Standers",
    greeting: function(){console.log("Hallo" + " " + this.name + " " + this.surname)}
}
person.greeting()
console.log(person["name"])

// function constructor
function Person(name, surname) {
    this.name = name;
    this.surname = surname;
}

Person.prototype.newGreeting = function() {console.log("Prototype greeting for " + this.name)}

var person = new Person("ray", "standers")
console.log(person.name + " " + person.surname)
person.newGreeting()
console.log(person.__proto__)

// pass by value
var v = 1
function changeValue(x) { x + 1 }
changeValue(v)
console.log(v)

// pass by object
var obj= {}
obj.name = "Ultra"
obj.prop = function() {}
function objChanger(o) {
    o.name = "New Ultra";
    o.prop = "I am ultra now"
}
objChanger(obj);
console.log(obj);

// imidiatly invoked functions 
var name = "OTHER ABRACADABRA";
(function() {
    var name = "ABRACADABRA"
    console.log(name)
}()); // run as a normal function
console.log(name); // can be vars with same name

// multi folder modules
var multilanguageGreetings = require("./multilanguage-greetings");
// looks in folder for index.js file
multilanguageGreetings.latvian();
multilanguageGreetings.english();

// 5 patterns to require modules
// 1 as before
var p1 = require("./p1-module");
p1();
// 2 add property to export
require("./p2-module").greetings();
// 3 use function constractor (and it is a Singleton!!!)
var p3 = require("./p3-module");
p3.greet();
var p3b = require("./p3-module"); // always returned same object, as it is been cached
p3b.greeting = "Updated greeting";
p3b.greet();
// 4 use on every require a new object, pase function constractor itself
var P4 = require("./p4-module");
var obj = new P4();
obj.greet();
obj.greeting = "Updated p3 greeting";
var P4b = require("./p4-module");
var obj2 = new P4b();
obj2.greet();
// 5 expose only necesary functions of module (the rest is private)
var p5 = require("./p5-module");
p5.greet(); // greeting property is unaccsessable

// native (core) modules https://nodejs.org/dist/latest-v6.x/docs/api/
var util = require("util"); // usually without a slash prefix
var name = "Ray";
var greeting = util.format("Hallo, beautiful %s", name)
util.log(greeting);
