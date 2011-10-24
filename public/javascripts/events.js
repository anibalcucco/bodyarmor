(function($) {
  //var events   = [];
  var carousel = null;
  var profile  = null;
  var token    = "AAACEdEose0cBAOWdJPZAuRgsrZCPLsYJ3S9mhbJITZCPChE022VRg02SESz3JKUUq6bkjNPP8CZBkTwqTtyYP087DoZBmtOMZD";

  function load() {
    var url = "https://graph.facebook.com/" + profile + "/events?access_token=" + token;
    $.getJSON(url, {}, function(data) {
      events = data.data;
      $.each(events, function(key, event) {
        carousel.append(li(event));
      });
      if (events.length > 0) {
        carousel.jcarousel({});
      } else {
        carousel.html("No events found");
      }
    });
  }

  function li(event) {
    return '<li><a href="http://www.facebook.com/events/' + event.id + '" target="_blank"><img src="https://graph.facebook.com/' + event.id + '/picture"></a></li>';
  }

  $(document).ready(function() {
    carousel = $("#events #carousel");
    profile  = carousel.data("profile");

    if (carousel.length) {
      load();
    }
  });
}(this.jQuery));