// Initialize and add the map
function initMap() {
  // The location of Uluru
  var infoWindow = new google.maps.InfoWindow({
      map: map
  });

  var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      // center: new google.maps.LatLng(26.2195, 72.94225),
  });

  var user_lat = 0.0
  var user_lng = 0.0

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
              "lng": position.coords.longitude,
              "lat": position.coords.latitude,
          };
          user_lat = position.coords.latitude
          user_lng = position.coords.longitude

          // pos = new google.maps.LatLng(human.lat, human.lng)
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
          console.log(user_lat, user_lng)

          add_human_marker(user_lat, user_lng, map)

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


}

function add_human_marker(user_lat, user_lng, map) {
  // var map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 16,
  //   // center: new google.maps.LatLng(26.2195, 72.94225),
  // });

  // Human icon extraction
  var human_icon = {
      url: "assets/human.png", // url
      // url: "assets/ambulance_ptv.png", // url
      // url: "assets/ambulance_icu.png", // url
      scaledSize: new google.maps.Size(15, 25), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };
  // console.log(user_lat, user_lng)
  // Human data, from curr loction or entered value
  var human = {
      "title": 'Your location',
      // "lng": position.coords.longitude,
      // "lat": position.coords.latitude,
      "lat": user_lat,
      "lng": user_lng,
      "user_name": "Patient",
      "description": 'Max ambulance..available.',
      "icon": human_icon
  }

  marker_data = human
  lat_long = new google.maps.LatLng(marker_data.lat, marker_data.lng)

  const marker = new google.maps.Marker({
      title: marker_data.title,
      position: lat_long,
      icon: marker_data.icon,
      map: map
  })

  add_abmulances(user_lat, user_lng, map);
}

function add_abmulances(user_lat, user_lng, map) {

  var icon_super_fast = {
      url: "assets/ambulance_super_fast.jpeg", // url
      // url: "assets/ambulance_ptv.png", // url
      // url: "assets/ambulance_icu.png", // url
      scaledSize: new google.maps.Size(30, 20), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };

  var icon_icu = {
      url: "assets/ambulance_icu.png", // url
      // url: "assets/ambulance_ptv.png", // url
      // url: "assets/ambulance_icu.png", // url
      scaledSize: new google.maps.Size(30, 20), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };

  var icon_ptv = {
      url: "assets/ambulance_ptv.png", // url
      // url: "assets/ambulance_ptv.png", // url
      // url: "assets/ambulance_icu.png", // url
      scaledSize: new google.maps.Size(30, 20), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };

  // The map, centered at Uluru


  // # From firebase, get available ambulance function
  var ambulances = [{
          // around user location
          "title": 'Appolo PTV',
          "lat": user_lat + 0.0002,
          "lng": user_lng + 0.0006,
          "driver_name": "Mr Che Gueverra",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "ptv",
          "icon": icon_ptv
      },
      {
          // around user location
          "title": 'MAX ICU',
          "lat": user_lat + 0.0006,
          "lng": user_lng + 0.0002,
          "driver_name": "Mr Che Gueverra",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          // around user location
          "title": 'MAX Super Fast',
          "lat": user_lat + 0.0017,
          "lng": user_lng + 0.001,
          "driver_name": "Mr Che Gueverra",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "super_fast",
          "icon": icon_super_fast
      },
      {
          // around user location
          "title": 'MAX ICU',
          "lat": user_lat + 0.0009,
          "lng": user_lng + 0.002,
          "driver_name": "Mr Che Gueverra",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          // around user location
          "title": 'AIIMS PTV',
          "lat": user_lat + 0.002,
          "lng": user_lng + 0.001,
          "driver_name": "Mr Che Gueverra",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "ptv",
          "icon": icon_ptv
      },
      {
          // jodhpur
          "title": 'MAX',
          "lat": '26.2178',
          "lng": '72.94246',
          "driver_name": "Mr Che Gueverra",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'AIIMS',
          "lat": '26.2158',
          "lng": '72.94246',
          "driver_name": "Mr. Nikita Khuruschev",
          "driver_contact": 8292929212,
          "description": 'AIIMS ambulance..available.',
          "status": 'available',
          "type": "ptv",
          "icon": icon_ptv
      },
      {
          "title": 'Appolo',
          "lat": '26.2178',
          "lng": '72.94546',
          "driver_name": "Mrs Angela Merkel",
          "driver_contact": 7292929212,
          "description": 'Apolo ambulance..available.',
          "status": 'available',
          "type": "super_fast",
          "icon": icon_super_fast
      },
      {
          "title": 'AIIMS',
          "lat": '26.215',
          "lng": '72.94446',
          "driver_name": "Mr Vladimir Putin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'AIIMS',
          "lat": '26.218',
          "lng": '72.94466',
          "driver_name": "Mr Fidel Castro",
          "driver_contact": 9292929212,
          "description": 'AIIMS ambulance..available.',
          "status": 'available',
          "type": "ptv",
          "icon": icon_ptv
      },
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      // Delhi
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      // Dhampur
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      // Noida
      {
          "title": 'Appolo',
          "lat": '28.6692',
          "lng": '77.3938',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
      {
          "title": 'Appolo',
          "lat": '26.215',
          "lng": '72.94586',
          "driver_name": "Mr Lenin",
          "driver_contact": 9292929212,
          "description": 'Max ambulance..available.',
          "status": 'available',
          "type": "icu",
          "icon": icon_icu
      },
  ];

  // Adding human on map

  // Adding Ambulances on map
  for (i = 0; i < ambulances.length; i++) {
      marker_data = ambulances[i]
      lat_long = new google.maps.LatLng(marker_data.lat, marker_data.lng)

      const marker = new google.maps.Marker({
          title: marker_data.title,
          position: lat_long,
          icon: marker_data.icon,
          map: map
      })

      // DON'T REMOVE THESE COMMENTS, THESE ARE FOR ADDING A ON CLICK FUNCTION, WILL ACTIVATE IT AFTER FIRST DEMO
      // Attach click event to the marker.
      //   (function (marker, marker_data) {
      //     google.maps.event.addListener(marker, "click", function (e) {
      //         //Wrap the contentq inside an HTML DIV in order to set height and width of InfoWindow.
      //         infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + marker_data.description + "</div>");
      //         infoWindow.open(map, marker);
      //     });
      // })(marker, marker_data);

  }
  // console.log(features[i].position)


  // The marker, positioned at Uluru

}

window.onload = function() {
  // coordinates = initMap();
  // console.log(coordinates)
  //  add_human_marker(coordinates[0], coordinates[1]);
}