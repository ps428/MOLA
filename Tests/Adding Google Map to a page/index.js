// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = { lat: 26.2195, lng: 72.94225 };
  var uluru2 = { lat: 26.2185, lng: 72.94225 };


  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru,
  });

  locations_jdh = [[{lat: 26.2195, lng: 72.94225}],
               [{lat: 26.2175, lng: 72.94225}], 
               [{lat: 26.2185, lng: 72.94235}],
               [{lat: 26.2178, lng: 72.94235}],
               [{lat: 26.2188, lng: 72.94246}],
               [{lat: 26.2185, lng: 72.94218}]]
  // The map, centered at Uluru
  for(i=0;i<6;i++)
  {
    var marker = new google.maps.Marker({
      position: locations_jdh[i][0],
      map: map,
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