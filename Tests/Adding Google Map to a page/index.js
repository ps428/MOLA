// Initialize and add the map
function initMap() {
  // The location of Uluru
  var infoWindow = new google.maps.InfoWindow({map: map});

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    // center: new google.maps.LatLng(26.2195, 72.94225),
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });

} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}

  // const iconBase =
  // "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  const icons = {
    ambulance_ptv: {
      icon: iconBase + "ambulance_ptv.png",
    },
    ambulance_icu: {
      icon: iconBase + "ambulance_icu.png",
    },
    ambulance_super_fast: {
      icon: iconBase + "ambulance_super_fast.jpeg",
    }
    };


  locations_jdh = [[{lat: 26.2195, lng: 72.94225}],
               [{lat: 26.2175, lng: 72.94225}], 
               [{lat: 26.2185, lng: 72.94235}],
               [{lat: 26.2178, lng: 72.94235}],
               [{lat: 26.2188, lng: 72.94246}],
               [{lat: 26.2185, lng: 72.94218}]]
  // The map, centered at Uluru

  var features = []

  for(i=0;i<2;i++)
  {
    lat_long = locations_jdh[i][0]
    // console.log(Object.values(lat_long))
    new_item = {
      position: new google.maps.LatLng(lat_long),
      type: "ambulance_super_fast",
    }
    features.push(new_item)
  
    lat_long = locations_jdh[i+1][0]
    new_item = {
      position: new google.maps.LatLng(lat_long),
      type: "ambulance_icu",
    }
    features.push(new_item)
  
    lat_long = locations_jdh[i+2][0]
    new_item = {
      position: new google.maps.LatLng(lat_long),
      type: "ambulance_ptv",
    }
    features.push(new_item)
  }


  for(i=0;i<6;i++)
  {
    const marker = new google.maps.Marker({
      position: features[i].position,
      // icon: icons.ambulance_super_fast.icon,
      map:map
    })
  }
  // The marker, positioned at Uluru
  
}

// var locations = [
//   ['Bondi Beach', -33.890542, 151.274856, 4],
//   ['Coogee Beach', -33.923036, 151.259052, 5],
//   ['Cronulla Beach', -34.028249, 151.157507, 3]      ['Cronulla Beach', -34.028249, 151.157507, 3],
//   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//   ['Maroubra Beach', -33.950198, 151.259302, 1]
// ];

// var map = new google.maps.Map(document.getElementById('map'), {
//   zoom: 10,
//   center: new google.maps.LatLng(-33.92, 151.25),
//   mapTypeId: google.maps.MapTypeId.ROADMAP
// });

// var infowindow = new google.maps.InfoWindow();

// var marker, i;

// for (i = 0; i < locations.length; i++) {  
//   marker = new google.maps.Marker({
//     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//     map: map
//   });

//   google.maps.event.addListener(marker, 'click', (function(marker, i) {
//     return function() {
//       infowindow.setContent(locations[i][0]);
//       infowindow.open(map, marker);
//     }
//   })(marker, i));
// }