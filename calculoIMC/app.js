let peso_Maximo = 250; // kg
let peso_Minimo = 12.2; // promedio kg niño de 2 años
let estatura_Maxima = 2.5; // mts
let estaruta_minima = 0.86; // promedio mts niño de 2 años
let imc;
let categoria;

function asignarTextoElemento(id, texto, color_elemento) {
  let elementoHTML = document.getElementById(id);
  elementoHTML.style.color = color_elemento;
  elementoHTML.innerText = texto;
  return;
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    calcularIMC();
  }
});

function logout() {
  window.location.href = "login.html";
  localStorage.removeItem("historico");
}

function calcularIMC() {
  let peso = document.getElementById("peso_usuario").value;
  let estatura = document.getElementById("altura_usuario").value;

  if (peso === "" || estatura === "") {
    swal({
      title: "Recuerda ingresar la información solicitada",
      icon: "warning",
    });
    return;
  }

  if (peso > peso_Maximo || peso < peso_Minimo) {
    swal({
      title: "Advertencia",
      text: "El peso debe estar entre 12.2 y 250 Kg",
      icon: "warning",
    });
    return;
  }
  if (estatura > estatura_Maxima || estatura < estaruta_minima) {
    swal({
      title: "Advertencia",
      text: "La estatura debe estar entre 0.86 y 2.5 m",
      icon: "warning",
    });
    return;
  }
  imc = peso / (estatura * estatura);
  imc = (Math.round(imc * 10) / 10).toFixed(1);

  if (imc < 18.5) {
    asignarTextoElemento(
      "resultado_imc",
      "Tu IMC es de " + imc,
      "rgb(0,251,255)"
    );
    categoria="Bajo peso";
    asignarTextoElemento("categoria", categoria, "rgb(0,251,255)");
    asignarTextoElemento(
      "recomendacion",
      "Tu peso está por debajo del rango saludable. Considera hablar con un profesional de la salud para mejorar tu dieta y hábitos alimenticios."
    );
  } else if (imc >= 18.5 && imc < 25) {
    asignarTextoElemento(
      "resultado_imc",
      "Tu IMC es de " + imc,
      "green"
    );
    categoria="Peso saludable";
    asignarTextoElemento("categoria", categoria, "green");
    asignarTextoElemento(
      "recomendacion",
      "Tu peso está dentro del rango saludable. ¡Sigue manteniendo un estilo de vida activo y una dieta equilibrada!"
    );
  } else if (imc >= 25 && imc < 30) {
    asignarTextoElemento(
      "resultado_imc",
      "Tu IMC es de " + imc,
      "orange"
    );
    categoria="Sobrepeso";
    asignarTextoElemento("categoria", categoria, "orange");
    asignarTextoElemento(
      "recomendacion",
      "Tienes sobrepeso. Considera hacer cambios en tu dieta y aumentar la actividad física para reducir tu riesgo de problemas de salud relacionados con el peso."
    );
  } else if (imc >= 30 && imc < 35) {
    asignarTextoElemento(
      "resultado_imc",
      "Tu IMC es de " + imc,
      "red"
    );
    categoria= "Obesidad tipo 1";
    asignarTextoElemento("categoria", categoria, "red");
    asignarTextoElemento(
      "recomendacion",
      "Tienes obesidad grado 1. Es importante tomar medidas para controlar tu peso, como modificar tu dieta y hacer ejercicio regularmente."
    );
  } else if (imc >= 35 && imc < 40) {
    asignarTextoElemento(
      "resultado_imc",
      "Tu IMC es de " + imc,
      "pink"
    );
    categoria="Obesidad tipo 2";
    asignarTextoElemento("categoria", "Obesidad tipo 2", "pink");
    asignarTextoElemento(
      "recomendacion",
      "Tienes obesidad grado 2. Esto aumenta significativamente tu riesgo de desarrollar problemas de salud graves. Consulta a un profesional médico para obtener orientación y apoyo."
    );
  } else {
    asignarTextoElemento(
      "resultado_imc",
      "Tu IMC es de " + imc,
      "purple"
    );
    categoria="Obesidad tipo 3";
    asignarTextoElemento("categoria", categoria, "purple");
    asignarTextoElemento(
      "recomendacion",
      "Tienes obesidad grado 3, también conocida como obesidad mórbida. Este es un estado de salud grave que requiere atención médica inmediata. Busca ayuda profesional para iniciar un plan de pérdida de peso seguro y efectivo."
    );
  }
  // Habilitar el botón
  document.getElementById("guardar_resultados").disabled = false;
  limpiar();
}
function guardarResultados(){
  let fecha = new Date();
  let fecha_actual = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
  let hora = fecha.getHours() + ":" + fecha.getMinutes();
  let fecha_hora = fecha_actual + " " + hora;
  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push({
    fecha: fecha_hora,
    imc: imc,
    categoria: categoria,
  });
  localStorage.setItem("historico", JSON.stringify(historico));
  swal({
    title: "Los resultados fueron guardados exitosamente",
    icon: "success",
  });
}

function mostrarHistorico(){
  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  let tablaHTML = "<table><thead><tr><th>Fecha y Hora</th><th>IMC</th><th>Categoría</th></tr></thead><tbody>";

  historico.forEach(dato => {
    tablaHTML += `<tr><td>${dato.fecha}</td><td>${dato.imc}</td><td>${dato.categoria}</td></tr>`;
  });

  tablaHTML += "</tbody></table>";

  document.getElementById("tablaHistorico").innerHTML = tablaHTML;
}

function limpiar() {
  document.getElementById("peso_usuario").value = "";
  document.getElementById("altura_usuario").value = "";
}

