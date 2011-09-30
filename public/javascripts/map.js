(function($) {
  var infoWindow = new google.maps.InfoWindow();
  var map = null;
  var marker = null;

  function findNearest(address) {
    var url = "stores/nearest.json";
    if (address) {
      url = url + "?address=" + address;
    }
    $.getJSON(url, function(data) {
      var location = data.location;
      if (data.stores) {
        var store = data.stores.store;
        $('#result').html(store.address);
        $('#address').val(location);
        createMap(store.latitude, store.longitude);
        createMarker(store);
      } else {
        $('#result').html("No stores found near: " + location);
      }
    });
  }

  function createMap(latitude, longitude) {
    var options = { mapTypeId: google.maps.MapTypeId.ROADMAP, zoom: 15 };
    if (!map) {
      map = new google.maps.Map(document.getElementById('map_canvas'), options);
    }
    map.setCenter(new google.maps.LatLng(latitude, longitude));
  }

  function createMarker(store) {
    if (marker) {
      marker.setMap(null);
      marker = null;
    }

    var latlng = new google.maps.LatLng(store.latitude, store.longitude);
    marker = new google.maps.Marker({
      position: latlng,
      animation: google.maps.Animation.DROP,
      title: store.name
    });
    // optional code to show info window
    // showInfoWindow(marker, store);
    marker.setMap(map);
  }

  function bindSearchForm() {
    $('#search_form').live('submit', function() {
      findNearest($("#address").val());
      return false;
    });
  }

  function openLightbox(address) {
    $.colorbox({
      href: '/map',
      scrolling:false,
      width:"645px",
      height:"470px",
      onComplete: function() {
        findNearest(address);
      }
    });
  }

  function showInfo(marker, id) {
    $.ajax({
      url: 'stores/' + id + '/preview',
      success: function(response) {
        infoWindow.setContent(response);
        infoWindow.open(map, marker);
      },
      error: function(request, textStatus, errorThrown) {
        alert("There was an error showing Store info");
      }
    });
  }

  function showInfoWindow(marker, store) {
    google.maps.event.addListener(marker, 'closeclick', function () {
      infoWindow.setContent("");
    });
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.close();
      showStore(marker, store.id);
    });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latlng = escape(position.coords.latitude + "," + position.coords.longitude);
        openLightbox(latlng);
      });
    } else {
      openLightbox(null);
    }
  }

  $(document).ready(function() {
    bindSearchForm();

    $("#store_locator").click(function() {
      openLightbox(null);
    });

    $(document).bind('cbox_closed', function() {
      map = null;
    });
  });
}(this.jQuery));