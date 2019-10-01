// NORMAL VERSION

// 1. Welcome to the page + ask name. Also, information about all the flights uploaded.
// 2. Friendly information to the costumer (from/to/price/connection).
// 3. Average cost of today's flights.
// 4. List of flights that have connections.
// 5. Last 5 flights final destination.
// 6. Final function that executes the full program.


// 1.

function welcome() {
    let userName = "";
    
    userName = prompt("Hi, welcome to Skylab Airlines! What's your name?");
    
    userName ?  console.log(`Hello, ${userName}!`) : 
                console.log("Hello!");

    }

welcome();

var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];


// 2.

function allFlights(x){
    for(let i= 0; i < x.length; i++){ 
        if(x[i].scale){
            connection = "Flight with connection";
          } else {
            connection = "Direct flight";
          };
          console.log(`Flight from ${x[i].from} to ${x[i].to}, with a cost of: ${x[i].cost} dollars. ${connection}.`)
        }
    }
    
allFlights(flights);


// 3.

console.log("");
let sum = 0;
function averageCost(y){
    for(let i= 0; i < y.length; i++) {
        sum += y[i].cost
        };
        let average = sum / y.length;
        
       console.log(`Today's flights average cost is ${average.toFixed(0)} dollars.`)    

}

averageCost(flights);


// 4. 

console.log("");   /* this one is just to give an extra line and read it better*/
console.log("List of flights with connection:")
function connectionFlights(z){
    for(let i= 0; i < z.length; i++){
  if(z[i].scale){
    console.log(`Flight from ${z[i].from} to ${z[i].to}, with a cost of: ${z[i].cost} dollars.`);
  }
}
}
connectionFlights(flights);


// 5.

console.log("");   /* this one is just to give an extra line and read it better*/
console.log("Last 5 flights final destinations:")
function lastFlights(w){
  for(let i= 0; i < 5; i++){
         console.log(`${w[flights.length - 1 - i].to}`);
     
}
}
lastFlights(flights);

// 6.

function airlines() {
  welcome();
  allFlights(flights);
  averageCost(flights);
  connectionFlights(flights);
  lastFlights(flights);

};



//  PRO VERSION

/*  First we must show the normal function (to see all the information of the flights) and then make a question 
to know if the person is USER or ADMIN, in order to show different options in each case. */
// 1. If ADMIN, option to create flights (limit 15 flights, show an alert if the number is higher than 15)
// 2. If ADMIN, option to delete flights using the ID.
/* 3. If USER, possibility to search by price (higher, lower or equal) and finally using the ID 
the program will show the following message: "Thanks for your buy, come back soon!" */
// 4. Final function that executes the full program.




// 4. This is the final step.. 


function airlinesPro() {
  airlines();
  var userIdentity= prompt(('¿Are you ADMIN or USER?')).toUpperCase();
  switch(userIdentity){
      case 'ADMIN':
      /* here we would have the functions for ADMIN */
          break;
      case 'USER':
      /* here we would have the functions for USER */
          break;
  }
};

airlinesPro();
 
// 1. 

function createFlight() {
  if(flights > 15){
    alert("You have reached the max number of flights! If you want to see more, you must delete any of your choices.") ;
  }
  else {
    var addFlight = prompt("Do you want to add a flight? YES or NO?").toUpperCase();


  }
  
}

