const currentOperandElement =
    document.getElementById("currentOperand");

const previousOperandElement =
    document.getElementById("previousOperand");

const buttons =
    document.querySelectorAll("button");

let currentOperand = "";
let previousOperand = "";
let operation = null;

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        if(!isNaN(value) || value === "."){

            appendNumber(value);
        }

        else if(
            value === "+" ||
            value === "-" ||
            value === "×" ||
            value === "÷" ||
            value === "%" ||
            value === "^"
        ){

            chooseOperation(value);
        }

        else if(value === "√"){

            squareRoot();
        }

        else if(value === "="){

            compute();
        }

        else if(value === "AC"){

            clearCalculator();
        }

        else if(value === "DEL"){

            deleteNumber();
        }

        updateDisplay();
    });
});

function appendNumber(number){

    if(number === "." &&
       currentOperand.includes(".")){

        return;
    }

    currentOperand += number;
}

function chooseOperation(selectedOperation){

    if(currentOperand === "") return;

    if(previousOperand !== ""){

        compute();
    }

    operation = selectedOperation;

    previousOperand =
        currentOperand;

    currentOperand = "";
}

function compute(){

    let computation;

    const prev =
        parseFloat(previousOperand);

    const current =
        parseFloat(currentOperand);

    if(isNaN(prev) || isNaN(current)){

        return;
    }

    switch(operation){

        case "+":
            computation = prev + current;
            break;

        case "-":
            computation = prev - current;
            break;

        case "×":
            computation = prev * current;
            break;

        case "÷":

            if(current === 0){

                computation = "Error";
            }
            else{

                computation = prev / current;
            }

            break;

        case "%":
            computation = prev % current;
            break;

        case "^":
            computation = Math.pow(prev,current);
            break;

        default:
            return;
    }

    currentOperand =
        computation.toString();

    operation = null;

    previousOperand = "";
}

function squareRoot(){

    if(currentOperand === "") return;

    currentOperand =
        Math.sqrt(parseFloat(currentOperand))
        .toString();
}

function clearCalculator(){

    currentOperand = "";

    previousOperand = "";

    operation = null;
}

function deleteNumber(){

    currentOperand =
        currentOperand.slice(0,-1);
}

function updateDisplay(){

    currentOperandElement.innerText =
        currentOperand || "0";

    if(operation != null){

        previousOperandElement.innerText =
            previousOperand + " " + operation;
    }
    else{

        previousOperandElement.innerText =
            previousOperand;
    }
}