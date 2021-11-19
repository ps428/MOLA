
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
        console.log(12,user_ids)
        for( i in user_ids)
        {
            var user_data = firebase.database().ref("user/"+i);
            setTimeout(() => {
                // console.log(user_data)
                
            }, 1000);
        }    
    },3000);
    

        // data += "<h4><b>" + serviceProviders[i].name + "</b></h4>";
        // data += "<b>Mail ID: </b>" + serviceProviders[i].mail + "<br>";
        // data += "<b>Contact: </b>" + serviceProviders[i].mobileNumber + "<br>";
        // if (i != serviceProviders.length - 1) {
        //   data += "<br>";
        // }
        // //data += rides[i].userID + "<br><br>";
  
        // document.getElementById("Super Admin Bookings").innerHTML = data;
 }
  