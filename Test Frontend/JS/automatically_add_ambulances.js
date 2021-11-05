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

firstName = [ "Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David",  "Frank", "Mike", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David","Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred","Ty", "Victor", "Walter","Aaron", "Ben", "Carl", "Dan", "David"];

names =["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler" ];

contacts = ['8879662915',
'6104212025',
'4232945315',
'4758742707',
'9024614571',
'5563197285',
'5896272459',
'8423988116',
'3865983961',
'7474762728',
'4588313997',
'8046427860',
'9015193282',
'6496246110',
'6904582406',
'3409920386',
'2467706980',
'9437723420',
'2565172439',
'2297471574',
'2576177341',
'5178069856',
'7636187676',
'8736917253',
'3129587864',
'8905029106',
'2173367142',
'6467373591',
'5113238139',
'2426794512',
'8314234469',
'7308564737',
'3633536526',
'8002421287',
'9736793206',
'7849142449',
'2928947643',
'8459655039',
'6115117606',
'8372284207',
'4945280560',
'4896946801',
'6023990351',
'9517476843',
'8207616515',
'4648400092',
'3493344716',
'7599935377',
'5372468920',
'8468395961',
'9983832456']

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
    pre = "Mr."
    if(i<25)
        pre = "Mrs."

    ref = firebase.database().ref("ambulances/" + i).update({
        driver_name: pre + ' ' + firstName[i] + ' ' + names[i],
        driver_contact: contacts[i],
        description: "Available Ambulance: " +hospitals[hospital_pos].toUpperCase() + ' ' + icons[pos_icon].toUpperCase(),
        hospital: hospitals[hospital_pos],
        type: icons[pos_icon],
        icon: 'icon_'+icons[pos_icon],
        status: 'available',
        title: hospitals[hospital_pos].toUpperCase() + ' ' + icon[pos_icon].toUpperCase()
    });

}