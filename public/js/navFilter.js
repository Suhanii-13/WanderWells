document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-toggler');
    const filterbar = document.querySelector('.filterBar');
    let isMoved = false; 

    if (navbar && filterbar) {
        navbar.onclick = function() {
            if (isMoved) {
                filterbar.style.marginTop = '2rem'; 
            } else {
                filterbar.style.marginTop = '15rem'; 
            }
            isMoved = !isMoved; 
        };
    }
});
