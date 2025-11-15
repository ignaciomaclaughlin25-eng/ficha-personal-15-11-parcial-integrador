// scripts.js


$(document).ready(function () {

  
  const DARK_THEME_CLASS = "theme-dark";

  function applyTheme(isDark) {
    if (isDark) {
      $("body").addClass(DARK_THEME_CLASS);
    } else {
      $("body").removeClass(DARK_THEME_CLASS);
    }
    
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  }

  
  const savedTheme = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  
  let initialDark = savedTheme === 'enabled' || (savedTheme === null && prefersDark);
  applyTheme(initialDark);

  
  $("#theme-toggle").on("click", function () {
    const isDark = $("body").hasClass(DARK_THEME_CLASS);
    applyTheme(!isDark); 
  });

  
  const $contactForm = $("#contact-form");

  if ($contactForm.length) {
    
    
    function clearFormFeedback() {
        $(".error-text").text("");
        $("#form-message").removeClass("success error alert").text("");
        $("input, textarea").removeClass("input-error");
    }

    
    $(".btn-reset").on("click", function() {
        
        clearFormFeedback();
        
    });

    
    $contactForm.on("submit", function (event) {
      event.preventDefault(); 

      
      clearFormFeedback(); 

      let isValid = true;

      
      const name = $("#name").val().trim();
      const age = $("#age").val().trim();
      const email = $("#email").val().trim();
      const comment = $("#comment").val().trim();

      
      if (name === "") {
        $("#name-error").text("El nombre y apellido son obligatorios.");
        $("#name").addClass("input-error");
        isValid = false;
      }
      
      
      if (age === "" || isNaN(age) || parseInt(age) < 1) {
        $("#age-error").text("Ingresá una edad válida.");
        $("#age").addClass("input-error");
        isValid = false;
      }

      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "") {
        $("#email-error").text("El email es obligatorio.");
        $("#email").addClass("input-error");
        isValid = false;
      } else if (!emailPattern.test(email)) {
        $("#email-error").text("Ingresá un email con formato válido.");
        $("#email").addClass("input-error");
        isValid = false;
      }

      
       if (comment === "") {
        $("#comment-error").text("El comentario es obligatorio.");
        $("#comment").addClass("input-error");
        isValid = false;
      }


      if (!isValid) {
        
        $("#form-message").addClass("error").text("Por favor, corregí los errores marcados.");
        return; 
      }

      
      alert("¡El mensaje fue enviado exitosamente!");

      
      $("#form-message")
        .addClass("success alert")
        .text("¡Mensaje enviado exitosamente! (Confirmado por Alerta)");
        
      
      this.reset();
    });
  }
});
