(function($) {
  var videos   = [];
  var carousel = null;
  var album    = null;
  var current  = null;
  var item     = null;

  function load() {
    var url = "http://vimeo.com/api/v2/album/" + album + "/videos.json?callback=?";
    $.getJSON(url, {}, function(data) {
      videos = data;
      $.each(videos, function(key, video) {
        carousel.append(li(video));
      });
      if (videos.length > 0) {
        carousel.jcarousel({ scroll: 1 });
        show(videos[0].id);
      } else {
        carousel.html("No videos in album");
      }
    });
  }

  function li(video) {
    return '<li id="' + video.id + '"><img src="' + video.thumbnail_small + '"></li>';
  }

  function show(id) {
    current.html($("#video_template").tmpl(get(id)));
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
    item.live('click', function(e) {
      show($(this).attr('id'));
      e.preventDefault();
    });
  }

  $(document).ready(function() {
    carousel = $("#videos #carousel");
    current  = $("#videos #current_video");
    album    = carousel.data("album");
    item     = $("#videos .jcarousel-item");

    if (carousel.length) {
      load();
      setupCarousel();
    }
  });
}(this.jQuery));