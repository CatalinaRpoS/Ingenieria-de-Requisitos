function register() {
    // Obtener nombre de usuario y contraseña ingresados por el usuario
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Verificar que se haya ingresado información
    if (username === "" || password === "") {
        swal({
          title: "Recuerda ingresar la información solicitada",
          icon: "warning",
        });
        return;
      }
    
    // Verificar si el usuario ya existe en el localStorage
    if (localStorage.getItem(username)) {
        swal({
            title: "El usuario ya existe",
            icon: "info",
        });
    } else {
        // Guardar nombre de usuario y contraseña encriptada
        localStorage.setItem(username, password);
        swal({
            title: "Usuario registrado exitosamente",
            icon: "success",
        });
    }
    limpiar();
  }
  
  function login() {
    // Obtener nombre de usuario y contraseña ingresados por el usuario
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;


    // Verificar que se haya ingresado información
    if (username === "" || password === "") {
        swal({
            title: "Recuerda ingresar la información solicitada",
            icon: "warning",
        });
        return;
        }

    // Obtener la contraseña almacenada para el usuario
    let storedPassword = localStorage.getItem(username);
  
    // Verificar el inicio de sesión
    if (storedPassword && storedPassword === password) {
        window.location.href = 'index.html';
        limpiar();
    } else {
        swal({
            title: "Nombre de usuario o contraseña incorrectos",
            icon: "error",
        });
    }
  }

  function limpiar() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }