(function($) {
  //var tweets   = [];
  var feed     = null;
  var username = null;

  function load() {
    var url = "http://twitter.com/statuses/user_timeline.json?screen_name=" + username + "&include_entities=true&include_rts=true&count=5&callback=?";
    $.getJSON(url, {}, function(data) {
      tweets = data;
      $.each(tweets, function(key, tweet) {
        feed.append(li(tweet));
      });
      if (tweets.length == 0) {
        feed.html("No tweets found");
      }
    });
  }

  function li(tweet) {
    return '<li>' + tweet.text + '</li>';
  }

  $(document).ready(function() {
    feed     = $("#feed");
    username = feed.data("username");

    if (feed.length) {
      load();
    }
  });
}(this.jQuery));