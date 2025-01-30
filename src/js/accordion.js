const accordeon = document.getElementsByClassName('accordion-item');
for(i=0; i<accordeon.length; i++){
    accordeon[i].addEventListener('click', function(){
        this.classList.toggle('active');
    })
    
};

