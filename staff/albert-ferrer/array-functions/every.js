/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


/**
 * 
 * @param {*} array 
 * @param {*} expression 
 */


 function every (array,expression){
    var condicion = true;

    for (let i= 0; i < array.length; i++){
       console.log(array[i]);
        if (!expression(array[i])){

            condicion = false;
            break;
        }
    
    }
    return condicion;
 }

 every(numbers,comprobarPares);


 