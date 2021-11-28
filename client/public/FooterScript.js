let footerHide = document.querySelector(".FooterDiv");

// Stores current Y value = 0
var prevScroll = window.pageYOffset;

// Hides footer when scrolling down 
window.onscroll = function() {
    if(document.location.pathname === "/homepage"){
        var currentScroll = window.pageYOffset;

        // Checks if current Y value is higher than previous value and hides / shows footer
        if (currentScroll > prevScroll) {
            footerHide.style.transition = "all 1s"
            footerHide.style.bottom = "-10em";
        }
        else {
            footerHide.style.bottom = "8em";
        }
    }
}