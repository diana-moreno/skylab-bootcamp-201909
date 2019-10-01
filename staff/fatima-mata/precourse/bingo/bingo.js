var bingoCard = [
    { number: 6, matched: false },
    { number: 7, matched: false },
    { number: 10, matched: false },
    { number: 20, matched: false },
    { number: 22, matched: false }
];
var nombreJugador = '';
var turno = 0;
var bola = [];

bingo();

function bingo() {
    preguntaNombre();
    mostrarCarton();
    siguienteTurno();
}

//Pregunta el nombre al jugador

function preguntaNombre() {
    nombreJugador = prompt('Por favor, introduzca su nombre');
    alert('Hola, ' + nombreJugador + ' bienvenido a BINGO GAME!');
}

//Muestra el cartón del bingo

function mostrarCarton() {
    let carton = '';
    let numero = null;
    for (let i = 0; i < bingoCard.length; i++) {
        numero = bingoCard[i];
        if (numero['matched']) {
			if (i < bingoCard.length -1){
				carton += ' X, ';
			}else{
				carton += ' X ';
			}
        } else {
			if (i < bingoCard.length -1){
				carton += numero['number'] + ', ';
			}else{
				carton += numero['number'] + ' ';
			}
        }
    }
    console.log('Este es su cartón: ' + carton);
    alert('Este es su cartón: ' + carton);
}

//Contabiliza el siguiente turno y pregunta si se desea iniciar un nuevo turno 

function siguienteTurno() {
    turno++;
    confirm('¿Desea iniciar un nuevo turno?') ? sacarBola() : alert('ciao bell@!');
}

//Crea un número aleatorio y llama a la función comprobarBola

function sacarBola() {
	let numeroRandom = 0;
	do{ 
		numeroRandom = Math.floor(Math.random() * 30) + 1;		
	} while(bola.indexOf(numeroRandom) !== -1);
	bola.push(numeroRandom);
    console.log('El número que ha salido del bombo es: ' + numeroRandom);
    alert('El número que ha salido del bombo es: ' + numeroRandom);
    comprobarBola(numeroRandom);
}

//Comprueba si el número extraído está en el cartón y llama a las funciones línea o siguienteTurno.

function comprobarBola(numeroRandom) {
    let numero = null;
    for (let i = 0; i < bingoCard.length; i++) {
        numero = bingoCard[i];
        if (numero['number'] == numeroRandom) {
            numero['matched'] = true;
            console.log('Enhorabuena!!! El número: ' + numero['number'] + ' está en su cartón');
            alert('Enhorabuena!!! El número: ' + numero['number'] + ' está en su cartón');
            mostrarCarton();
        }
    }
    if (linea()) {
        alert('LINEA!!!');
        alert('Ha completado el cartón en ' + turno + ' turnos.');
        confirm('Desea volver a jugar?') ? continuar() : alert('ciao bell@!!!')
    } else {
        siguienteTurno();
    }
}

//Comprueba que se ha hecho línea

function linea() {
    let contadorX = 0;
    let numero = null;
    let retorno = false;
    for (let i = 0; i < bingoCard.length; i++) {
        numero = bingoCard[i];
        if (numero['matched']) {
            contadorX++;
        }
    }
    if (contadorX == bingoCard.length) {
        retorno = true;
    }
    return retorno;
}

// Si se quiere continuar el juego, inicializa bingoCard y llama a la función bingo

function continuar() {
    let numero = null;
    for (let i = 0; i < bingoCard.length; i++) {
        numero = bingoCard[i]; 
        numero['matched'] = false;
        }
    bingo();
}





