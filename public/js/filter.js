document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");
  let fistCardWidth = carousel.querySelector(".filterCard").offsetWidth;
  const carousalChilderns = [...carousel.children];
  let isDragging = false, startX, startScrollLeft, timeoutId;

  let cardPreview = Math.round(carousel.offsetWidth / fistCardWidth);

  // Duplicate cards for infinite scroll effect
  carousalChilderns.slice(-cardPreview).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  carousalChilderns.slice(0, cardPreview).reverse().forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });


  // Dragging handlers
  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  // Infinite scroll
  const scrollInfinite = () => {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoplay();
  };

  // Autoplay functionality
  const autoplay = () => {
    if (window.innerWidth < 100) return; 
    timeoutId = setTimeout(() => carousel.scrollLeft += fistCardWidth, 2500);
  };

  autoplay();

  // Event listeners
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoplay);
  carousel.addEventListener("scroll", scrollInfinite);
});

let taxSwitch = document.getElementById("flexSwitchCheckDefault");
    taxSwitch.addEventListener("click" , ()=>{
      let taxinfo = document.getElementsByClassName("tax-info");
      for( info of taxinfo)
      { if(info.style.display !="inline"){
          info.style.display = "inline";
      }else{
        info.style.display = "none";
      }
      }
    })