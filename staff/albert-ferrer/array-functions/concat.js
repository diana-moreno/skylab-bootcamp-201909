/**
 * Used to merge two or more arrays. Not change the existing arrays, but instead returns a new array.
 * 
 * 
 *  
 * 
 */

array1 = ['a', 'b', 'c'];
array2 = ['d', 'e', 'f'];
array3 = ['g', 'h', 'i'];
array4 = [12,45];
/*
function concat(x,y,z,e,f) {
    var arrays = x;
    var contador= x.length;
    for (let j = 0; j < y.length; j++) {
        arrays[contador] = y[j];
        contador++;
    }

    return arrays;
}
concat(array1,array2);


function concat(x) {
    var arrays = x;
    var contador = x.length;
    for (let i = 1; i < arguments.length; i++) {
        for (let j = 0; j < arguments[i].length; j++) {
            arrays[contador] = arguments[i][j];
            contador++;
        }
    }
    return arrays;
}
concat(array1, array2, array3);
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

concat(array1, array2, array3, array4);