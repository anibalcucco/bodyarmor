(function($) {
  $(document).ready(function() {
    var form = $("#newsletter_form");
    form.find("#Field5").attr("placeholder", "Your Name");
    form.find("#Field3").attr("placeholder", "Your Email");
    form.submit(function() {
      var button = $(this).find("input[type='submit']");
      var result = $('#wufoo_result');

      $.ajax({
        data: $(this).serialize(),
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        beforeSend: function(request) {
          button
            .attr('disabled', true)
            .val('Sending...');
        },
        complete: function() {
          button.hide();
          result.html("Thank you for signing up!");
        }
      });
      return false;
    });
  });
}(this.jQuery));