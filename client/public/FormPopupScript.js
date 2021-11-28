// same idea as in the sideBar
// let background = document.querySelector(".body")
let background = document.querySelector("#backgroundPopup")
let popup = document.querySelector("#popup")
let formOpen = document.querySelector(".Btn2")
let formClose = document.querySelector(".closeBtn")

if(document.location.pathname === "/userpage"){
    formOpen.onclick = function(){
        var toggle = popup.classList.toggle("active")
        checker2(toggle);
    }

    // Checks if popup is open or not and opens/closes according to the popup state
    function checker2(toggle) {
        if (toggle === true){
            popup.style.display = "block"
            background.style.display = 'block'
        }
        else if (toggle === false){
            popup.style.display = "none"
            background.style.display = 'none'
        }
    }

    // functions to close popup with second button
    formClose.onclick = function(){
        closeForm()
    }
    
    function closeForm() {
        var toggle = popup.classList.toggle("active")
        popup.style.display = "none"
        background.style.display = 'none'
    }
}