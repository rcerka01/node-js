// SOME JS
//pass obj value
var obj = {
    greeting: "Hallo"
}
console.log(obj.greeting) // normal
console.log(obj["greeting"]) // is same
var g = "greeting" // can pass var name as string
console.log(obj[g])

// functions and arrays
var a = [];
a.push(function() { console.log("Hallo Ray") })
a.push(function() { console.log("Hallo Bruno") })
a.push(function() { console.log("Hallo Ilva") })
a.forEach(function(item) {
    item();
})
// ----------------

// FAKE EMITTER
var Emitter = require("./Emitter");
var emitter = new Emitter();

emitter.on("greet", function() { console.log("Greetings to you!") });
emitter.on("greet", function() { console.log("Hallo stranger") });
emitter.on("not-greet", function() { console.log("I shouldnt be here!") });

emitter.emit("greet");

// NODE EMITTER
var NodeEmitter = require("events"); // core module
var nodeEmitter = new NodeEmitter();

nodeEmitter.on("greet", function() { console.log("Greetings to you (node)!") });
nodeEmitter.on("greet", function() { console.log("Hallo stranger (node)") });
nodeEmitter.on("not-greet", function() { console.log("I shouldnt be here (node)!") });

nodeEmitter.emit("greet");

// NODE EMITTER BY DECLARING config.js
var eventConfig = require("./config"); 

nodeEmitter.on(eventConfig.GREETING, function() { console.log("Greetings to you (node + config)!") });
nodeEmitter.on(eventConfig.GREETING, function() { console.log("Hallo stranger (node + config)") });
nodeEmitter.on(eventConfig.OTHEREVENT, function() { console.log("I shouldnt be here (node + config)!") });

nodeEmitter.emit(eventConfig.GREETING);

// Object.create AND Prototypes
var person = {
    name: "",
    surname: "",
    greet: function() {
        console.log("Hallo " + this.name + " " + this.surname)
    }
}
var ray = Object.create(person)
ray.name = "Ray"
ray.surname = "Standers"

var bruno = Object.create(person)
bruno.name = "Bruno"
bruno.surname = "Star"

ray.greet();
bruno.greet();

// INHERITANCE
//var NodeEmitter = require("events"); // have it already
var util = require("util"); // core module

function Greeting() {
    NodeEmitter.call(this); // Superconstractor. 
    // Override NodeEmiter "this", to make sure that not only prototype, but all atributes are included
    // Explained lower (search for 'superconstractor')
    this.greeting = "Hallo from Greeting function constructor!";
}

util.inherits(Greeting, NodeEmitter); // !!!

Greeting.prototype.greet = function(data) { 
    console.log(this.greeting + " Data was passed in: " + data) 
    this.emit("greet-i", data)
}  // add greet method to Greeting + emit event

var g = new Greeting();
g.on("greet-i", function(data){ console.log("Greet just hapened! Data: " + data) });
g.greet("Liepāja");

// TEMPLATE LITERALS
var name = "Ray";
var greet1 = "Hallo " + name;
var greet2 = `Hallo ${name}`; // template literal. Mutch faster. To translate to use in older browsers use https://babeljs.io/
console.log(greet1);
console.log(greet2);

// .call AND .applay GIVES ABILITY OVERRIDE "this"

var human = {
    name: "Gremlin",
    greet: function(param){ console.log(this.name + " " + param) }
}

human.greet("pampam");
human.greet.apply({name: "Ray"}, ["pam"]);
human.greet.call({name: "also Ray"}, "param") // only difference is how to pass parameters

// SUPERCONSTRUCTOR
function SuperperPerson() {
    this.name = "Ray"
    this.surname = "Lovemaker"
}

SuperperPerson.prototype.greeting = function() { console.log("Hallo " + this.name + " " + this.surname) }

var superPerson = new SuperperPerson()
superPerson.greeting();

function Profesional() {
    SuperperPerson.call(this); // !!!! Only with this you can call name and rurname from SuperPerson
    this.ocupation = "policemen";
    this.whoAmI = function() { console.log("I am a " + this.ocupation) };
}

util.inherits(Profesional, SuperperPerson)

var profesional  = new Profesional();
profesional.whoAmI(); 
profesional.greeting(); // <- this works, but without parameters defined in Function Constructor

// CLASSES (works as sugar, just different way of writing)

// function Person() {
//     this.name = "Ray"
//     this.surname = "Lovemaker"
// }
// and
// SuperperPerson.prototype.greeting = function() { console.log("Hallo " + this.name + " " + this.surname) }
// would be
class Person {

    constructor(name, surname) {
     this.name = name
     this.surname = surname
    }

    greeting() {
        console.log("Hallo " + this.name + " " + this.surname)
    }
}

var ray = new Person("Ray", "Dove");
var margaret = new Person("Margaret", "Techer");
ray.greeting();
margaret.greeting();

// REVRITE NODE EMITTER WITH CLASSES
var GreetingC = require("./node-emitter-class-module");

var gc = new GreetingC();
gc.on("greet-c", function(data){ console.log("Greet just hapened! Data: " + data + "(with classes)") });
gc.greet("Daugavpils");


