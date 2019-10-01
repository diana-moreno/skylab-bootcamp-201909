//  BINGO PROJECT

// 1) The program will ask for the name of the user.     
// 2) During the 1st turn it will show 5 numbers (excluding the 0). 
// 3) Generation of random number each new turn.  
// 4) To advance to the next turn the user should confirm and a new number will appear.   
/* 5) If the number shown match with any of your carton, this number will change for an "x".
      The carton will be shown at the end of every turn. The program will ask the user at the beginning of each turn if they want to continue. */

// PRO version
// 6) When a complete line of numbers have changed for "X" the program will show the message: "LINE!", after this the execution of the program will continue. 
// 7) The program will finish when all the numbers of the carton have changed by "X".




// 1) 

var lastNumber = getNumber(); 
var bingoNumber = lastNumber;

function welcome() {
  let userName = "";
  
  userName = prompt("Hi, welcome to Skylab Bingo! What's your name?");
  
  userName ?  alert(`Hello, ${userName}! Here you have your carton!`) : 
              alert("Hello! Here you have your carton!");

  };



// 2)


var firstNumbers = [
    { num: 13, integer: true }, { num: 23, integer: true }, { num: 34, integer: true }, { num: 43, integer: true }, { num: 51, integer: true }, 
  ];

  function carton(x){
    console.log("Your carton is:")
    for(let i= 0; i < x.length; i++){
      if(x[i].integer){
        console.log(`${x[i].num}`);
      }
  }
};



// 3)


function getNumber() {
  return Math.floor(Math.random() * 54 + 1)
};

// generar numeros que no sean repetidos..

// 4)


function anotherNumber(){       
var lastNumber = getNumber();          
var message;
var option = confirm ("Next number?");
if (option === true) {
  alert(`Number: ${lastNumber}`);
  console.log(`Number generated: ${lastNumber}`)
  match(firstNumbers, lastNumber);
}

else { 
  playAgain();
}

};



// 5)


function match(firstNumbers, lastNumber) {

    for (let i in firstNumbers){
    if(firstNumbers[i] === lastNumber) {
      firstNumbers[i] = "x";
      alert("We have this number, YEES!!")
      foundNumber();
    }

    else {
      console.log("The number don't match with any of your numbers")
      anotherNumber();
    }
    } 
};






// Rest of the program functions


function bingo() {
    welcome()
    carton(firstNumbers)
    anotherNumber()
};
  
function foundNumber() {

  carton(firstNumbers)
  anotherNumber()
};

function playAgain() {
    newGame = confirm("Do you want to play again?")
    if(newGame === true) {
    bingo();

    } 
    else {
    alert("Thanks for playing! See you soon!!");
    }
};



bingo();