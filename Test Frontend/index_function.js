// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function formSubmit() {
    console.log("hello");
    // Get Values from the DOM
  
    var password = document.querySelector("#password").value;
    var username = document.querySelector("#username").value;
    //window.alert("message: " + password + " " + username);
  
    //send message values
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      window.location.href = "../Tests/Adding Google Map to a page/index.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      window.alert("Not able to log in. Check the Credentials!")
      console.log(errorMessage);
    });

  }

  function registerUser(){
    
  }