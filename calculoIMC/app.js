let peso_Maximo = 250; // kg
let peso_Minimo = 12.2; // promedio kg niño de 2 años
let estatura_Maxima = 2.50; // mts
let estaruta_minima = 0.86; // promedio mts niño de 2 años


function asignarTextoElemento(id, texto) {
    let elementoHTML = document.getElementById(id);
    elementoHTML.innerText = texto;
    return;
}

window.addEventListener("keydown", (e)=>{
    if (e.keyCode === 13) {
        calcularIMC();
    }
}
)

function calcularIMC() {
    let peso = document.getElementById("peso_usuario").value;
    let estatura = document.getElementById("altura_usuario").value;
    if (peso > peso_Maximo || peso < peso_Minimo) {
        alert("Peso fuera de rango");
        return;
    }
    if (estatura > estatura_Maxima || estatura < estaruta_minima) {
        alert("Estatura fuera de rango");
        return;
    }

    let imc = peso / (estatura * estatura);

    if (imc < 18.5) {
        asignarTextoElemento('resultado',"Bajo peso");
    } else if (imc >= 18.5 && imc < 25) {
        asignarTextoElemento('resultado',"Peso normal");
    } else if (imc >= 25 && imc < 30) {
        asignarTextoElemento('resultado',"Sobrepeso");
    } else if (imc >= 30) {
        asignarTextoElemento('resultado',"Obesidad");
    }
    limpiar();
}

function limpiar(){
    document.getElementById("peso_usuario").value = "";
    document.getElementById("altura_usuario").value = "";
}