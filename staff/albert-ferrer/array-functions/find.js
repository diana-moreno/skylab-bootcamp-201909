
function find (array, expression) {
    if(!(array instanceof Array)) throw TypeError('no es una array')
    if(array.length === 0) throw Error('el array está vacía')
    if(typeof(expression) !== 'function') throw TypeError('no es una función')

    for(var i = 0; i < array.length; i++){ 
        if(expression(array, i)) {
            return array[i];
        }
    }
}