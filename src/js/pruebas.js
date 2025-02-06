// Seleccionamos el formulario y el mensaje de agradecimiento
const form = document.getElementById('myForm');
const thankYouMessage = document.getElementById('thankYouMessage');

// Escuchamos el evento "enviar" del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que se recargue la página

  // Ocultamos el formulario y mostramos el mensaje de agradecimiento
  form.style.display = 'none';
  thankYouMessage.style.display = 'block';
});