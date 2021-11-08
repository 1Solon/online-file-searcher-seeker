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
    if (toggle == true){
        var x = document.getElementsByClassName("file")
        x[0].style.paddingLeft = "260px"
        x[0].style.transition = "all 0.5s ease"
        
        // icon change
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")

        searchBtn = document.querySelector(".bx-search-alt")
        
    }
    else{
        var x = document.getElementsByClassName("file")
        x[0].style.paddingLeft = "100px"
        x[0].style.transition = "all 0.5s ease"

        // icon change
        closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
    }
}