// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function formSubmit() {
  //console.log("hello");
  // Get Values from the DOM
  localStorage.removeItem("ambulanceID");
  var password = document.querySelector("#password").value;
  var username = document.querySelector("#username").value;
  //window.alert("message: " + password + " " + username);

  //send message values
  // here username corresponds to email id of the user
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      //
      // Map passing user credentials

      const user = firebase.auth().currentUser;
      if (user.emailVerified == false) {
        window.alert("Kindly confirm your e-mail.");
      } else {
        localStorage.removeItem("ambulanceID");
        var checkbox = document.getElementById("rememberMe");
        localStorage.removeItem("currentUserEmail");
        localStorage.removeItem("currentUserPassword");
        console.log(checkbox.checked);
        if (checkbox.checked == true) {
          addRememberDataCache(username, password);
        }
        localStorage.removeItem("Logout");
        window.location.href = "../Test Frontend/page3_map_user_view.html";

        addCacheUserData(user.uid);
        initMap(user);
      }
    })
    .catch((error) => {
      var errorMessage = error.message;
      if (errorMessage != "google is not defined")
        window.alert("Not able to log in. Check the Credentials!");
      //window.alert(errorMessage);
    });
}

function getUserData() {
  const user = localStorage.getItem("currentUserEmail");
  var checkbox = document.getElementById("rememberMe");
  if (user != null) {
    var usernameField = document.getElementById("username");
    var passwordField = document.getElementById("password");

    usernameField.value = user;
    passwordField.value = localStorage.getItem("currentUserPassword");

    checkbox.checked = true;
  }
}

function addRememberDataCache(email, password) {
  localStorage.setItem("currentUserEmail", email);
  localStorage.setItem("currentUserPassword", password);
}

function hospitalAddRememberDataCache(email, password) {
  localStorage.setItem("currentHospitalEmail", email);
  localStorage.setItem("currentHospitalPassword", password);
}


function registerUser() {
  localStorage.removeItem("ambulanceID");
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

      console.log(user.displayName);

      user
        .sendEmailVerification()
        .then(function () {
          window.alert("Verification has been sent to your email!");
        })
        .catch(function (error) {
          console.log(error);
          window.alert("Some error!");
        });

      var user_data = {
        name: name,
        username: username,
        mobileNumber: mobileNumber,
        mail: mail,
      };

      user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          // Update successful
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });

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

function logoutCache() {
  localStorage.setItem("Logout", 1);
}

function hformSubmit() {
  //console.log("hello");
  // Get Values from the DOM
  var password = document.querySelector("#hpassword").value;
  var username = document.querySelector("#husername").value;
  // window.alert("message: " + password + " " + username);

  //send message values
  // here username corresponds to email id of the user
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      //
      // Map passing user credentials

      const user = firebase.auth().currentUser;
      if (user.emailVerified == false) {
        window.alert("Kindly confirm your e-mail.");
      } else {
        var checkbox = document.getElementById("rememberMe");
        // localStorage.removeItem("currentHospitalEmail");
        // localStorage.removeItem("currentHospitalPassword");
        console.log(checkbox.checked);
        if (checkbox.checked == true) {
          hospitalAddRememberDataCache(username, password);
        }
        window.location.href = "../Test Frontend/Hospital_map_view.html";

        addCacheHospitalData(user.uid);
      }
    })
    .catch((error) => {
      var errorMessage = error.message;
      if (errorMessage != "google is not defined")
        window.alert("Not able to log in. Check the Credentials!");
      console.log(error)
      //window.alert(errorMessage);
    });
}

function getHospitalData() {
  const user = localStorage.getItem("currentHospitalEmail");
  var checkbox = document.getElementById("rememberMe");
  if (user != null) {
    var usernameField = document.getElementById("husername");
    var passwordField = document.getElementById("hpassword");

    usernameField.value = user;
    passwordField.value = localStorage.getItem("currentHospitalPassword");

    checkbox.checked = true;
  }
}

