(function($) {
  var infoWindow = new google.maps.InfoWindow();
  var map;
  var markers = [];

  function showStore(marker, id) {
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

  function createMap(latitude, longitude) {
    var options = { mapTypeId: google.maps.MapTypeId.ROADMAP, zoom: 8 };
    if (!map) {
      map = new google.maps.Map(document.getElementById('map_canvas'), options);
    }
    map.setCenter(new google.maps.LatLng(latitude, longitude));
  }

  function createMarkers(stores) {
    $.each(stores, function(key, val) {
      var store = val.store;
      var latlng = new google.maps.LatLng(store.latitude, store.longitude);
      var marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        title: store.name
      });
      google.maps.event.addListener(marker, 'closeclick', function () {
        infoWindow.setContent("");
      });
      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.close();
        showStore(marker, store.id);
      });
      marker.setMap(map);
      markers.push(marker);
    });
  }

  function removeOldMarkers() {
    for (i in markers) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }

  function showResults(stores, address) {
    $('#results').html("We found <b>" + stores.length + "</b> stores near <b>" + address + "</b>");
    $('#address').val(address);
  }

  function searchStores(params) {
    var url = 'stores/search.json';
    if (params) {
      url = url + '?' + params;
    }
    $('#results').html("Loading stores, please wait...");
    $.getJSON(url, function(data) {
      showResults(data.stores, data.address);
      createMap(data.latitude, data.longitude);
      removeOldMarkers();
      createMarkers(data.stores);
    });
  }

  function searchStoresFromPosition(position) {
    var latlng = escape(position.coords.latitude + "," + position.coords.longitude);
    searchStores("address=" + latlng);
  }

  function searchForm() {
    $('#search_form').submit(function() {
      searchStores($("#address, #within").serialize());
      return false;
    });
  }

  function searchLinks() {
    $('#stores_using_browser').click(function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(searchStoresFromPosition);
      } else {
        searchStores(null);
      }
      return false;
    });

    $('#stores_using_ip_address').click(function() {
      searchStores(null);
      return false;
    });
  }

  $(document).ready(function() {
    if (!$("#map_canvas").exists()) return;

    searchForm();
    searchLinks();
  });
}(this.jQuery));