var conf = require("../config/config");
var request = require("request");
var dateFormat = require('dateformat');

var urlCatalogueList = "https://api.betfair.com/exchange/betting/rest/v1.0/listMarketCatalogue/";
var urlEventTypesList = "https://api.betfair.com/exchange/betting/rest/v1.0/listEventTypes/";
var urlSocerEventsList = "https://api.betfair.com/exchange/betting/rest/v1.0/listEvents/";

var bodyCatalogueList = { filter: { inPlayOnly: true }, maxResults: 100 }
var bodyEventTypesList = { filter: { } }
function bodySocerEventsList(nowIso, tomorrowIso) { return { filter: { eventTypeIds: [ 1 ],
                                      marketStartTime: {
                                        from: nowIso,
                                        to: tomorrowIso     
                                    }}}}

function options(url, token, body) {
    return {
        url: url,
        method: "POST",
        body: body,
        json: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/json",
            'X-Application': conf.user.apiKey,
            'X-Authentication': token }
        }
};

module.exports = function(app, token) {
    var utilities = require("./utilities");
    // ****************************************************
    // * List catalogue
    // ****************************************************
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

            } else if (response.statusCode == 400) { 
                utilities.recoverFromUnauthorisedRequest(app, req, res) 
             } else {
                console.log("Unexpected error from " + req.url +", " + error)
                res.json([]);
             }
        }

        request.post(options(urlCatalogueList, token, bodyCatalogueList), callback);
    });

    // ****************************************************
    // * List Event Types
    // ****************************************************
    app.get("/api/listEventTypes", function(req, res) {
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                
                var output = [];
                body.map(item => 
                    output.push({
                        id: item.eventType.id,
                        name: item.eventType.name,
                        market_count: item.marketCount
                    })
                );

                output.sort( (a,b) => Number(b.market_count) - Number(a.market_count) )

                res.json(output);

            } else if (response.statusCode == 400) { 
                utilities.recoverFromUnauthorisedRequest(app, req, res) 
            } else {
                console.log("Unexpected error from " + req.url +", " + error)
                res.json([]);
            }
        }

        request.post(options(urlEventTypesList, token, bodyEventTypesList), callback);
    });

    // ****************************************************
    // * List Socer Events
    // ****************************************************
    app.get("/api/listSocerEvents", function(req, res) {
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                
                var output = [];
                body.map(item => 
                    output.push({
                        id: item.event.id,
                        name: item.event.name,
                        country: item.event.countryCode,
                        open_date: dateFormat(item.event.openDate,'d mmm yyyy HH:MMtt'),
                        market_count: item.marketCount
                    })
                );

                output.sort( (a,b) => Number(b.market_count) - Number(a.market_count) )

                res.json(output);

            } else if (response.statusCode == 400) { 
                utilities.recoverFromUnauthorisedRequest(app, req, res) 
            } else {
                console.log("Unexpected error from " + req.url + ", " + error)
                res.json([]);
            }
        }

        var now = new Date()
        var nowIso = dateFormat(now, "isoDateTime")
        var tomorrowIso = dateFormat(new Date().setDate(now.getDate() + 1), "isoDateTime")

        request.post(options(urlSocerEventsList, token, bodySocerEventsList(nowIso, tomorrowIso)), callback);
    });
}
