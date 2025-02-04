document.addEventListener("DOMContentLoaded", () => {
   
    const form = document.querySelector("form");
    const nameField = document.querySelector("[name=nombre]");
    const lastNameField = document.querySelector("[name=apellido]");
    const emailField = document.querySelector("[name=email]");
    const text_area = document.querySelector("[name=mensaje]");
  
    
    const showError = (field, message) => {
      field.classList.add("invalid");
      if (field.nextElementSibling) {
        field.nextElementSibling.classList.add("error");
        field.nextElementSibling.innerText = message;
      }
    };
  
    
    const clearError = (field) => {
      field.classList.remove("invalid");
      if (field.nextElementSibling) {
        field.nextElementSibling.classList.remove("error");
        field.nextElementSibling.innerText = "";
      }
    };
  
    
    const validateEmptyField = (e) => {
      const field = e.target;
      const fieldValue = field.value;
      if (fieldValue.trim() === "") {
        showError(field, `El ${field.name} es obligatorio`);
      } else {
        clearError(field);
      }
    };
  

    const validateEmailFormat = (e) => {
      const field = e.target;
      const fieldValue = field.value;
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (fieldValue.trim() !== "" && !regex.test(fieldValue)) {
        showError(field, `El formato de ${field.name} es inválido`);
      } else if (fieldValue.trim() !== "") {
        clearError(field);
      }
    };
  
    nameField.addEventListener("blur", validateEmptyField);
    lastNameField.addEventListener("blur", validateEmptyField);
    text_area.addEventListener("blur", validateEmptyField);
    emailField.addEventListener("blur", (e) => {
      validateEmptyField(e);
      validateEmailFormat(e);
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      validateEmptyField({ target: nameField });
      validateEmptyField({ target: lastNameField });
      validateEmptyField({ target: emailField });
      validateEmailFormat({ target: emailField });
  
      
      const invalidFields = form.querySelectorAll(".invalid");
      if (invalidFields.length === 0) {
        alert("Formulario enviado. Muchas gracias!");
        form.reset();
      }
    });
  });