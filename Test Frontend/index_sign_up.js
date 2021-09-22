function add_user(){
    document
        .getElementById("userForm")
        .addEventListener('submit', formSubmit);
}

function formSubmit(e) {
    e.preventDefault();
    
    let name = document.querySelector('#FName').value;

}