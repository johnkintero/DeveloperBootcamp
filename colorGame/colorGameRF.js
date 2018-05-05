var numCuadrados = 6;
var colors = [];
var colorEscogido;
var cuadrados = document.querySelectorAll(".cuadrado");
var colorMostrar = document.getElementById("colorDisplay");
var mensajeMostar = document.querySelector("#mensaje");
var h1 = document.querySelector("h1");
var botonReset = document.querySelector("#reset");
var modoBotones = document.querySelectorAll(".modo");

init();

function init(){
    setupModoBotones();
    setupCuadrados();
    reset();
}

function setupModoBotones(){
    //modo de los botones eventos listener
    for(var i = 0; i < modoBotones.length; i++){
        modoBotones[i].addEventListener("click", function(){
            modoBotones[0].classList.toggle("seleccionado");
            modoBotones[1].classList.toggle("seleccionado");
            //this.classList.add("selecionado");
            this.textContent === "Facil" ? numCuadrados = 3 : numCuadrados = 6;
            reset();
        });
    }
}

function setupCuadrados(){
    for(var i = 0; i < cuadrados.length; i++){
        //asignar colores a los cuadrados
        cuadrados[i].style.backgroundColor = colors[i];
        //agregar los listeners a los cuadrados
        cuadrados[i].addEventListener("click", function(){
            //guarda el color seleccionado
            var colorSeleccionado = this.style.backgroundColor
            //compara con el color escogido
            if(colorSeleccionado === colorEscogido){
                mensajeMostar.textContent = "Correcto!!";
                botonReset.textContent = "Jugar de Nuevo?";
                cambiaColores(colorSeleccionado);
                h1.style.backgroundColor = colorSeleccionado;
            }else{
                this.style.backgroundColor = "#232323";
                mensajeMostar.textContent = "Intenta nuevamente!!";
            }
        });
    }
}

function reset(){
     //generar los nuevos colores
     colors = generarColoresAleatorios(numCuadrados);
     //Seleccionar un nuevo color a buscar
     colorEscogido = escogerColor();
     //cambiar el texto del color a buscar
     colorMostrar.textContent = colorEscogido;
     mensajeMostar.textContent = "";
     //cambiar los colores de los cuadrados
     for(var i = 0; i < cuadrados.length; i++){
         if(colors[i]){
            cuadrados[i].style.display = "block";
            cuadrados[i].style.backgroundColor = colors[i];
         } else {
            cuadrados[i].style.display = "none";
         }
     }
     h1.style.backgroundColor = "steelblue"; 
}

/**
 * Funcion que cambia el color de todos los cuadrados
 * @param {string} color 
 */
function cambiaColores(color){
    //ciclo en los cuadrados
    for(var i = 0; i < cuadrados.length; i++){
        //cambia cada cuadrado con el color entregado
        cuadrados[i].style.backgroundColor = color;
    }
}
/**
 * Funcion que genera un aleatorio entre el numero de cuadrados
 */
function escogerColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}
/**
 * Funcion que asigna colores aleatorios a un arreglo de acuerdo al numero entregado
 * devuelve un arreglo
 * @param {number} num 
 */
function generarColoresAleatorios(num){
    // crear un arreglo
    var arr = [];
    //agregar los colores al arreglo
    for(var i = 0; i < num; i++){
        //obtener el color aleatorio y agregar al arreglo
        arr.push(colorAleatorio());
    }
    //retornar el arreglo
    return arr;
}
/**
 * Genera color aleatorio
 */
function colorAleatorio(){
    //seleccionar rojo R de 0 - 255
    var r = Math.floor(Math.random() * 256);
    //seleccionar verde G de 0 - 255
    var g = Math.floor(Math.random() * 256);
    //seleccionar azul B de 0 - 255
    var b = Math.floor(Math.random() * 256);
    return "rgb("+ r + ", " + g + ", " + b + ")";
}

botonReset.addEventListener("click", function(){
    this.textContent = "Nuevos Colores";
    reset();
});