numbers = [1,2,3,4,5];

function unshift(array){ 
    for (var i = 4; i > arguments.length; i--){
        array[arguments.length+1]=array[i];
    }
}
unshift(numbers, 6);