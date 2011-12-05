(function($) {
  $(document).ready(function() {
    $('#bottles').find('area').each(function () {
      $(this).mouseover(function (e) {
        var name = $(this).attr('id');
        $("#bottles_background").attr("src", "/images/bottles/" + name + ".jpg");
      }).mouseout(function (e) {
        $("#bottles_background").attr("src", "/images/bottles/bottles.jpg");
      });
    });
  });
}(this.jQuery));