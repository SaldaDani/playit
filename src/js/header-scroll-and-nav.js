  // Selecciona el header y la foto
  const header = document.querySelector('header');
  const foto = document.querySelector('.hero');
  const divisor = document.querySelector('.divider')

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add('bg-color');
        divisor.style.opacity = 0 //quitas raya
      } else {
        header.classList.remove('bg-color');
        divisor.style.opacity = 1
      }
    });
  }, { threshold: 0.5}); 

  observer.observe(foto)

  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu")
  const sideNav = document.querySelector(".nav")

  menuToggle.addEventListener("click", () => {
    sideNav.classList.add("visible")
  } )

  closeMenu.addEventListener("click", () => {
    sideNav.classList.remove("visible");
  })



