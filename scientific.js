let expressionDiv = document.getElementById('expression');
let resultDiv = document.getElementById('result');
let memory = 0;
let degMode = true; // DEG by default

function append(value) {
    if (expressionDiv.innerText === "0") expressionDiv.innerText = value;
    else expressionDiv.innerText += value;
}

function appendFunction(func) {
    switch(func) {
        case 'sin': expressionDiv.innerText += 'sin('; break;
        case 'cos': expressionDiv.innerText += 'cos('; break;
        case 'tan': expressionDiv.innerText += 'tan('; break;
        case 'log': expressionDiv.innerText += 'log('; break;
        case 'ln': expressionDiv.innerText += 'ln('; break;
        case '√': expressionDiv.innerText += '√('; break;
        case 'x²': expressionDiv.innerText += '**2'; break;
        case 'x³': expressionDiv.innerText += '**3'; break;
    }
}

function clearAll() {
    expressionDiv.innerText = '0';
    resultDiv.innerText = '0';
}

function backspace() {
    let exp = expressionDiv.innerText;
    expressionDiv.innerText = exp.slice(0, -1);
    if (expressionDiv.innerText === '') expressionDiv.innerText = '0';
}

function toggleDegRad() {
    degMode = !degMode;
    alert(degMode ? "Degree Mode" : "Radian Mode");
}

// Memory functions
function memoryClear() { memory = 0; }
function memoryRecall() { append(memory); }
function memoryAdd() { memory += parseFloat(resultDiv.innerText) || 0; }
function memorySubtract() { memory -= parseFloat(resultDiv.innerText) || 0; }

function calculate() {
    let exp = expressionDiv.innerText;
    try {
        // Replace functions for JS evaluation
        exp = exp.replace(/sin\(/g, `Math.sin(`)
                 .replace(/cos\(/g, `Math.cos(`)
                 .replace(/tan\(/g, `Math.tan(`)
                 .replace(/log\(/g, `Math.log10(`)
                 .replace(/ln\(/g, `Math.log(`)
                 .replace(/√\(/g, `Math.sqrt(`);

        // DEG to RAD conversion
        if (degMode) {
            exp = exp.replace(/Math\.sin\(([^)]+)\)/g, (match, p1) => `Math.sin(${p1}*Math.PI/180)`);
            exp = exp.replace(/Math\.cos\(([^)]+)\)/g, (match, p1) => `Math.cos(${p1}*Math.PI/180)`);
            exp = exp.replace(/Math\.tan\(([^)]+)\)/g, (match, p1) => `Math.tan(${p1}*Math.PI/180)`);
        }

        let result = eval(exp);
        resultDiv.innerText = result;
    } catch (err) {
        resultDiv.innerText = "Error";
    }
}
