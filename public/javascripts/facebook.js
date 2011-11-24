(function($) {
  var element = null;
  var appId   = null;

  function fitInFacebookApp() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: appId,
        status: true,
        cookie: true,
        xfbml: true
      });
      //this resizes the the i-frame
      //on an interval of 100ms
      FB.Canvas.setAutoResize(100);
    };
    (function() {
      var e = document.createElement('script');
      e.async = true;
      e.src = document.location.protocol +
       '//connect.facebook.net/en_US/all.js';
      element.append(e);
    }());
  }

  function hideOverflow() {
    $("html,body").css("overflow", "hidden");
  }

  $(document).ready(function() {
    element = $("#fb-root");
    appId   = element.data("app");
    if (appId) {
      hideOverflow();
      fitInFacebookApp();
    }
  });
}(this.jQuery));