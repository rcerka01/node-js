var request = require('request');
var bodyParser = require("body-parser"); // for POST requests
var urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
 
var j = JSON.stringify({"filter": { "inPlayOnly": true }, "maxResults": 20 });

var x = JSON.parse(j);

console.log(x);

var options = {
  url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listMarketCatalogue/',
  method: "POST",
 form: x,
  headers: {
            "Accept": "text/json",
            'X-Application': "WNArLQTYiNlpYb8x",
            'X-Authentication': "BxlTTlkjpXiPWqvnrLY1yJt0r/EnEYPntGCRjOrE8Wk=",
            'Content-Type': "application/json"
 }
};
 
function callback(error, response, body) {
    console.log("wzzzzz");
  //if (error) throw error;
  if (!error && response.statusCode == 200) {
    //var info = JSON.parse(body);
    console.log(body);
  }

    // var info = JSON.parse(body);
  //  console.log(info);
    console.log(error);
   // console.log(response.statusCode);
    console.log("brrrrr");
        console.log("b" +body);
        console.log(response.body);

}
 
request.post(options, callback).form(x);
