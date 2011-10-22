(function($) {
  var videos   = [];
  var carousel = null;
  var album    = null;

  function load() {
    var url = "http://vimeo.com/api/v2/album/" + album + "/videos.json?callback=?";
    $.getJSON(url, {}, function(data) {
      videos = data;
      $.each(videos, function(key, video) {
        carousel.append(li(video));
      });
      if (videos.length > 0) {
        carousel.jcarousel({});
        show(videos[0].id);
      } else {
        carousel.html("No videos in album");
      }
    });
  }

  function li(video) {
    return '<li id="' + video.id + '"><img src="' + video.thumbnail_small + '"></li>';
  }

  function iframe(video) {
    return '<iframe src="http://player.vimeo.com/video/' + video.id + '" width="' + 260 + '" height="' + 180 + '" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>';
  }

  function show(id) {
    var video = get(id);
    $("#videos #description").html(video.description);
    $("#videos #title").html(video.title);
    $("#videos #player").html(iframe(video));
  }

  function get(id) {
    for (var i = 0, len = videos.length; i<len; i++) {
      var video = videos[i];
      if (video.id == parseInt(id)) {
        return video;
      }
    };
    return null;
  }

  function setupCarousel() {
    $(".jcarousel-item").live('click', function(e) {
      show($(this).attr('id'));
      e.preventDefault();
    });
  }

  $(document).ready(function() {
    carousel = $("#videos #carousel");
    album    = carousel.data("album");

    if (carousel.length) {
      load();
      setupCarousel();
    }
  });
}(this.jQuery));