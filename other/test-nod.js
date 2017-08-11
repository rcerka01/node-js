// BUFFERS
var buf = new Buffer("Hallo", "utf-8");
console.log(buf);
console.log(buf.toString());
console.log(buf.toJSON());
console.log(buf[0]);

buf.write("XX");
console.log(buf.toString());

// TYPED ARRAYS
var buffer = new ArrayBuffer(8);
var view = new Int32Array(32); // as JS don't have mutch functions to deal with Binary Data Int32Arry is like helper
view[0] = 27;
view[1] = 15;
console.log(view);

// CALLBACKS
function greeting(callback) {
    console.log("Hallo There!");
    var callbackData = { name: "Ray", ocupation: "Policemen" }
    callback(callbackData);
}

greeting(function(data) {
    console.log("Callback!!! You are " + data.name);
});

greeting(function(data) {
    console.log("Another callback!!! You are " + data.ocupation);
});

// READ FILES
var fs = require("fs");

var content = fs.readFileSync("./test-text.txt", "utf8"); // Read Synchronosly and bloks application
console.log(content);

var content = fs.readFile("./test-text.txt", "utf8", function(err, data) {
    console.log(data)
}); // Read ASynchronously, non blocking

console.log("Done!");

// STREAMS
var readstream = fs.createReadStream(
    __dirname + "/readable-stream.txt",{ encoding: "utf8", highWaterMark: 1024 * 8 })

var writestream = fs.createWriteStream(
    __dirname + "/writable-stream.txt")

    readstream.on("data", function(chunk) {
        console.log(chunk.length)
        writestream.write(chunk)
    }); 

// PIPES
var zlib = require("zlib");

var readPipe = fs.createReadStream(__dirname + "/readable-stream.txt")
var writePipe = fs.createWriteStream(__dirname + "/writable-pipe.txt")
var compressed = fs.createWriteStream(__dirname + "/gzip-pipe.txt.gz")
var gzipPipe = zlib.createGzip() // duplex stream

readPipe.pipe(writePipe);
readPipe.pipe(gzipPipe).pipe(compressed)
