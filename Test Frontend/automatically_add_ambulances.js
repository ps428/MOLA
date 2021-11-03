ambulance_data = {
    // around user location
    title: "AIIMS PTV",//random
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



for (i = 28; i < 50; i++) {
    ref = firebase.database().ref("ambulances/" + i).set({
        status: 'available'
    })

}