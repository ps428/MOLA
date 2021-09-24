// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function formSubmit() {
  //console.log("hello");
  // Get Values from the DOM

  var password = document.querySelector("#password").value;
  var username = document.querySelector("#username").value;
  //window.alert("message: " + password + " " + username);

  //send message values
  // here username corresponds to email id of the user
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      window.location.href = "../Test Frontend/page3_map_user_view.html";
      // Map passing user credentials
      const user = firebase.auth().currentUser;
      initMap(user);
    })
    .catch((error) => {
      var errorMessage = error.message;
      if (errorMessage != "google is not defined")
        window.alert("Not able to log in. Check the Credentials!");
      //window.alert(errorMessage);
    });
}

function registerUser() {
  let Fname = document.querySelector("#FName").value;
  let Lname = document.querySelector("#LName").value;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let cPassword = document.querySelector("#confirmPassword").value;
  let mobileNumber = document.querySelector("#mobileNumber").value;
  let mail = document.querySelector("#mail").value;
  let name = Fname + " " + Lname;

  if (
    validateField(name) == false ||
    validateField(username) == false ||
    validateField(password) == false ||
    validateField(cPassword) == false ||
    validateField(mobileNumber) == false ||
    validateField(mail) == false
  ) {
    window.alert("Ensure all fields are filled.");
    return;
  }

  if (validatePhone(mobileNumber) == false) {
    window.alert("Ensure Phone Number consists of 10 digits.");
    return;
  }

  if (validateEmail(mail) == false) {
    window.alert("Enter correct email.");
    return;
  }

  if (validatePassword(password) == false) {
    window.alert(
      "Password should be atleast of 6 characters including a lower-case, an upper-case and a special symbol."
    );
    return;
  }

  if (password != cPassword) {
    window.alert("Passwords do not match.");
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(mail, password)
    .then((userCredential) => {
      // Signed in
      const user = firebase.auth().currentUser;
      var user_data = {
        name: name,
        username: username,
        mobileNumber: mobileNumber,
        mail: mail,
      };

      firebase
        .database()
        .ref("user/" + user.uid)
        .set(user_data, function (error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            window.location.href = "../Test Frontend/page1.html";
            alert("Data saved successfully.");
          }
        });

      window.alert("User Created");
    })
    .catch((error) => {
      var errorMessage = error.message;
      window.alert(errorMessage);
      // ..
    });
}

function validateEmail(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(password) {
  //min 6 letter password, with at least a symbol, upper and lower case letters and a number
  expression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  if (expression.test(password) == false) {
    return false;
  } else {
    return true;
  }
}

function validateField(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

function validatePhone(mobileNumber) {
  if (mobileNumber.length == 10) {
    return true;
  } else {
    return false;
  }
}

//  Map functions
function initMap(user_id) {
  console.log(user_id);
  // The location of Uluru
  var infoWindow = new google.maps.InfoWindow({
    map: map,
  });

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
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
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
}

function add_human_marker(user_lat, user_lng, map) {
  // Human icon extraction
  var human_icon = {
    url: "assets/human.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(30, 40), // scaled size
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

  add_abmulances(user_lat, user_lng, map);
}

function add_abmulances(user_lat, user_lng, map) {
  var icon_super_fast = {
    url: "assets/ambulance_super_fast.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  var icon_icu = {
    url: "assets/ambulance_icu.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  var icon_ptv = {
    url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  // The map, centered at Uluru

  // # From firebase, get available ambulance function
  var ambulances = [
    {
      // around user location
      title: "Appolo PTV",
      lat: user_lat + Math.random() / 500,
      lng: user_lng + Math.random() / 500,
      driver_name: "Mr Che Gueverra",
      driver_contact: 9292929212,
      description: "Max ambulance..available.",
      status: "available",
      type: "ptv",
      icon: icon_ptv,
    },
    {
      // around user location
      title: "MAX ICU",
      lat: user_lat + Math.random() / 1000,
      lng: user_lng + Math.random() / 300,
      driver_name: "Mr Che Gueverra",
      driver_contact: 9292929212,
      description: "Max ambulance..available.",
      status: "available",
      type: "icu",
      icon: icon_icu,
    },
    {
      // around user location
      title: "MAX Super Fast",
      lat: user_lat - Math.random() / 500,
      lng: user_lng - Math.random() / 1000,
      driver_name: "Mr Che Gueverra",
      driver_contact: 9292929212,
      description: "Max ambulance..available.",
      status: "available",
      type: "super_fast",
      icon: icon_super_fast,
    },
    {
      // around user location
      title: "Appolo Super Fast",
      lat: user_lat - Math.random() / 500,
      lng: user_lng - Math.random() / 500,
      driver_name: "Mr Che Gueverra",
      driver_contact: 9292929212,
      description: "Max ambulance..available.",
      status: "available",
      type: "super_fast",
      icon: icon_super_fast,
    },
    {
      // around user location
      title: "MAX ICU",
      lat: user_lat - Math.random() / 700,
      lng: user_lng + Math.random() / 1000,
      driver_name: "Mr Che Gueverra",
      driver_contact: 9292929212,
      description: "Max ambulance..available.",
      status: "available",
      type: "icu",
      icon: icon_icu,
    },
    {
      // around user location
      title: "AIIMS PTV",
      lat: user_lat + Math.random() / 400,
      lng: user_lng - Math.random() / 1000,
      driver_name: "Mr Che Gueverra",
      driver_contact: 9292929212,
      description: "Max ambulance..available.",
      status: "available",
      type: "ptv",
      icon: icon_ptv,
    },
  ];

  // Adding human on map

  // Adding Ambulances on map
  for (i = 0; i < ambulances.length; i++) {
    marker_data = ambulances[i];
    lat_long = new google.maps.LatLng(marker_data.lat, marker_data.lng);

    const marker = new google.maps.Marker({
      title: marker_data.title,
      position: lat_long,
      icon: marker_data.icon,
      map: map,
    });

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
