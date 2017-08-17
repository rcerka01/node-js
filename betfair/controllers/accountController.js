var request = require("request");
var token = require("../config/config");

var urlAccount = "https://api.betfair.com/exchange/account/rest/v1.0/getAccountDetails/";
var urlCurrency = "https://api.betfair.com/exchange/account/rest/v1.0/listCurrencyRates/";

function options(url) {
    return {
        url: url,
        headers: {
            'Content-Type': "application/json",
            "Accept": "text/json",
            'X-Application': "WNArLQTYiNlpYb8x",
            'X-Authentication': token }
        }
};

module.exports = function(app) {
    // ---------------------------------------------------
    app.get("/api/getAccountDetails", function(req, res) {
 
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {

                var jsonRes = JSON.parse(response.body);

                var output = {
                    currency_code: jsonRes.currencyCode,
                    first_name: jsonRes.firstName,
                    last_name: jsonRes.lastName,
                    nationality: "Russian",
                    local_code: jsonRes.localeCode,
                    region: jsonRes.region,
                    timezone: jsonRes.timezone,
                    discount_rate: jsonRes.discountRate,
                    points_code: jsonRes.pointsBalance,
                    country_code: jsonRes.countryCode
                }

                res.json(output);
            }
        }

        request(options(urlAccount), callback);
    });

    // ---------------------------------------------------
    app.get("/api/listCurrencies", function(req, res) {
 
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {

                var jsonRes = JSON.parse(response.body);
                var output = [];

                jsonRes.map(item => 
                    output.push({
                        currency_code: item.currencyCode,   
                        rate: item.rate
                    })
                );

                res.json(output);
            }
        }

        request.post(options(urlCurrency), callback);
    });
}
