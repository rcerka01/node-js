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
 
 function getEventTypesList(){
  $.ajax({
     type: "GET",
     url: "/api/listEventTypes",
     success: function(msg) {
       var output = "";
       for(var i in msg)
         {
           output = output + ("<li>" + msg[i].name + " <strong>" + msg[i].market_count + "</strong></li>");
         }
         $('#events').html("Market count: <ul>" + output + "</ul>")
       }
  }); 
}

function getSoccerEventsList(){
  $.ajax({
     type: "GET",
     url: "/api/listSoccerEvents",
     success: function(msg) {
       var output = "";
       for(var i in msg)
         {
          output = output + ("<li><span style='font-size:12px;'><strong>" 
            + msg[i].name + "</strong><br /> "
            + msg[i].open_date + "<br /><span style='color:blue;'>" 
            + msg[i].country + "</span>, Market: <strong>"            
            + msg[i].market_count + "</strong></span></li>");
         }
         $('#socerevents').html("Football: <ul>" + output + "</ul>")
       }
  }); 
}


function getSoccerInGameEventsList(){
  $.ajax({
     type: "GET",
     url: "/api/listInPlaySoccerEvents",
     success: function(msg) {
       var output = "";
       for(var i in msg)
         {
          output = output + ("<li><span style='font-size:12px;'><strong>" 
            + msg[i].name + "</strong><br /> "
            + msg[i].open_date + "<br /><span style='color:blue;'>" 
            + msg[i].country + "</span>, Market: <strong>"            
            + msg[i].market_count + "</strong></span></li>");
         }
         $('#soceringame').html("Football currently played: <ul>" + output + "</ul>")
       }
  }); 
}
