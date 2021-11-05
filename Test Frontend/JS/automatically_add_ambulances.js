//can use this to generate random ambulances, places ambulances at three locations, completely customisable
ambulance_data = {
    // around user location
    title: "AIIMS",//random
    "lat": 27.00,//random
    "lng": 77.00,//random
    hospital: 'aiims',//var
    driver_name: "Mr Che Gueverra",//var
    driver_contact: 9292929212,//var
    description: "Max ambulance..available.",//var
    status: "available",
    type: "ptv",//var
    icon: "icon_ptv",//var
};

icons = ['ptv', 'icu', 'super_fast', 'free']

hospitals = ['aiims','apollo','max']

lats = [28.4127, 29.3075, 28.4863]
lngs = [77.3134, 78.5080, 77.5146]


for (i = 0; i <= 50; i++) {
    pos_icon = parseInt((Math.random()*5))
    hospital_pos = parseInt((Math.random()*4))
    pos_lat_lng = parseInt((Math.random()*4))
    if(pos_icon==4)
        pos_icon=0
    if(hospital_pos==3)
        hospital_pos=0
    if(pos_lat_lng==3)
        pos_lat_lng=0
        console.log(icons[pos_icon], pos_icon,"pos")
    console.log(hospitals[hospital_pos], hospital_pos)
    
    var plusOrMinusLat = Math.random() < 0.5 ? -1.0 : 1.0;
    var plusOrMinusLng = Math.random() < 0.5 ? -1.0 : 1.0;

    var_lat = Math.random()/50.0*plusOrMinusLat;
    var_lng = Math.random()/50.0*plusOrMinusLng;
    

    ref = firebase.database().ref("ambulances/" + i).update({
        driver_name: "Mr. Driver",
        driver_contact: 1010101010,
        description: "Available Ambulance"
    });

}