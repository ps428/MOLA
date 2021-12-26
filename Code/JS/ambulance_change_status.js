ref = firebase.database().ref("ambulances").orderByKey();
var ambulances = [];

lats = []
lngs = []

ref.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        lats.push(childData.lat);
        lngs.push(childData.lng);
    });
});


setTimeout(
    () => {
        for (i = 1; i <= 27; i++) {
            num = (Math.random() * 100) % 10
            num2 = (Math.random() * 100) % 10
            if (num % 2 == 0) {
                if (num2 % 2 == 0) {
                    randomG = -Math.random()
                    randomT = -Math.random()
                    console.log(randomG, randomT)

                }
                else {
                    randomG = -Math.random()
                    randomT = Math.random()
                    console.log(randomG, randomT)

                }
            }
            else {
                if (num2 % 2 == 0) {
                    randomG = -Math.random()
                    randomT = -Math.random()
                    console.log(randomG, randomT)

                }
                else {
                    randomG = -Math.random()
                    randomT = +Math.random()
                    console.log(randomG, randomT)

                }
            }

            ref = firebase.database().ref("ambulances/" + i).update({
                status: 'available'
            })
        }
    }, 7000
)
