var accountController = require("./accountController");
var bettingsController = require("./bettingsController");
var tokenGenerator = require("../config/tokenGenerator");

module.exports = { run: function(app) { 
        function returnValidToken(error, response, body) {
            var validToken = body.sessionToken;
            accountController(app, validToken);
            bettingsController(app, validToken);
        }

        tokenGenerator(returnValidToken);
    }
}
