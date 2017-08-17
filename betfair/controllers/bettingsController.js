var request = require("request");
var token = require("../config/config");

var urlCatalogue = "https://api.betfair.com/exchange/betting/rest/v1.0/listEventTypes/";
	

function options(url) {
    return {
        url: url,
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/json",
            'X-Application': "WNArLQTYiNlpYb8x",
            'X-Authentication': token }
        }
};

module.exports = function(app) {

    // // ---------------------------------------------------
    // app.get("/api/listCatalogue", function(req, res) {
 
    //     function callback(error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             console.log("ok");
    //             // var jsonRes = JSON.parse(response.body);
    //             // var output = [];

    //             // jsonRes.map(item => 
    //             //     output.push({
    //             //         currency_code: item.marketName   
    //             //     })
    //             // );

    //             // res.json(output);
    //              res.send("efef");
    //         }
    //             else 
    //                 console.log("not ok");

    //     }

    //     request.post(options(urlCatalogue), callback).form(
    //         {
	//             "filter": { }
    //         });
    //         //             {
	//         //     "filter": { "inPlayOnly": true },
    //         //     "maxResults" : 20
    //         // });
    // });
}
