
//selectors ---------------------------------------

//dot-menu
const dotBtn = document.querySelector(".menu-wrapper button");
const dotMenu = document.querySelector(".dot-menu");

//hover-text
const crossBtn = document.querySelector(".cross-button");
const hoverText = document.querySelector(".hover-text");



//events ------------------------------------

//dot-menu
dotBtn.addEventListener("click", () =>
  dotMenu.classList.toggle("hide-dot-menu")
);

//hover-text 
crossBtn.addEventListener("mouseover", () =>
  hoverText.classList.toggle("show-hover-text")
);

crossBtn.addEventListener("mouseout", () =>
  hoverText.classList.toggle("show-hover-text")
);


