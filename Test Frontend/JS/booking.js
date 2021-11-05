// Initialize and add the map

function bookingPage() {
  initMap();
}
function initMap() {
  // The location of Uluru
  var infoWindow = new google.maps.InfoWindow({
    map: map,
  });

  var map = new google.maps.Map(document.getElementById("liveMap"), {
    zoom: 15,
    // center: new google.maps.LatLng(26.2195, 72.94225),
  });

  var user_lat = 0.0;
  var user_lng = 0.0;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };
        user_lat = position.coords.latitude;
        user_lng = position.coords.longitude;

        // pos = new google.maps.LatLng(human.lat, human.lng)
        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        map.setCenter(pos);
        //   console.log(user_lat, user_lng)

        add_human_marker(user_lat, user_lng, map);
        //   update_location(user_lat, user_lng)
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
  }
}

async function add_human_marker(user_lat, user_lng, map) {
  // Human icon extraction
  var human_icon = {
    url: "../assets/human.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(40, 45), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };
  // console.log(user_lat, user_lng)
  // Human data, from curr loction or entered value
  var human = {
    title: "Your location",
    // "lng": position.coords.longitude,
    // "lat": position.coords.latitude,
    lat: user_lat,
    lng: user_lng,
    user_name: "Patient",
    description: "Max ambulance..available.",
    icon: human_icon,
  };

  marker_data = human;
  lat_long = new google.maps.LatLng(marker_data.lat, marker_data.lng);

  const marker = new google.maps.Marker({
    title: marker_data.title,
    position: lat_long,
    icon: marker_data.icon,
    map: map,
  });

  setAmbulance(map, user_lat, user_lng);
}

async function setAmbulance(map, user_lat, user_lng) {
  ambulanceID = localStorage.getItem("ambulanceID");
  let ambulanceData = [];

  ref = firebase.database().ref("ambulances/" + ambulanceID);
  ref.on("value", function (snapshot) {
    ambulanceData.push(snapshot.val());
  });

  firebase
    .database()
    .ref("ambulances/" + ambulanceID + "/status")
    .set("unavailable");

  setTimeout(() => {
    console.log(ambulanceData);
    add_ambulances(ambulanceData[0], user_lat, user_lng, map);
  }, 3000);
}

function add_ambulances(ambulanceData, user_lat, user_lng, map) {
  user_lat_lng = { lat: user_lat - 0.001, lng: user_lng + 0.001 };

  var icon_super_fast = {
    url: "../assets/ambulance_super_fast.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  var icon_icu = {
    url: "../assets/ambulance_icu.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  var icon_ptv = {
    url: "../assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  var icon_free = {
    url: "../assets/ambulance_free.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(35, 25), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  // The map, centered at Uluru

  // Adding human on map

  // Adding Ambulances on map

  marker_data = ambulanceData;

  user_lat_lng = { lat: user_lat - 0.001, lng: user_lng + 0.001 };
  ambulance_lat_lng = {
    lat: marker_data.lat - 0.001,
    lng: marker_data.lng + 0.001,
  };

  generate_path(map, user_lat_lng, ambulance_lat_lng);
  distance = haversine_distance(user_lat_lng, ambulance_lat_lng);

  ambulance_lat_long = new google.maps.LatLng(marker_data.lat, marker_data.lng);

  console.log(ambulance_lat_long, user_lat, user_lng);
  if (marker_data.icon == "icon_super_fast") icon = icon_super_fast;
  if (marker_data.icon == "icon_icu") icon = icon_icu;
  if (marker_data.icon == "icon_ptv") icon = icon_ptv;
  if (marker_data.icon == "icon_free") icon = icon_free;

  const marker = new google.maps.Marker({
    title: marker_data.title,
    position: ambulance_lat_long,
    icon: icon,
    map: map,
  });

  addBookingDetails(marker_data, distance, user_lat_lng, ambulance_lat_lng);
}

function addBookingDetails(
  marker_data,
  distance,
  user_lat_lng,
  ambulance_lat_lng
) {
  var bookingDetails = document.getElementById("bookingDetails");

  estimatedCost = parseInt(1000) + parseFloat((distance * 200).toFixed(2));
  ETAMinutes = parseInt(
    parseInt(5) + (parseFloat((distance * 10).toFixed(2)) % 60)
  );
  ETASeconds = parseInt(parseFloat((distance * 60).toFixed(2))) % 60;

  ambulanceTitle = marker_data.title;
  ambulanceType = marker_data.type;
  driverName = marker_data.driver_name;
  driverContact = marker_data.driver_contact;
  ambulanceDescription = marker_data.description;

  var title = document.createElement("h5");
  title.innerHTML = "TITLE: " + ambulanceTitle;

  innerHTML = "Type: " + ambulanceType;

  innerHTML += "<br>Description: " + ambulanceDescription;

  innerHTML += "<br>Driver: " + driverName;

  innerHTML += "<br>Contact: " + driverContact;

  innerHTML += "<br>Estimated Cost: <b>" + estimatedCost;

  innerHTML +=
    "</b><br>Estimated Time of Arrival (ETA):<b> " +
    ETAMinutes +
    " Minutes " +
    ETASeconds +
    " Seconds</b>";

  innerHTML += "<br>Distance: " + distance.toFixed(2) + " KM";

  p = document.createElement("p");
  p.innerHTML = innerHTML;

  bookingDetails.appendChild(title);
  bookingDetails.appendChild(p);

  userID = localStorage.getItem("userID");
  ambulanceID = localStorage.getItem("ambulanceID");

  bookingDetails = {
    userID: userID,
    ambulanceID: ambulanceID,
    cost: estimatedCost,
    distance: distance.toFixed(2),
    ETA: ETAMinutes + " Minutes " + ETASeconds + " Seconds",
    userLocation: user_lat_lng,
    ambulanceLocation: ambulance_lat_lng,
  };

  bookingDB = firebase.database().ref("bookings/" + userID + "/" + ambulanceID);
  bookingDB.set(bookingDetails);

  setTimeout(
    alert(
      "Your Booking is confirmed. Your ride will arrive in " +
        ETAMinutes +
        " minutes and " +
        ETASeconds +
        " seconds."
    ),
    2000
  );
}

function generate_path(map, myLatLng1, myLatLng2) {
  var pathBetween = new google.maps.Polyline({
    path: [myLatLng1, myLatLng2],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  // addLine(pathBetween, map);
  // setTimeout(
  //   ()=>removeLine(pathBetween, map), 5000
  // )
  return pathBetween;
}

function addLine(pathBetween, map) {
  pathBetween.setMap(map);
}

function haversine_distance(mk1, mk2) {
  var R = 6371.071; // Radius of the Earth in km
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}
