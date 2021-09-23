// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function formSubmit() {
  //console.log("hello");
  // Get Values from the DOM

  var password = document.querySelector("#password").value;
  var username = document.querySelector("#username").value;
  //window.alert("message: " + password + " " + username);

  //send message values
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      window.location.href = "../Test Frontend/page3_map_user_view.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      window.alert("Not able to log in. Check the Credentials!");
      console.log(errorMessage);
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
