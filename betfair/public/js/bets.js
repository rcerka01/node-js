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

function getMarketCatalogueList(tagId, outputDiv){
    $.ajax({
       type: "GET",
       url: "/api/listCatalogue/" + tagId,
       success: function(msg) {
          var output = JSON.stringify(msg);
          $(outputDiv).jsonViewer(msg, {collapsed: false});
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
          output = output + ("<li><a href=# onclick='return false;' id=ingameitem_" + i + "><span style='font-size:12px;'><strong>" 
            + msg[i].name + "</strong><br /> "
            + msg[i].open_date + "<br /><span style='color:blue;'>" 
            + msg[i].country + "</span>, Market: <strong>"            
            + msg[i].market_count + "</strong></span></a></li><div id='ingameitem_" + i + "' class='pop-up'></div>");

          setMouseOver("a#ingameitem_" + i, "div#ingameitem_" + i);  
          getMarketCatalogueList(msg[i].id, "div#ingameitem_" + i);              
         }
         $('#soceringame').html("Football currently played: <ul>" + output + "</ul>")
       }
  }); 
}
