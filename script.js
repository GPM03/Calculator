let numA = "";
let numB = "";
let currentOperator = ""
const calculator = document.querySelector(".calculator");
const displayContainer = document.querySelector(".display-container");
const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");
const button = Array.from(document.querySelectorAll(".button"));

const clear = document.querySelector(".clear");
const switchSign = document.querySelector(".switch-sign");
const percent = document.querySelector(".percent");
const division = document.querySelector(".division");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const multiplication = document.querySelector(".multiplication");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const subtraction = document.querySelector(".subtraction");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const adition = document.querySelector(".adition");
const zero = document.querySelector(".zero");
const decimalSeparator = document.querySelector(".decimal-separator");
const deleteNum = document.querySelector(".delete");
const equals = document.querySelector(".equals");

function addDigit(string){
    if (display.textContent.search(/[A-Z]/ig) !== -1) {
        display.textContent = "";
        display.style.fontSize = "500%";
    }

    if (display.textContent.search("%") === -1) {
        let expression = display.textContent;
        display.textContent = expression + string;
    
        responsiveFontSize();
    }

}

function setNum() {
    // set numA to operate
    if (display.textContent !== "" && Number.isNaN(Number(display.textContent)) === false && numA === "") {
        numA = display.textContent;
        display.textContent = "";
        responsiveFontSize();

    // set numB to operate
    } else if (display.textContent !== "" && numB === "" && numA !== "") {
        numB = display.textContent;
        display.textContent = "";
        responsiveFontSize();
    }
}

function setOperator(operator, elem) {
    adition.classList.remove("selected");
    subtraction.classList.remove("selected");
    multiplication.classList.remove("selected");
    division.classList.remove("selected");

    if (Number.isNaN(Number(display.textContent)) === false && currentOperator === "" && display.textContent !== ""){
        currentOperator = operator;
        elem.classList.add("selected");
        setNum();
    }

    if (numA !== "") {
        currentOperator = operator;
        elem.classList.add("selected");
    }
}

function operate() {
    if (numA !== "" && numB !== "") {
        let isNumBPercent = numB.includes("%");
        let numAPercent = numA;
        let numBPercent = numB;

        numA = percentToDecimal(numA);
        numB = percentToDecimal(numB);

        numA = Number(numA);
        numB = Number(numB);

        if (currentOperator === "+") {
            if (isNumBPercent) {
                result = numA * (1 + numB);
            } else {
                result = numA + numB;
            }

        } else if (currentOperator === "-") {
            if (isNumBPercent) {
                result = numA * (1 - numB);
            } else {
                result = numA - numB;
            }

        } else if (currentOperator === "*") {
            result = numA * numB;

        } else if (currentOperator === "/"){
            if (numB === 0) {
                result = "cannot divide by zero";
                numA = "";
                console.log("a");
            } else {
                result = numA / numB;
            }
        }

        if (typeof result === "number") {
            console.log(result);
            if (result >= 1e+20 || result <= 1e-20){
                result = Number(result.toExponential(5));
            } else {
                result = Math.round(result * 100000) / 100000;
            }
            display.textContent = result;

        } else {
            display.textContent = result;
        }

        if (numAPercent.includes("%")) {
            numA = numAPercent;
        }

        if (numBPercent.includes("%")) {
            numB = numBPercent;
        }

        expressionHistory()

        numA = "";
        numB = "";
        currentOperator = "";

        responsiveFontSize();

    }
}

function responsiveFontSize() {
    let paddingLeft = parseFloat(window.getComputedStyle(displayContainer).getPropertyValue('padding-left'));
    let paddingRight = parseFloat(window.getComputedStyle(displayContainer).getPropertyValue('padding-right'));
    let totalPadding = paddingLeft + paddingRight;
    
    let displayWidth = display.scrollWidth + totalPadding - 1;

    let calculatorWidth = Math.floor(calculator.getBoundingClientRect().width * 100) / 100;

    if (displayWidth > calculatorWidth) {
        display.style.fontSize = "300%";

        displayWidth = display.scrollWidth + totalPadding - 1;

        display.scroll({
            left: displayWidth,
            behaviour: "instant"
        });

        if (displayWidth > calculatorWidth) {
            display.style.fontSize = "200%"

        }
    }

    if (display.textContent === "") {
        display.style.fontSize = "500%";
    }
}

