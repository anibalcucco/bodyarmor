(function($) {
  var infoWindow        = new google.maps.InfoWindow();
  var map               = null;
  var markers           = [];
  var bounds            = null;
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = null;
  var stores            = null;
  var location          = null;

  function create() {
    var options       = { mapTypeId: google.maps.MapTypeId.ROADMAP, zoom: 15 };
    map               = new google.maps.Map(document.getElementById('map_canvas'), options);
    directionsDisplay = new google.maps.DirectionsRenderer({ map: map, suppressMarkers: true });
    bounds            = new google.maps.LatLngBounds();
  }

  function addStores(stores) {
    $.each(stores, function(key, val) {
      var store = val.store;
      var title = store.name + "\n" + store.address;
      var letter = String.fromCharCode(65 + key);
      var latlng = new google.maps.LatLng(store.latitude, store.longitude);
      var marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        icon: "http://maps.google.com/mapfiles/marker" + letter + ".png",
        title: title
      });
      $("#store_template").tmpl(store).appendTo("#stores_list");
      // optional code to show info window
      // showInfoWindow(marker, store);
      marker.setMap(map);
      bounds.extend(latlng);
      markers.push(marker);
    });
  }

  function route(address) {
    var request = {
      origin: location.address,
      destination: address,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
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
    $("#stores_list").empty();
    map = null;
    if (directionsDisplay) {
      directionsDisplay.setMap(null);
    }
    directionsDisplay = null;
    bounds = null;
  }

  function bindSearchForm() {
    $("#search_form").live('submit', function() {
      reset();
      $("#search_button").attr('disabled', true).val("FINDING STORES...");

      var url = "/map/near.json?" + $("#address, #within").serialize();
      $.getJSON(url, function(data) {
        location = data.location;
        stores   = data.stores;
        create();
        addStores(stores);
        center(stores, location);
        $("#search_button").attr('disabled', false).val("FIND A STORE");
      });
      return false;
    });
  }

  function bindDirections() {
    $(".directions").live('click', function() {
      route($(this).data("address"));
      return false;
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
        $("#address").val(latlng);
        $('#search_form').submit();
      });
    }
  }

  $(document).ready(function() {
    bindSearchForm();
    bindDirections();

    $('#search_form').submit();
  });
}(this.jQuery));