/**
 * El queryselectorall recupera todos los botones de la pagina y los
 * guarda en un arreglo.
 */
var button = document.querySelectorAll("button");
console.log(button);
var isPurple = false;
/**
 * Ejemplo cambiado el estilo directamente sobre la etiqueta
 */
button[0].addEventListener("click",function(){
    if(isPurple){
        document.body.style.background = "white";
    } else {
        document.body.style.background = "purple";
    }
    isPurple = !isPurple; //cambia entre true y false;
});
/**
 * Ejemplo colocando y quitando una clase al hacer click
 */
button[1].addEventListener("click", function(){
    document.body.classList.toggle("purple");
});

var lis = document.querySelectorAll("li");

for(var i = 0; i< lis.length; i++){
    lis[i].addEventListener("mouseover", function(){
        this.style.color = "green";
    });
    lis[i].addEventListener("mouseout", function(){
        this.style.color = "black";
    });
    lis[i].addEventListener("click", function(){
        this.classList.add("done");
    });
}

