
function getSuperAdminBookings() {
  
    var bookings = firebase.database().ref("bookings/");
    bookingsArray = []
    
    bookings.on("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        // console.log(childData);
        bookingsArray.push(childData);
        });
    });


    var all_ambulances = firebase.database().ref("ambulances/");
    ambulance_data = []
    all_ambulances.on("value", (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          // console.log(childData);
          ambulance_data.push(childData);
          });
      });
      
  
    data = "";
    ambulance_ids = []
    user_ids = []
    costs = []
    distances = []
    etas = []
    booking_times = []
    user_locations = []
    ambulance_locations = []

    setTimeout(() => {
        for(i = 0 ;i<bookingsArray.length; i++)
        {
        serviceProviders = bookingsArray[i]
    
        for(child in serviceProviders)
        {
            childData = serviceProviders[child]

            ambulance_ids.push(childData['ambulanceID'])
            user_ids.push(childData['userID'])
            costs.push(childData['cost'])
            distances.push(childData['distance'])
            etas.push(childData['ETA'])
            booking_times.push(childData['booking_time'])
            user_locations.push(childData['userLocation'])
            ambulance_locations.push(childData['ambulanceLocation'])            
        }
        }
           
    }, 2000);
    //   console.log(bookingsArray)
    user_name = []
    user_contact = []
    user_mail = []
    
    ambulance_driver_name = []
    ambulance_driver_contact = []
    ambulance_title = []
    ambulance_type = []
    
    setTimeout(() => {
        // console.log(12,user_ids)
        var users = firebase.database().ref();
        
        for( i =0; i<user_ids.length; i++)
        {
            console.log(user_ids[i])
            console.log(i)
        }
        console.log(user_ids)
        // curr_user = users.child(user_ids[i])
        // curr_user.once("value", function(snapshot) {
        //     snapshot.forEach(function(child) {
        //       console.log(": "+child.val());
        //     });
        //   });    
    },2000);
    

        // data += "<h4><b>" + serviceProviders[i].name + "</b></h4>";
        // data += "<b>Mail ID: </b>" + serviceProviders[i].mail + "<br>";
        // data += "<b>Contact: </b>" + serviceProviders[i].mobileNumber + "<br>";
        // if (i != serviceProviders.length - 1) {
        //   data += "<br>";
        // }
        // //data += rides[i].userID + "<br><br>";
  
        // document.getElementById("Super Admin Bookings").innerHTML = data;
 }
  