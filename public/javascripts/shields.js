(function($) {
  $(document).ready(function() {
    $('#shields').find('area').each(function () {
      $(this).mouseover(function (e) {
        var name = $(this).attr('id');
        $("#selected_shield").attr("src", "/images/shields/" + name + ".jpg");
        $("#selected_shield").show();

      }).mouseout(function (e) {

        $("#selected_shield").hide();

      });
    });
  });
}(this.jQuery));