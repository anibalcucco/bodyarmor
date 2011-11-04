(function($) {

  $(document).ready(function() {
    $("#events_carousel").jcarousel({ scroll: 1 });
    $("#events select").change(function() {
      var id = $(this).find("option:selected").first().val();
      var event = $("#" + id);
      event.show();
      $(".event").not(event).hide();
    }).trigger('change');
  });

}(this.jQuery));