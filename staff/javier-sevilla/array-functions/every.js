/**
 * 
 * @param {*} array array The array to iterate.
 * @param {*} expression The expression to evaluate in each item of the array.
 */
function every(array, expression) { 	
    //console.log(arguments)
    if (!(array instanceof Array)) throw TypeError(array + ' is no an array');
    if (typeof expression !== 'function') throw TypeError(expression + ' is no a function')
    var boleana;
	for (var i = 0; i < array.length; i++) {    
        boleana = expression(array[i])
        if (!(boleana)) return false;        
    }
    return true;
}