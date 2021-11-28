let sidebar = document.querySelector("#SidebarComponent")
let closeBtn = document.querySelector("#btn")

// function to check when user clicks on menu button, opens/closes sidebar
btn.onclick = function(){
    var toggle = sidebar.classList.toggle("active")
    checker(toggle)
}

// Checks if Sidebar is open or closed
checker = function(toggle){

    // Moves content according to sidebar 
    if(document.location.pathname === "/homepage"){
        if (toggle == true){
            var x = document.getElementsByClassName("file")
            x[0].style.transition = "all 0.5s ease"
            x[0].style.paddingLeft = "10%"  
            
            // icon change
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")
        }
        else{
            var x = document.getElementsByClassName("file")
            x[0].style.transition = "all 0.5s ease"
            x[0].style.paddingLeft = "0%"
            
            closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
        }
    }

    // FOR USERPAGE CONTENT
    if(document.location.pathname === "/userpage"){
        // Moves content according to sidebar
        if (toggle == true){
            var l = document.getElementsByClassName("row no-gutters")
            l[0].style.position = "relative";
            l[0].style.transition = "all 0.5s ease"
            l[0].style.left = "15em";
            
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")

        }
        else{
            var l = document.getElementsByClassName("row no-gutters")
            l[0].style.position = "relative";
            l[0].style.transition = "all 0.5s ease"
            l[0].style.left = "5em";
            
            closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
        }
    }
}