function registerHospital() {
  let Fname = document.querySelector("#hFName").value;
  let Lname = document.querySelector("#hLName").value;
  let username = document.querySelector("#husername").value;
  let password = document.querySelector("#hpassword").value;
  let cPassword = document.querySelector("#hconfirmPassword").value;
  let mobileNumber = document.querySelector("#hmobileNumber").value;
  let mail = document.querySelector("#hmail").value;

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

      user
        .sendEmailVerification()
        .then(function () {
          window.alert("Verification has been sent to your email!");
        })
        .catch(function (error) {
          console.log(error);
          window.alert("Some error!");
        });

      var user_data = {
        name: name,
        username: username,
        mobileNumber: mobileNumber,
        mail: mail,
      };

      firebase
        .database()
        .ref("Hospital/" + user.uid)
        .set(user_data, function (error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            window.location.href = "../Test Frontend/Hospital_login.html";
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
  // The location of Uluru
  var infoWindow = new google.maps.InfoWindow({
    map: map,
  });

  var map = new google.maps.Map(document.getElementById("map"), {
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

        // var pos_tmp_for_path = {
        //   lng: position.coords.longitude+0.002,
        //   lat: position.coords.latitude+0.07,
        // };
        // just to test path lines
        // myLatLng1 = pos
        // myLatLng2 = pos_tmp_for_path
        // generate_path(map, myLatLng1, myLatLng2)

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

async function add_human_marker(user_lat, user_lng, map) {
  // Human icon extraction
  var human_icon = {
    url: "assets/human.png", // url
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

  get_ambulance_data(user_lat, user_lng, map);
}

async function get_ambulance_data(user_lat, user_lng, map) {
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
    add_ambulances(ambulances, user_lat, user_lng, map);

    myLatLng1 = { lat: user_lat - 0.001, lng: user_lng + 0.001 };
    myLatLng2 = {
      lat: ambulances[1].lat - 0.001,
      lng: ambulances[1].lng + 0.001,
    };
    // generate_path(map, myLatLng1, myLatLng2)
  }, 3000);
}

function add_ambulances(ambulances, user_lat, user_lng, map) {
  user_lat_lng = { lat: user_lat - 0.001, lng: user_lng + 0.001 };

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

  var icon_free = {
    url: "assets/ambulance_free.png", // url
    // url: "assets/ambulance_ptv.png", // url
    // url: "assets/ambulance_icu.png", // url
    scaledSize: new google.maps.Size(35, 25), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  // The map, centered at Uluru

  // Adding human on map

  // Adding Ambulances on map

  console.log(ambulances, "-----");
  let pathBetween = null;

  for (i = 1; i <= ambulances.length; i++) {
    marker_data = ambulances[i - 1];

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
          marker_data.driver_name + ": " + marker_data.driver_contact + "<br>Ambulance ID: " + marker.id;
        driver.id = "driverDetails" + marker.id;

        newLine = document.createElement("br");

        checkButton = document.createElement("button");
        // checkButton.type = 'button';

        checkButton.onclick = () => {
          bookNowWindow(marker_data, user_lat_lng, map, marker.id);

          lat = marker_data.lat;
          lng = marker_data.lng;
          ambulance_lat_lng = { lat: lat - 0.001, lng: lng + 0.001 };

          if (pathBetween != null) removeLine(pathBetween, map);
          console.log(pathBetween);

          pathBetween = generate_path(map, user_lat_lng, ambulance_lat_lng);
        };
        checkButton.innerHTML = "Check Distance";
        checkButton.id = "bookNowWindow" + marker.id;
        checkButton.className = "btn float-right login_btn";

        infoPane.appendChild(title);
        infoPane.appendChild(description);
        infoPane.appendChild(driver);
        infoPane.appendChild(newLine);
        infoPane.appendChild(newLine);
        infoPane.appendChild(checkButton);

        //Wrap the contentq inside an HTML DIV in order to set height and width of InfoWindow.
        infoWindow.setContent(infoPane);

        infoWindow.open(map, marker);
      });
    })(marker, marker_data);
  }

  // generate_results_table(ambulances)

  // console.log(features[i].position)

  // The marker, positioned at Uluru
}

function generate_your_rides() {
  ride_data = {
    // around user location
    ETA: "209 Minutes 29 Seconds",
    ambulanceID: "18",
    ambulanceLocation: {
      lat: 28.4690865,
      lng: 77.50523840000001,
    },
    cost: 5098.6,
    distance: "20.49",
    userID: "6LYJ6kfz29YMMHRXgabiuoR2jwB3",
    userLocation: {
      lat: 28.4690865,
      lng: 77.50523840000001,
    },
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      const rides = [ride_data];
      var ambulancesBooked = firebase.database().ref("bookings/" + uid);

      ambulancesBooked.on("value", (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          rides.push(childData);
        });

        console.log(rides);
        console.log(rides.length);

        for (let i = 1; i < rides.length; i++) {
          // show rides 
        }
      });
    }
  });
}

