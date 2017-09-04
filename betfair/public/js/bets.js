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

// function getBooksList(tagId, outputDiv){
//   $.ajax({
//      type: "GET",
//      url: "/api/listCatalogue/" + tagId,
//      success: function(msg) {
//         var output = JSON.stringify(msg);
//         $(outputDiv).jsonViewer(msg, {collapsed: false});
//       }
//   }); 
// }



function getBet(json, i, marketId) {
  $.when($.ajax("/api/listBet/" + marketId).then(function(l) {
    json[i].item.ultra = " Ray Standers";
    //alert(JSON.stringify(json));
    return json;
  }))
}

function getAllBets(c) {
    var output = [];
    for(var i in c) {
     var marketId = c[i].item.marketId;
    // alert(marketId);

    var t = JSON.parse(c);
    
     $.when(getBet(t, i, marketId)).then(function(results) {
       //alert(JSON.stringify(c));
       //alert(i);
       //alert(results);
       output.push(results);
      // alert(JSON.stringify(output));
       if (output.length == c.length) return output;
     })
    }
  

}




function getMarketCatalogueList(tagId, outputDiv) {
  $.when($.ajax("/api/listCatalogue/" + tagId).then(function(c) {
    $.when(getAllBets(c)).then(function(r) {
      $(outputDiv).jsonViewer( r, { collapsed: true });
    })
  }
))
}
        
        

             
                  
                
                



  
//   var outerOutput = [];
//   $.when(
//     $.ajax({
//       type: "GET",
//       url: "/api/listCatalogue/" + tagId,
//       success: function(catalogues) {
//       // var cataloguesStr = JSON.stringify(catalogues);

//       outerOutput = catalogues;

//       var innerOutput = [];

//      // $(outputDiv).jsonViewer( catalogues, { collapsed: true });
      

//       for(var i in catalogues) {
//         var marketId = catalogues[i].item.marketId;
//         $.ajax({
//           type: "GET",
//           url: "/api/listBet/" + marketId,
//           success: function(book) {

//             for(var ii in outerOutput) {

//              // if (outerOutput[ii].item.marketId === marketId) {
//                 //alert("Bingo");
//                 outerOutput[ii].item.ray = " Ray Stenders"
//                 outerOutput.push({sss: "zzz"})
//               //}


//             }



            



//             //$( outputDiv+":contains('marketId')" ).css( "text-decoration", "underline" );
            

//            // innerOutput.push()

//             // alert(outputDiv)

//             // $( outputDiv+":contains(" + marketId + ")" ).css( "text-decoration", "underline" );

//            // alert("i = " + i + "; catalogues length: " + catalogues.length);

//             // bookStr = JSON.stringify(book);

//             //alert(bookStr);
//             //$.extend(catalogues[i].item, {ssss: "rr"})
//             //output.push(catalogues[i].item)

//             //  if (i++ == catalogues.length) {
//             //    alert(catalogues.length);
//             //   $(outputDiv).jsonViewer(output, {collapsed: false})
//             //   output = [];
//             // }

            
//           // 2nd looped ajax success
//           }
//         // 2nd looped ajax
//         });
//       // loop
//       }
//    // $(outputDiv).jsonViewer( catalogues, { collapsed: false });
//     // 1st ajax success
//     }
//   // 1st ajax
//   }) 
//       )
//     .done(function(zebra){

//       $(outputDiv).jsonViewer( outerOutput, { collapsed: false })

//         //do something
//     })
// //main
// }



      //    $(outputDiv).jsonViewer(catalogues, { collapsed: false });
          
            


          // $.ajax({
          //   type: "GET",
          //   url: "/api/listBet" + catalogues[i].marketId,
          //   success: function(book) {

          //     catalogues[i].push({ ray: "book" });
  
          //     $(outputDiv).jsonViewer(catalogue, {collapsed: false});
          //     //$(outputDiv).jsonViewer(catalogues, {collapsed: false})
              
          //   }
          // });

          





        //catalogue.push({ ray: "Standers" });
       //$(outputDiv).jsonViewer(catalogues, {collapsed: false})



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
