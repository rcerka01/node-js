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

function soccerBetting(catalogueId, outputDiv) {
  $.ajax("/api/listCatalogue/" + catalogueId)
   .then(function(catalogue) {

    for (i in catalogue) {
      var marketId = catalogue[i].item.marketId;

      $.when($.ajax("/api/listBet/" + marketId).then(function(bets) {

        var retMarketId = JSON.stringify(bets[0].item.marketId)
        var betsStr = JSON.stringify(bets[0].item);

        $(outputDiv + " span:contains('"+ retMarketId +"')").append("<br><span style='color:red;font-weight:bold;'>BETS: " +  betsStr.replace(/,/g, "<br />")  + " </span>")
      }))
      
    }

    $(outputDiv).jsonViewer( catalogue, { collapsed: false });
  })
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
          soccerBetting(msg[i].id, "div#ingameitem_" + i);              
         }
         $('#soceringame').html("Football currently played: <ul>" + output + "</ul>")
       }
  }); 
}
