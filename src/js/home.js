const div = document.querySelectorAll(".carouselImages"); //hacemos que esos elementos de la clase html esten en un array

//móvil:
if (window.matchMedia("(max-width: 768px)").matches) { 
  div.forEach((image) => {
    image.addEventListener("click", function (event) {
      if (!this.classList.contains("selected")) {
        event.preventDefault();
        div.forEach((img) => img.classList.remove("selected"));
        this.classList.add("selected");
      }
    });
  });
//ordenador:
} else { 
  div.forEach((image) => {
    image.addEventListener("mouseover", function () {
      div.forEach((img) => img.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
}
