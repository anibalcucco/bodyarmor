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

      $("#event_description").html(description);

      $.each(items, function(key, item) {
        carouselObj.add(key, $(item).html());
      });
      carouselObj.size(items.length);

    }).trigger('change');
  }

  $(document).ready(function() {
    carousel = $("#events #carousel");
    if (carousel.length) {
      carousel.jcarousel( {
        size: 4,
        scroll: 1,
        initCallback: callback
      });
      bindEventsList();
    }
  });
}(this.jQuery));