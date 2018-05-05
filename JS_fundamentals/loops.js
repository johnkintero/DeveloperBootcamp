var divloopswhile = document.getElementById('loopwhile');
var divloopswhileString = document.getElementById('loopWhileString');

var count = 1;
while(count < 6){
    divloopswhile.innerHTML =  divloopswhile.innerHTML + "<br> cuenta: "+ count;
    count++;
}
var str = "John";
var count1 = 0;
while(count1 < str.length){
    divloopswhileString.innerHTML =  divloopswhileString.innerHTML + "<br> letra "+ count1 + ": " + str[count1];
    count1++;
}

/**
 * Funcion para comparar si todos los elementos del arreglo son iguales.
 * @param {*} arr 
 */
function isUniforme(arr){
    var ini = arr[0];
    var res = true;
    arr.forEach(function(i){
        if(ini !== i){
            res = false;
            }
        });
    console.log(res);
    }
/**
 * Funcion que suma todos los valores de un arreglo numerico
 * @param {*} arr 
 */
function sumArray(arr){
    var res = 0;	
    arr.forEach(function(i){
        res += i;
        });
    console.log(res);
    }

    /**
     * Funcion que devuelve el maximo valor en un arreglo de numeros
     * @param {*} arr 
     */
    function max(arr){
        var ini = arr[0];
        arr.forEach(function(i){
        if(i > ini){ini = i}
        });
        console.log(ini);
        };    
/********************************************************************
 * Funcion definiendo un forEach personalizado
 * @param {*} arr 
 * @param {*} func 
 ********************************************************************/
var colors = ["red","blue","yelow"];
function myForEach(arr,func){
    //loop
    for(var i = 0; i < arr.length; i++){
        func(arr[i]);
    }
}
//asi se ejecuta
myForEach(colors,function(color){
    console.log(color);
});

/**
 * AGREGAR methods a un arreglo
 * CAMBIA RESPECTO A LA DEFINICION DE LA FUNCION Y YA NO SE LE PASA EL ARREGLO COMO PARAMETRO
 * SINO QUE SE REEMPLAZA INTERNAMENE CON EL USO DE this.
 */
 Array.prototype.myForEach = function(func){
  for(var i = 0; i < this.length; i++){
   func(this[i]);
   }
  }
 // asi se ejecuta
 colors.myForEach(function(color){
    console.log(color);
    });
 /*********************************************************************
  ********************************************************************/
