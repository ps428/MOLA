
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
    // console.log(bookingsArray)

      
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
    
    setTimeout(() => {
        // console.log(12,user_ids)
        
        user_data = []
        // console.log(user_ids)


        for(j=0;j<user_ids.length;j++)
        {
            curr_user = firebase.database().ref('user/'+user_ids[j])
            curr_user.once("value", function(snapshot) {
                user_data.push(snapshot.val())
                // console.log(snapshot.val())
              });    
           
        }
        //   console.log(user_data)

          ambualance_data = []        
          for(j=0;j<ambulance_ids.length;j++)
          {
              curr_user = firebase.database().ref('ambulances/'+ambulance_ids[j])
              curr_user.once("value", function(snapshot) {
                  ambualance_data.push(snapshot.val())
                  // console.log(snapshot.val())
                });    
             
          }
            // console.log(ambualance_data)
  
    },2000);
    

    setTimeout(() => {
        // ambualance_data.forEach(element => {
        //     console.log(element['hospital'])
        // });
    for(i=0;i<user_data.length;i++)
    {
        // console.log(user_data[i])
        // console.log(ambualance_data[i])

        data += "<h4><b>Organisation name: " + ambualance_data[i]['hospital'].toUpperCase() + "</b></h4>";
        data += "<b>Driver Name: </b>" + ambualance_data[i]['driver_name'] + "<br>";
        data += "<b>Driver Contact: </b>" + ambualance_data[i]['driver_contact'] + "<br>";
        data += "<b>Ambulance Type: </b>" + ambualance_data[i]['type'] + "<br>";
        data += "<b>User Name: </b>" + user_data[i]['name'] + "<br>";
        data += "<b>User Contact: </b>" + user_data[i]['type'] + "<br>";
        // data += "<b>Contact: </b>" + serviceProviders[i].mobileNumber + "<br>";
          data += "<hr>";
        //data += rides[i].userID + "<br><br>";
  
        document.getElementById("Super Admin Bookings").innerHTML = data;
    }
},3000);

        
 }
  