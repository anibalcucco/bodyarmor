(function($) {
  var infoWindow = new google.maps.InfoWindow();
  var map = null;
  var markers = [];
  var bounds = new google.maps.LatLngBounds();

  function near(address) {
    var url = "stores/near.json";
    if (address) {
      url = url + "?address=" + address;
    }
    $.getJSON(url, function(data) {
      var location = data.location;
      var stores   = data.stores;
      $('#result').html(stores.length + " stores found near <b>" + location.address + "</b>");
      $('#address').val(location.address);
      create();
      reset();
      addStores(stores);
      center(stores, location);
    });
  }

  function create() {
    var options = { mapTypeId: google.maps.MapTypeId.ROADMAP, zoom: 15 };
    if (!map) {
      map = new google.maps.Map(document.getElementById('map_canvas'), options);
    }
  }

  function addStores(stores) {
    $.each(stores, function(key, val) {
      var store = val.store;
      var title = store.name + "\n" + store.address;
      var latlng = new google.maps.LatLng(store.latitude, store.longitude);
      var marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        title: title
      });
      // optional code to show info window
      // showInfoWindow(marker, store);
      marker.setMap(map);
      bounds.extend(latlng);
      markers.push(marker);
    });
  }

  function center(stores, location) {
    switch(stores.length) {
      case 0:
        map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));
        break;
      case 1:
        var store = stores[0].store;
        map.setCenter(new google.maps.LatLng(store.latitude, store.longitude));
        break;
      default:
        map.fitBounds(bounds);
    }
  }

  function reset() {
    for (i in markers) {
      markers[i].setMap(null);
    }
    markers.length = 0;
    bounds = new google.maps.LatLngBounds();
  }

  function bindSearchForm() {
    $('#search_form').live('submit', function() {
      near($("#address").val());
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
        near(address);
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