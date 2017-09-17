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

var prevGameArr = [];
function getSoccerInGameEventsList(){
  $.ajax({
    type: "GET",
    url: "/api/listInPlaySoccerEvents",
    success: function(msg) {

      // init
      var output = [];
      var updated = false;
      var currentList = [];
      var total = msg.length;

      // loop all recieved games
      for(var i in msg) {
          
        // current game (item)
        var item = {
          name: msg[i].name,
          open_date: msg[i].open_date,
          country: msg[i].country,
          market_count: msg[i].market_count
        }

        // create main output 
        var outputItem = ("<li><a href=# onclick='return false;' id=ingameitem_" + i + "><span style='font-size:12px;'><strong>" 
          + msg[i].name + "</strong><br /> "
          + msg[i].open_date + "<br /><span style='color:blue;'>" 
          + msg[i].country + "</span>, Market: <strong>"            
          + msg[i].market_count + "</strong></span></a></li><div id='ingameitem_" + i + "' class='pop-up'></div>");

        output.push(outputItem);

        // if app is not just started and we have prev values
        if (prevGameArr.length > 0) {

          // new and finished flags
          var isNew = true;
          var isFinished = true;
          
          // loop previous values
          for(var ii in prevGameArr) {

            // update
            if (prevGameArr[ii].name == item.name &&
              prevGameArr[ii].market_count != item.market_count) {

              $('#logs').prepend("<p style='font-size:8px;'>["+ Date() +"]<span style='font-size:10px;'><span style='color:yellow;'> UPDATE:</span> " + 
              prevGameArr[ii].name + " " +
              " MARKET COUNT CHANGED FROM " + 
              prevGameArr[ii].market_count + " TO: " + 
              item.market_count + "</span></p>");

              isFinished = false

              updated = true;                
            } 

            // finished
            else if (prevGameArr[ii].name == item.name) {
              isFinished = false;
            }

            // new
            for (var iii in msg) {
              if (msg[iii].name == prevGameArr[ii].name) {
                isNew = false;
              }
            }
          }

          // output finished
          if (isFinished) {
            $('#logs').prepend("<p style='font-size:8px;'>["+ Date() +"] <span style='font-size:10px;'><span style='color:red;'> FINISHED:</span> " +
            item.name + " " +
            item.open_date + " " +
            item.country + " " +
            item.market_count + " IS FINISHED</span></p>");

            updated = true;              
          }

          // output new
          if (isNew) {
            $('#logs').prepend("<p style='font-size:8px;'>["+ Date() +"] <span style='font-size:10px;'><span style='color:green;'> NEW:</span> " +
            item.name + " " +
            item.open_date + " " +
            item.country + " " +
            item.market_count + " IS STARTED</span>");

            updated = true;              
          }
        }

        // mouseovers in page
        setMouseOver("a#ingameitem_" + i, "div#ingameitem_" + i);  
        soccerBetting(msg[i].id, "div#ingameitem_" + i); 
          
        currentList.push(item);
      }

      // current to previous
      prevGameArr = currentList;
      currentList = [];

      // gap output
      if (updated) { $('#logs').prepend("<p style='font-size:8px;'>" + total + " Games In Play --------------------------------------------</p>"); }

      // output
      $('#soceringame').html("Football currently played: <ul>" + output.join("") + "</ul>")
    }
  }); 
}
