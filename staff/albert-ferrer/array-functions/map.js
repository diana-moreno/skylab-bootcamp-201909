/**
 * creates a new array with the results of calling a provided function on every element in the calling array.
 * 
 * @param {Array} array Array of elements to convert.
 * 
 * @param {expression} function Function that applies the changes
 * 
 * @returns {newArray} Array with the changes saved.
 * 
 */



 function map(array,expression){
    newAr = [];

    for(let i = 0; i < array.length; i++){
        newAr[i]=expression(array[i])

    }
    
    return newAr;
 }






