var sum = function (num1,num2) { return Math.round((num1+num2)*100)/100; };
    var rest = function (num1,num2) { return Math.round((num1-num2)*100)/100; };
    var mult = function (num1,num2) { return Math.round((num1*num2)*100)/100; };
    var div = function (num1,num2) { return Math.round((num1/num2)*100)/100; };

    var num1='';
    var num2='';
    var op;

function writeRestult(x) {
    if (document.getElementById("result").innerHTML == "0") {
        document.getElementById("result").innerHTML = x;
    } else {
        document.getElementById("result").innerHTML +=x;
    }
}

function getNum () {
    if (num1==='') {
        num1 = parseFloat(document.getElementById("result").innerHTML);
        document.getElementById("result").innerHTML='0';
    } else {
        num2 = parseFloat(document.getElementById("result").innerHTML);
        document.getElementById("result").innerHTML='0';
    }
}

function doOp () {
        switch (op) {
            case 'sum': num1=sum(num1,num2); break;
            case 'rest': num1=rest(num1,num2); break;
            case 'mult': num1=mult(num1,num2); break;
            case 'div': num1=div(num1,num2); break;
        }
}

function getOp (x) {

    if (op === '') {
        op = x;
        getNum();
    } else {
        getNum();
        doOp();
        op = x;
    }
}

function endOps () {

    getNum();
    doOp();
    document.getElementById("result").innerHTML = num1;
    num1='';
    num2='';
    op='';
    
}

function reset () {
    document.getElementById("result").innerHTML = '0';
    num1='';
    num2='';
    op='';
}

function borrar () {
    var res=document.getElementById("result").innerHTML;

    res=res.slice(0,-1);
    if (res.length===0) { res = '0'; }
    document.getElementById("result").innerHTML = res;
}