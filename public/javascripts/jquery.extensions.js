(function($) {
  $.fn.extend({
    // ## `jQuery.fn.exists`
    // Returns `true` iff at least one element matching the selector
    // is on the page.
    exists: function() {
      return this.length > 0;
    }
  });
}(this.jQuery));