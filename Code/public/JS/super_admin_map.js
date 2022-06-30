//  Map functions
function initMap(user_id) {
  // The location of Uluru
  var infoWindow = new google.maps.InfoWindow({
    map: map,
    mapTypeId: 'satellite'

  });

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    // center: new google.maps.LatLng(26.2195, 72.94225),
  });

  var user_lat = 24.0;
  var user_lng = 79.0;

  var pos = {
    lng: user_lng,
    lat: user_lat,
  };

  infoWindow.setPosition(pos);
  infoWindow.setContent("Location found.");
  map.setCenter(pos);
  //   console.log(user_lat, user_lng)

  addOnMap(map);
  //   update_location(user_lat, user_lng)
}

function adminLogoutCache() {
  localStorage.setItem("adminLogout", 1);
}

function addOnMap(map) {
  ambulance_data = {
    // around user location
    title: "AIIMS PTV",
    // "lat": user_lat + Math.random() / 400,
    // "lng": user_lng - Math.random() / 100,
    driver_name: "Mr Che Gueverra",
    driver_contact: 9292929212,
    description: "Max ambulance..available.",
    status: "available",
    type: "ptv",
    icon: "icon_ptv",
  };

  ref = firebase.database().ref("ambulances").orderByKey();
  var ambulances = [];
  ref.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      // console.log(childData);
      ambulances.push(childData);
    });
  });


  setTimeout(() => {
    console.log(ambulances);
    add_ambulances(ambulances, map);
  }, 3000);
}

function add_ambulances(ambulances, map) {
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

  for (i = 1; i <= ambulances.length; i++) {
    marker_data = ambulances[i - 1];

    //here to show in boxes the unavailable ambulances
    if (marker_data.status != "available") continue;

    lat_long = new google.maps.LatLng(marker_data.lat, marker_data.lng);

    if (marker_data.icon == "icon_super_fast") icon = icon_super_fast;
    if (marker_data.icon == "icon_icu") icon = icon_icu;
    if (marker_data.icon == "icon_ptv") icon = icon_ptv;
    if (marker_data.icon == "icon_free") icon = icon_free;

    const marker = new google.maps.Marker({
      title: marker_data.title,
      position: lat_long,
      icon: icon,
      id: i,
      map: map,
    });

    // DON'T REMOVE THESE COMMENTS, THESE ARE FOR ADDING A ON CLICK FUNCTION, WILL ACTIVATE IT AFTER FIRST DEMO
    // Attach click event to the marker.
    (function (marker, marker_data) {
      google.maps.event.addListener(marker, "click", function (e) {
        infoWindow = new google.maps.InfoWindow({
          content: "",
        });

        infoPane = document.createElement("div");
        infoPane.id = "infoPane";

        title = document.createElement("h4");
        title.innerHTML = marker_data.title;

        description = document.createElement("h6");
        description.innerHTML = marker_data.description;

        driver = document.createElement("h7");
        driver.innerHTML =
          marker_data.driver_name + ": " + marker_data.driver_contact;
        driver.id = "driverDetails" + marker.id;

        newLine = document.createElement("br");

        infoPane.appendChild(title);
        infoPane.appendChild(description);
        infoPane.appendChild(driver);
        infoPane.appendChild(newLine);
        infoPane.appendChild(newLine);

        //Wrap the contentq inside an HTML DIV in order to set height and width of InfoWindow.
        infoWindow.setContent(infoPane);

        infoWindow.open(map, marker);
      });
    })(marker, marker_data);
  }
}

function logoutCache() {
  localStorage.setItem("Logout", 1);
}

