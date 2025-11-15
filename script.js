// scripts.js

// Esperamos a que el DOM esté listo (Requisito 5)
$(document).ready(function () {

  // ======================
  // Manejo de Temas (Modo Oscuro/Claro) - Requisito 4
  // ======================
  const DARK_THEME_CLASS = "theme-dark";

  function applyTheme(isDark) {
    if (isDark) {
      $("body").addClass(DARK_THEME_CLASS);
    } else {
      $("body").removeClass(DARK_THEME_CLASS);
    }
    // Sincroniza el estado en localStorage (Persistencia)
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  }

  // AL CARGAR: Aplica el tema guardado
  const savedTheme = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Decide el tema inicial: usa el guardado, o la preferencia del sistema, o deshabilitado
  let initialDark = savedTheme === 'enabled' || (savedTheme === null && prefersDark);
  applyTheme(initialDark);

  // Cuando se hace clic en el botón de toggle (ícono)
  $("#theme-toggle").on("click", function () {
    const isDark = $("body").hasClass(DARK_THEME_CLASS);
    applyTheme(!isDark); // Invierte el estado
  });

  // ======================
  // Validación del Formulario de Contacto - Requisito 5
  // ======================
  const $contactForm = $("#contact-form");

  if ($contactForm.length) {
    
    // Función para limpiar errores después de un borrado
    function clearFormFeedback() {
        $(".error-text").text("");
        $("#form-message").removeClass("success error alert").text("");
        $("input, textarea").removeClass("input-error");
    }

    // Evento de Limpiar (Botón BORRAR) - Usa type="reset" en HTML
    $(".btn-reset").on("click", function() {
        // Limpiamos los campos y el feedback visual
        clearFormFeedback();
        // El botón tipo "reset" en HTML ya limpia los campos
    });

    // Evento de Enviar
    $contactForm.on("submit", function (event) {
      event.preventDefault(); // Evita el envío real

      // Limpiamos mensajes previos
      clearFormFeedback(); 

      let isValid = true;

      // Obtener valores de la consigna: Nombre, Edad, Email, Comentario
      const name = $("#name").val().trim();
      const age = $("#age").val().trim();
      const email = $("#email").val().trim();
      const comment = $("#comment").val().trim();

      // Validación 1: Nombre (No vacío)
      if (name === "") {
        $("#name-error").text("El nombre y apellido son obligatorios.");
        $("#name").addClass("input-error");
        isValid = false;
      }
      
      // Validación 2: Edad (No vacía y Número)
      if (age === "" || isNaN(age) || parseInt(age) < 1) {
        $("#age-error").text("Ingresá una edad válida.");
        $("#age").addClass("input-error");
        isValid = false;
      }

      // Validación 3: Email (No vacío y formato Regex)
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

      // Validación 4: Comentario (No vacío)
       if (comment === "") {
        $("#comment-error").text("El comentario es obligatorio.");
        $("#comment").addClass("input-error");
        isValid = false;
      }


      if (!isValid) {
        // Si hay errores, muestra mensaje general
        $("#form-message").addClass("error").text("Por favor, corregí los errores marcados.");
        return; 
      }

      // Requisito 5b: Si todo está bien, mostrar alerta
      alert("¡El mensaje fue enviado exitosamente!");

      // Mensaje en la página (opcional, buena práctica)
      $("#form-message")
        .addClass("success alert")
        .text("¡Mensaje enviado exitosamente! (Confirmado por Alerta)");
        
      // Limpiamos el formulario después de la alerta
      this.reset();
    });
  }
});