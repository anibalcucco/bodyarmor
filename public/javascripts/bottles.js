(function($) {
  $(document).ready(function() {
    var bottle      = $("#empty_bottle");

    $('#bottles').find('area').each(function () {
      $(this).mouseover(function (e) {

        var name = $(this).attr('id');
        bottle.attr('class', "empty_bottle " + name);
        $("#text_" + name).show();

      }).mouseout(function (e) {

        var name = $(this).attr('id');
        bottle.attr('class', '');
        $("#text_" + name).hide();

      });
    });
  });
}(this.jQuery));