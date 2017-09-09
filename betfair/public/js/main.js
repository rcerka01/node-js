  // FAKE FUNCTION
  function setBet() {
    $('#setbet').empty();
    var bet = "<p>Conditions are met, set bet 10.00 GBP<br>Response: <span style='color:red;'>[ERROR]</span></p>";
    for (var i = 1; i <= 20; i++) {
      (function(index) {
          setTimeout(function() { $('#setbet').append(bet); }, i * 3000);
      })(i);
    }
  }

  function refresh() {
    // accounts
    getAccountDetails();
    getCurrencies();
    getFunds();

    // bets
    getEventTypesList();
    getSoccerEventsList();
    getSoccerInGameEventsList()        

    // fake
    setBet();
  }

var globalRefreshTime; 
  
function run(refreshInterval) {
    var now = new Date();
    this.globalRefreshTime = new Date( now.setSeconds( now.getSeconds() + refreshInterval ) )
    $("#countdown").html(refreshInterval + "s left till next refresh");
    refresh();
    setInterval(function() {
        var currentTime = new Date();
        var update = new Date( this.globalRefreshTime.getTime() - currentTime.getTime() ).getSeconds();
        $("#countdown").html(update + "s left till next refresh");
    }, 1000); 
}
