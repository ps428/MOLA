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

async function get_ambulance_data(user_lat, user_lng, map){

  ambulance_data =  {
    // around user location
    "title": 'AIIMS PTV',
    // "lat": user_lat + Math.random() / 400,
    // "lng": user_lng - Math.random() / 100,
    "driver_name": "Mr Che Gueverra",
    "driver_contact": 9292929212,
    "description": 'Max ambulance..available.',
    "status": 'available',
    "type": "ptv",
    "icon": 'icon_ptv'
  }


  ref = firebase.database().ref("ambulances").orderByKey();
  var ambulances = [];
   
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      // console.log(childData);
      ambulances.push(childData)
    });
  });

   
  setTimeout( () => {
    add_ambulances(ambulances, user_lat, user_lng, map);

    myLatLng1 = {lat: user_lat-0.001, lng: user_lng+0.001}
    myLatLng2 = {lat:ambulances[1].lat-0.001, lng:ambulances[1].lng+0.001}
    generate_path(map, myLatLng1, myLatLng2)

  },3000
  )
  
}

function add_ambulances(ambulances, user_lat, user_lng, map) {

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

  console.log(ambulances,"-----")
 
  for (i = 0; i < ambulances.length; i++) {
    marker_data = ambulances[i];

    if(marker_data.status != "available")
      continue

    console.log(marker_data.icon)
    lat_long = new google.maps.LatLng(marker_data.lat, marker_data.lng);

    if(marker_data.icon == "icon_super_fast")
      icon = icon_super_fast
    if(marker_data.icon == "icon_icu")
      icon = icon_icu
    if(marker_data.icon == "icon_ptv")
      icon = icon_ptv
    if(marker_data.icon == "icon_free")
      icon = icon_free
   
    const marker = new google.maps.Marker({
      title: marker_data.title,
      position: lat_long,
      icon: icon,
      map: map,
    });

    // DON'T REMOVE THESE COMMENTS, THESE ARE FOR ADDING A ON CLICK FUNCTION, WILL ACTIVATE IT AFTER FIRST DEMO
    // Attach click event to the marker.
      (function (marker, marker_data) {
        google.maps.event.addListener(marker, "click", function (e) {
            infoWindow = new google.maps.InfoWindow({
              content: "",
            });
            //Wrap the contentq inside an HTML DIV in order to set height and width of InfoWindow.
            infoWindow.setContent("<div style = 'width:300px;min-height:50px'>" + marker_data.description + "</div>");
            infoWindow.open(map, marker);
            console.log('open_window')
        });
    })(marker, marker_data);
  }

  generate_results_table(ambulances)
 

  // console.log(features[i].position)

  // The marker, positioned at Uluru
}

function generate_results_table(ambulances)
{
  var ambulanceListData = document.getElementById('ambulanceList')

  var table = document.createElement('table');
  var tr = document.createElement('tr');   
  var td0 = document.createElement('th');
  var td1 = document.createElement('th');
  var td2 = document.createElement('th');
  var td3 = document.createElement('th');
  
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

  for (i = 0; i < ambulances.length; i++) {
    ambulanceData = ambulances[i]

    if(ambulanceData.status != "available")
      continue

    var tr = document.createElement('tr');   
    var td0 = document.createElement('input');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    
    td0.setAttribute('type','checkbox')

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
  ambulanceListData.appendChild(table)

}


function generate_path(map, myLatLng1, myLatLng2)
{
  var pathBetween = new google.maps.Polyline({
    path: [myLatLng1,myLatLng2],
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  //NEEDS BILLING SO NOT USING IT
  // var display = new google.maps.DirectionsRenderer();
  // var services = new google.maps.DirectionsService();
  // display.setMap(map);
  //     var request ={
  //         origin : myLatLng1,
  //         destination:myLatLng2,
  //         travelMode: 'DRIVING'
  //     };
  //     services.route(request,function(result,status){
  //         if(status =='OK'){
  //             display.setDirections(result);
  //         }
  //     });

  pathBetween.setMap(map);
}

//function to get distance by longitudes and some math
function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}