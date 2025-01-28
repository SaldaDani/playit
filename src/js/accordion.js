document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Cerrar todos los acordeones abiertos
            const activeHeader = document.querySelector('.accordion-header.active');
            const activeContent = document.querySelector('.accordion-content.active');

            if (activeHeader && activeHeader !== header) {
                activeHeader.classList.remove('active');
                activeContent.classList.remove('active');
            }

            // Alternar el estado del acordeón actual
            header.classList.toggle('active');
            header.nextElementSibling.classList.toggle('active');
        });
    });
});

