let operator = '';
let oldValue = '';
let currentValue = '';

var operatorsArr = [];
var operandsArr = [];


document.addEventListener("DOMContentLoaded", function() {
    let clearButton = document.querySelector(".all-clear");
    let deleteButton = document.querySelector(".delete");
    let equalButton = document.querySelector(".equal");
    let decimalButton = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let oldScreen = document.querySelector(".old-operand");
    let currentScreen = document.querySelector(".current-operand");
    //looping through all the numbers (it's an array)
    //them we're getting the text content of a button that has a number class
    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent);
        //showing the value of a clicked button on the current screen
        currentScreen.textContent = currentValue;
    }))
    //we're doing the same for operators
    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent);
        //showing the old value and the operator used
        oldScreen.textContent = oldValue + " " + operator;
        if(Array.isArray(operandsArr)) operandsArr.push(oldValue);
        console.log(operandsArr);
        if(Array.isArray(operatorsArr)) operatorsArr.push(operator);
        console.log(operatorsArr);
        //making the current screen empty again
        currentScreen.textContent = currentValue;
    }))

    clearButton.addEventListener("click", function(){
        oldValue ='';
        currentValue ='';
        operator = '';
        oldScreen.textContent = '';
        currentScreen.textContent = '';
        operatorsArr = [];
        operandsArr = [];
    })

    equalButton.addEventListener("click", function(){
        if(Array.isArray(operandsArr)) operandsArr.push(currentValue);
        console.log(operandsArr);
        result = operate();
        operatorsArr = [];
        operandsArr = [result];
    })
})

function handleNumber(num){
    //preventing from long numbers 
    if(currentValue.length <= 10){
    currentValue += num;
    }
}

function handleOperator(op){
    //updating the global operator to the new one
    operator = op;
    //showing two rows correctly
    oldValue = currentValue;
    currentValue = '';
}

function calculate(numArr,opArr)
//recursive function
{
    if(!Array.isArray(numArr)) return 0;
    if (numArr.length === 0) return 0;
    if(!Array.isArray(opArr)) return numArr[0];
    if (opArr.length === 0) return numArr[0];

    for (let i = 0; i< opArr.length; i++)
    {
        if (opArr[i]==="/")
        {
            newnum = operate("/",numArr[i],numArr[i+1]);
            if (newnum === "Error") 
                return "Error";
            else
                {
                    let newNumArr = replaceArrElements(numArr,i,newnum);
                    let newOpArr = replaceArrElements(opArr,i);
                    return calculate(newNumArr,newOpArr);
                }
        }
    }
    for (let i = 0; i< opArr.length; i++)
    {
        if (opArr[i]==="*")
        {
            newnum = operate("*",numArr[i],numArr[i+1]);
            let newNumArr = replaceArrElements(numArr,i,newnum);
            let newOpArr = replaceArrElements(opArr,i);
            return calculate(newNumArr,newOpArr);
        }
    }
    
    for (let i = 0; i< opArr.length; i++)
    {
        if (opArr[i]==="+")
        {
            newnum = operate("+",numArr[i],numArr[i+1]);
            let newNumArr = replaceArrElements(numArr,i,newnum);
            let newOpArr = replaceArrElements(opArr,i);
            return calculate(newNumArr,newOpArr);
        }
    }

    for (let i = 0; i< opArr.length; i++)
    {
        if (opArr[i]==="-")
        {
            newnum = operate("-",numArr[i],numArr[i+1]);
            let newNumArr = replaceArrElements(numArr,i,newnum);
            let newOpArr = replaceArrElements(opArr,i);
            return calculate(newNumArr,newOpArr);
        }
    }
    
    return "Error";
}

function replaceArrElements(arr,ind,newElement = "")
{
    if(!Array.isArray(arr)) return arr;

    let newarr = arr.slice(0,ind);
    if (newElement !== "") newarr.push(newElement);
    newarr.push(arr.slice(ind-arr.length));
}

function operate(op, num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);

    switch (op) {
        case "+":
            num1 += num2;
            break;
        case "-":
            num1 -= num2;
            break;
        case "/":
            if(num2 === 0) 
                num1 = "Error";
            else 
                num1 /= num2;
            break;
        case "*":
            num1 *= num2;
            break;    
        default:
            break;
    }
    if (num1 != "Error") 
        num1 = mathNumber(num1);
        num1 = num1.toString();
    return num1;    
}

function mathNumber(num){
    return Math.round(num *1000) /1000;
}