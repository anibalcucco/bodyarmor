(function($) {
  var videos   = [];
  var carousel = null;
  var album    = null;
  var user     = null;
  var current  = null;
  var item     = null;

  function vimeo() {
    var url = "http://vimeo.com/api/v2/album/" + album + "/videos.json?callback=?";
    var videoURL = "http://player.vimeo.com/video/";
    $.getJSON(url, {}, function(data) {
      videos = data;
      $.each(videos, function(key, video) {
        video.url = videoURL + video.id;
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

  function youtube() {
    var userURL = "https://gdata.youtube.com/feeds/api/users/" + user + "/uploads?v=2&alt=json&callback=?";
    var videoURL= "https://www.youtube.com/embed/";
    $.getJSON(userURL, function(data) {
      $.each(data.feed.entry, function(i, item) {
        var title = item.title.$t;
        var description = item.media$group.media$description.$t;
        var feedURL = item.link[1].href;
        var fragments = feedURL.split("/");
        var id = fragments[fragments.length - 2];
        var url = videoURL + id;
        var thumb = "https://img.youtube.com/vi/" + id + "/default.jpg";
        var video = {id: id, title: title, description: description, url: url, thumbnail_small: thumb};
        videos.push(video);
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
      if (video.id == id) {
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
    user     = carousel.data("user");
    item     = $("#videos .jcarousel-item");

    if (carousel.length) {
      youtube();
      setupCarousel();
    }
  });
}(this.jQuery));