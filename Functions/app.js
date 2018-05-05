var btnPar = document.getElementById("btnEsPar");
var btnFactorial = document.getElementById("btnEsFactorial");
var btnStr = document.getElementById("btnreplace");
btnFactorial.addEventListener("click",calcFact);
btnPar.addEventListener("click", esPar);
btnStr.addEventListener("click", functreplace);
var num = 0;

function optenerDato(){
    var numtxt = document.getElementById("txtnum");
    num = numtxt.value;
}

//Valida si es par
function esPar(){
    optenerDato();
    if(num % 2 === 0){
        alert("Es Par");
        //return "Es par";
    }
    else{
        alert("Es Impar");
        //return "Es impar";
    }
}

//valida factorial
function calcFact(){
    optenerDato();
    if (num <= 0)
    {
        alert("el factorial es: " + 1);

    }
    else {
        var calculo = num;
        for(var i = num-1; i >= 1; i--)
        {
            calculo = calculo * i;
            console.log(calculo);
            
        }
        alert("el factorial es: " + calculo);
    }
    
    
}

//replace string
function functreplace(){
    var str = document.getElementById("txtstr");
    var res = str.value;
    alert("la cadena es : "+ res.replace("-","_")); 
}

