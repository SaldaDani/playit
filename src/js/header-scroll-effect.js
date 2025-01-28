  // Selecciona el header y la foto
  const header = document.querySelector('header');
  const foto = document.querySelector('.hero-image');
  const divisor = document.querySelector('.divisor')

  // Usamos el Intersection Observer API para detectar cuando la foto deja de estar visible
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si la foto ya no está visible en la pantalla
      if (!entry.isIntersecting) {
        // Añadimos la clase bg-color al header
        header.classList.add('bg-color');
        divisor.style.opacity = 0 //quitas raya
      } else {
        // Si la foto sigue siendo visible, removemos la clase bg-color
        header.classList.remove('bg-color');
        divisor.style.opacity = 1
      }
    });
  }, { threshold: 0.17}); // 0 significa que el 0% de la foto debe estar fuera de la pantalla para activar el cambio

  // Observar la foto
  observer.observe(foto);

  // que sea cuando acabe de pasar (un poco antes) el header por la foto
  //la raya