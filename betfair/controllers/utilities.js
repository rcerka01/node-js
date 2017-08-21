var request = require('request');
var conf = require("../config/config");
var mainController = require('./mainApiController');
                
var COUNT = 0;

function removeParameters(url) { return url.split('?')[0]; }

// take all data from config
module.exports = {
    recoverFromUnauthorisedRequest: function recover(app, req, res) {
        if (typeof req.params.attempt != 'undefined') { COUNT = req.param.attempt; }
        if (COUNT <= conf.api.maxReloadToken) {
            mainController.run(app);
            request(conf.api.protocol + "://" + req.hostname  + ":" + conf.api.port 
                + removeParameters(req.url) + "?attempt=" + ++COUNT).pipe(res);
        } else {
            console.log("Unautorised requests to " + removeParameters(req.url) + " exceeded maximum attempts of " 
                + conf.api.maxReloadToken + ". Empty response generated.");
            res.json([]);
        }
    }
}
