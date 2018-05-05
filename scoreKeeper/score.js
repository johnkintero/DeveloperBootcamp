var p1Button = document.getElementById("p1");
var p2Button = document.querySelector("#p2");
var p1Score = 0;
var p2Score = 0;
var p1display = document.querySelector("#p1display");
var p2display = document.querySelector("#p2display");
var resetBtn = document.querySelector("#reset");
var gameOver = false;
var winningScore = 5;
var winningScoreDisplay = document.querySelector("p span");
var numInput = document.querySelector("input");
//esta forma sirve tambien
//var bumInput = document.querySelector("input[type ='number']");
var p = document.querySelector("p");

p1Button.addEventListener("click", function(){
    if(!gameOver){
        p1Score++;
        if(p1Score === winningScore){
            p1display.classList.add("winner");
            gameOver = true;
        }
        p1display.textContent = p1Score;
    }
    
});

p2Button.addEventListener("click", function(){
    if(!gameOver){
        p2Score++;
        if(p2Score === winningScore){
            p2display.classList.add("winner");
            gameOver = true;
        }
        p2display.textContent = p2Score;
    }
});

resetBtn.addEventListener("click",function(){
    reset();
});

numInput.addEventListener("change",function(){
    winningScoreDisplay.textContent = this.value;
    winningScore = Number(this.value);
    reset();
});

function reset (){
    p1Score = 0;
    p2Score = 0;
    p1display.textContent = p1Score;
    p2display.textContent = p2Score
    p1display.classList.remove("winner");
    p2display.classList.remove("winner");
    gameOver = false;
}