function percentToDecimal(num) {
    if (num.search("%") !== -1) {
        num = num.slice(0, -1);
        return num = num / 100;
    } else 
        return num
}

function expressionHistory(a = numA, b = numB, operator = currentOperator, evaluation = result) {
    console.log( `${a} ${operator} ${b} = ${evaluation}`);
    
}

function equalsFunction() {
    if (currentOperator !== "") {
        setNum();
        operate();
        adition.classList.remove("selected");
        subtraction.classList.remove("selected");
        multiplication.classList.remove("selected");
        division.classList.remove("selected");
    }
}

function percentFunction() {
    if (display.textContent.search("%") === -1 && display.textContent !== "") {
        display.textContent = display.textContent + "%";
    }
}

function decimalSeparatorFunction() {
    let expression = display.textContent;

    if (expression.search("%") !== -1) {
        expression = expression.slice(0, -1);
    }

    if (Number(expression) % 1 === 0 && display.textContent.slice(-1) !== "."){
        display.textContent = display.textContent + ".";
    }
}

responsiveFontSize();

clear.addEventListener("click", () => {
    display.textContent = "";
    numA = "";
    numB = "";
    currentOperator = "";

    adition.classList.remove("selected");
    subtraction.classList.remove("selected");
    multiplication.classList.remove("selected");
    division.classList.remove("selected");

    responsiveFontSize();
});

switchSign.addEventListener("click", () => {
    let expression = display.textContent;

    if (expression.search("-") === -1 && expression !== "") {
        display.textContent = `-${expression}`;
    } else {
        display.textContent = expression.slice(1);
    }
    responsiveFontSize();
});

zero.addEventListener("click", () => {
    addDigit("0");
});
one.addEventListener("click", () => {
    addDigit("1");
});
two.addEventListener("click", () => {
    addDigit("2");
});
three.addEventListener("click", () => {
    addDigit("3");
});
four.addEventListener("click", () => {
    addDigit("4");
});
five.addEventListener("click", () => {
    addDigit("5");
});
six.addEventListener("click", () => {
    addDigit("6");
});
seven.addEventListener("click", () => {
    addDigit("7");
});
eight.addEventListener("click", () => {
    addDigit("8");
});
nine.addEventListener("click", () => {
    addDigit("9");
});

adition.addEventListener("click", () => {
    setOperator("+", adition);
});
subtraction.addEventListener("click", () => {
    setOperator("-", subtraction);
});
multiplication.addEventListener("click", () => {
    setOperator("*", multiplication);
});
division.addEventListener("click", () => {
    setOperator("/", division);
});

percent.addEventListener("click", () => {
    percentFunction();
});

equals.addEventListener("click", () => {
    equalsFunction();
});

deleteNum.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
});

decimalSeparator.addEventListener("click", () => {
    decimalSeparatorFunction();
});

window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
  
      switch (event.key) {
        case "0":
            addDigit("0");
            break;
        case "1":
            addDigit("1");
            break;
        case "2":
            addDigit("2");
            break;
        case "3":
            addDigit("3");
            break;
        case "4":
            addDigit("4");
            break;
        case "5":
            addDigit("5");
            break;
        case "6":
            addDigit("6");
            break
        case "7":
            addDigit("7");
            break;
        case "8":
            addDigit("8");
            break;
        case "9":
            addDigit("9");
            break;
        case "+":
            setOperator("+", adition);
            break;
        case "-":
            setOperator("-", subtraction);
            break;
        case "*":
            setOperator("*", multiplication);
            break;
        case "/":
            setOperator("/", division);
            break;
        case "%":
            percentFunction()
            break;
        case "Enter":
            equalsFunction();
            break;
        case "Backspace":
            display.textContent = display.textContent.slice(0, -1);
            break;
        case ".":
            decimalSeparatorFunction();
        break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
  
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true,
  );

button.forEach(item => {
    // update pointer position
    item.addEventListener("click", (event) => {
        const pointer = item.querySelector(".pointer");

        let parentOffsetTop = item.offsetTop;
        let parentOffsetLeft = item.offsetLeft;

        pointer.style.top = `${event.pageY - parentOffsetTop}px`;
        pointer.style.left = `${event.pageX - parentOffsetLeft}px`;
    })

    // play animation on click
    item.addEventListener("click", () => {
        const pointer = item.querySelector(".pointer");
    
        pointer.classList.remove("button-animation");
        pointer.offsetWidth;        
        pointer.classList.add("button-animation");
    })
})