function generate_results_table(ambulances) {
  var ambulanceListData = document.getElementById("ambulanceList");

  var table = document.createElement("table");
  var tr = document.createElement("tr");
  var td0 = document.createElement("th");
  var td1 = document.createElement("th");
  var td2 = document.createElement("th");
  var td3 = document.createElement("th");

  var text0 = document.createTextNode("*");
  var text1 = document.createTextNode("Title");
  var text2 = document.createTextNode("Type");
  var text3 = document.createTextNode("Driver Contact");

  td0.appendChild(text0);
  td1.appendChild(text1);
  td2.appendChild(text2);
  td3.appendChild(text3);

  tr.appendChild(td0);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  table.appendChild(tr);

  // addCacheAmbulanceID(ambulances[0])

  for (i = 0; i < ambulances.length; i++) {
    ambulanceData = ambulances[i];
    if (ambulanceData.status != "available") continue;

    var tr = document.createElement("tr");
    var td0 = document.createElement("input");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    td0.setAttribute("type", "checkbox");

    var text1 = document.createTextNode(ambulanceData.title);
    var text2 = document.createTextNode(ambulanceData.type);
    var text3 = document.createTextNode(ambulanceData.driver_contact);

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);

    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    table.appendChild(tr);
  }
  ambulanceListData.appendChild(table);
}

function bookNowWindow(marker_data, user_lat_lng, map, markerId) {
  lat = marker_data.lat;
  lng = marker_data.lng;
  ambulance_lat_lng = { lat: lat - 0.001, lng: lng + 0.001 };
  distance = haversine_distance(user_lat_lng, ambulance_lat_lng);

  cost = parseInt(1000) + parseFloat((distance * 200).toFixed(2));
  ETAMinutes = parseInt(
    parseInt(5) + (parseFloat((distance * 10).toFixed(2)) % 55)
  );
  ETASeconds = parseInt(parseFloat((distance * 60).toFixed(2)) % 60);

  distance_value = document.createElement("h7");
  distance_value.innerHTML =
    "<br>Distance is <b>" +
    distance.toFixed(3) +
    " KM</b>" +
    "<br>Expected Rate: <b>" +
    cost +
    " INR</b>" +
    "<br>Estimated Time of Arrival (ETA): <b>" +
    ETAMinutes +
    " Minutes " +
    ETASeconds +
    " Seconds</b><br>";

  setTimeout(() => {
    document
      .getElementById("driverDetails" + markerId)
      .appendChild(distance_value);
    document.getElementById("bookNowWindow" + markerId).innerHTML = "Book Now";
    document.getElementById("bookNowWindow" + markerId).onclick = () =>
      makeBooking(markerId);
  }, 1000);
  console.log(distance);

  addCacheAmbulanceID(markerId);
}

function generate_path(map, myLatLng1, myLatLng2) {
  var pathBetween = new google.maps.Polyline({
    path: [myLatLng1, myLatLng2],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  addLine(pathBetween, map);
  // setTimeout(
  //   ()=>removeLine(pathBetween, map), 5000
  // )
  return pathBetween;
}

function addLine(pathBetween, map) {
  pathBetween.setMap(map);
}

function removeLine(pathBetween, map) {
  pathBetween.setMap(null);
}

function remove_path(map, myLatLng1, myLatLng2) {
  var pathBetween = new google.maps.Polyline({
    path: [myLatLng1, myLatLng2],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  pathBetween.setMap(null);
}

//function to get distance by longitudes and some math: USED
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

// function bookNow(ambulances, )

function makeBooking(markerId) {
  addCacheAmbulanceID(markerId);
  window.location.href = "../Test Frontend/page4_user_booking.html";
}

//FOR DEALING WITH CACHE IN FUTURE PART, CHECKBOX PE CLICK KARNE KE BAAD KE LIE
function addCacheAmbulanceID(ambulanceID) {
  localStorage.setItem("ambulanceID", ambulanceID);

  // setTimeout(() => {
  //   let myName = localStorage.getItem('ambulanceID');
  //   console.log(myName)
  // }, 1000)
}
function addCacheHospitalData(userData) {
  localStorage.setItem("hospitalID", userData);
}

function addCacheUserData(userData) {
  localStorage.setItem("userID", userData);

  // setTimeout(() => {
  //   let myName = localStorage.getItem('userID');
  //   console.log(myName)
  // }, 9000)
}
