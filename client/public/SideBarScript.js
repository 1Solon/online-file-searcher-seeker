// let isUserLoggedIn = sessionStorage.getItem("logged-in");

let sidebar = document.querySelector("#SidebarComponent")
let closeBtn = document.querySelector("#btn")
let searchBtn = document.querySelector(".bx-search-alt") //.bx-search-alt  / #search_li

// function to check when user clicks on menu button, opens/closes sidebar
btn.onclick = function(){
    var toggle = sidebar.classList.toggle("active")
    checker(toggle)
}

// function to check when user clicks on search button, opens/closes sidebar
searchBtn.onclick = function(){
    var toggle = sidebar.classList.toggle("active")
    checker(toggle)
}

// Checks if Sidebar is open or closed
checker = function(toggle){
    // Moves content according to sidebar 
    // if (isUserLoggedIn == 1){



    
        if (toggle == true){
            var x = document.getElementsByClassName("file")
            x[0].style.transition = "all 0.5s ease"
            x[0].style.paddingLeft = "65%"  
            
            // icon change
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")
        }
        else{
            var x = document.getElementsByClassName("file")
            x[0].style.transition = "all 0.5s ease"
            x[0].style.paddingLeft = "50%"
            
            closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
        }


    // }
    // FOR USERPAGE CONTENT
    // else if (isUserLoggedIn == 3){



        // Moves content according to sidebar
        // if (toggle == true){
        //     var l = document.getElementsByClassName("body")
        //     l[0].style.transition = "all 0.5s ease"
        //     l[0].style.position = "relative";
        //     l[0].style.left = "10%";
        //     closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")

        // }
        // else{
        //     var l = document.getElementsByClassName("body")
        //     l[0].style.position = "relative";
        //     l[0].style.transition = "all 0.5s ease"
        //     l[0].style.left = "0%";
        //     closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
        // }



    // }
}

