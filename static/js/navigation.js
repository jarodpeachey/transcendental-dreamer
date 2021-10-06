(function () {
  // ELEMENTS
  const menu = document.querySelector(".navigation-menu");
  const mobileMenuOpen = document.querySelector(".mobile-menu__open");
  const mobileMenuClose = document.querySelector(".mobile-menu__close");
  const menuItems = document.querySelectorAll(".menu__item");

  // VARIABLES
  let open = false;

  mobileMenuOpen.addEventListener("click", openMobileMenu);
  mobileMenuClose.addEventListener("click", closeMobileMenu);


  if (window.scrollY > 80) {
    document.querySelector("nav").classList.add("scrolled");
  } else {
    document.querySelector("nav").classList.remove("scrolled");
  }

  document.addEventListener("scroll", e => {
    if (window.scrollY > 80) {
      document.querySelector("nav").classList.add("scrolled");
    } else {
      document.querySelector("nav").classList.remove("scrolled");
    }
  });

  document.addEventListener("click", e => {
    console.log(e);
    if (
      open &&
      !e.target.classList.contains("navigation-menu") &&
      !e.target.classList.contains("mobile-menu__toggle--mask") &&
      !e.target.classList.contains("mobile-menu__toggle") &&
      !e.target.classList.contains("mobile-menu__toggle--span") && !e.target.classList.contains('mobile-menu__toggle__svg')
    ) {
      menu.classList.remove("open");
      open = false;
    }
  });

  menuItems.forEach(item => {
    item.addEventListener("click", e => {
      menu.classList.remove("open");
    });
  });

  function openMobileMenu() {
    console.log("OPENING");
    menu.classList.add("open");
    open = true;
  }
  function closeMobileMenu() {
    console.log("CLOSING");
    menu.classList.remove("open");
    open = false;
  }
})();
