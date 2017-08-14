var config = require("./config");
var mongoose = require("mongoose");

var databaseConfig = config.database;

module.exports = function() {
    mongoose.connect("mongodb://"
        + databaseConfig.user + ":" 
        + databaseConfig.password + "@ds145193.mlab.com:45193/" 
        + databaseConfig.name, { useMongoClient: true });
}
