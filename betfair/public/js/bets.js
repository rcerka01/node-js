function gettMarketCatalogueList(){
    $.ajax({
       type: "GET",
       url: "/api/listCatalogue",
       success: function(msg) {
         var output = "";
         for(var i in msg)
           {
             output = output + ("<li>" + msg[i].market + ": <strong>" + msg[i].total_matched + "</strong></li>");
           }
           $('#catalogue').html("<ul>" + output + "</ul>")
         }
    }); 
 }
 