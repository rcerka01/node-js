var request = require("request");
var token = require("../config/config");

var urlCatalogueList = "https://api.betfair.com/exchange/betting/rest/v1.0/listMarketCatalogue/";
var bodyCatalogueList = { filter: { inPlayOnly: true }, maxResults: 100 }
	
function options(url, body) {
    return {
        url: url,
        method: "POST",
        body: body,
        json: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/json",
            'X-Application': "WNArLQTYiNlpYb8x",
            'X-Authentication': token }
        }
};

module.exports = function(app) {

    // ---------------------------------------------------
    app.get("/api/listCatalogue", function(req, res) {
 
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                
                var output = [];
                body.map(item => 
                    output.push({
                        market: item.marketName,
                        total_matched: item.totalMatched
                    })
                );

                 res.json(output);

            } else throw error;
        }

        request.post(options(urlCatalogueList, bodyCatalogueList), callback);
    });
}
