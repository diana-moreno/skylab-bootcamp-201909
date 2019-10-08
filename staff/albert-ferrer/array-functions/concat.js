/**
 * Used to merge two or more arrays. Not change the existing arrays, but instead returns a new array.
 * 
 * @param {Array} array 
 *  
 * 
 */

function concat(x) {
    var arrays = x;
    var contador = x.length;
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] instanceof Array) {
            for (let j = 0; j < arguments[i].length; j++) {
                arrays[contador] = arguments[i][j];
                contador++;
            }

        } else {
            arrays[contador] = arguments[i];
            contador++;

        }
    }
}

