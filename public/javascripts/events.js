(function($) {
  var carousel    = null;
  var carouselObj = null;

  function callback(c, state) {
    carouselObj = c;
  }

  function bindEventsList() {
    $("#events select").change(function() {
      carouselObj.reset();
      var selected = $(this).find("option:selected").first().val();
      var items = $("#" + selected).find(".item");
      var description = $("#" + selected).find(".description").html();
      var url = $("#" + selected).find(".url").html();

      $("#event_description").html(description);

      $.each(items, function(key, item) {
        var html = '<a href="' + url + '" target="_blank">' + $(item).html() + '</a>';
        carouselObj.add(key, html);
      });
      carouselObj.size(items.length);

    }).trigger('change');
  }

  $(document).ready(function() {
    carousel = $("#events #carousel");
    if (carousel.length) {
      carousel.jcarousel( {
        scroll: 1,
        initCallback: callback
      });
      bindEventsList();
    }
  });
}(this.jQuery));