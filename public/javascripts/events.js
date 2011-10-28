(function($) {

  $(document).ready(function() {
    $("#events select").change(function() {
      var id = $(this).find("option:selected").first().val();

      var event = { id: id,
                    description: $("#" + id).find(".description").html(),
                    url: $("#" + id).find(".url").html(),
                    items: $("#" + id).find(".item") };

      var element = $("#events #current_event").html($("#event_template").tmpl(event));

      $(element).find('ul').jcarousel({ scroll: 1 });
    }).trigger('change');
  });

}(this.jQuery));