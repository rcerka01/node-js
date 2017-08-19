var request = require('request');

var json = { filter: { inPlayOnly: true }, maxResults: 20 }

var options = {
  url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listMarketCatalogue/',
  method: "POST",
  body: json,
  json: true,
  headers: {
            "Accept": "text/json",
            'X-Application': "WNArLQTYiNlpYb8x",
            'X-Authentication': "HmGBERMWuNr7/NMmknl5vJi5HlQBMszC5/Z28sTCoPc=",
            'Content-Type': "application/json"}
}
 
function callback(error, response, body) {
    console.log("CALLBACK:");
    console.log(json);
    console.log(response.statusCode);
    console.log(body);
}
 
request.post(options, callback);
