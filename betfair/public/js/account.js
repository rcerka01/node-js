function getAccountDetails(){
    $.ajax({
       type: "GET",
       url: "/api/getAccountDetails",
       success: function(msg) {
           $('#summary').html(""
             + msg.first_name + " "
             + msg.last_name + ", "
             + msg.nationality + ", "
             + msg.region + ", "
             + "Discount: " + msg.discount_rate + " points, "
             + msg.currency_code
           )}
    });
 }
 
 function getFunds(){
    $.ajax({
       type: "GET",
       url: "/api/getFunds",
       success: function(msg) {
           $('#funds').html("<strong>" +
             "AVAILABLE: " + msg.available_to_bet + " GBP </strong><span style='font-size:12px;'>" +
             "COMMISION: " + msg.commision + ", " +
             "EXPOSURE: " + msg.exposure + ", " +
             "LIMIT: " + msg.exposure_limit + ", " +
             "DISCOUNT: " + msg.discount + ", " +
             "POINTS: " + msg.points + "</span>"
           )}
    });
 }
 
 function getCurrencies(){
    $.ajax({
       type: "GET",
       url: "/api/listCurrencies",
       success: function(msg) {
         var output = "";
         for(var i in msg)
           {
             output = output + ("<li>" + msg[i].currency_code + ": " + msg[i].rate + "</li>");
           }
           $('#currency').html("<ul>" + output + "</ul>")
         }
    }); 
 }
 