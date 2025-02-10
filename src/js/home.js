const div = document.querySelectorAll(".carouselImages"); 

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
//tablet:
}  else if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) {
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
