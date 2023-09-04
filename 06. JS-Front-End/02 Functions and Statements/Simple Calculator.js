function calculator (firstNum, secondNum, operator) {
    let multiply = (a, b) => a * b;
    let divide = (a, b) => a / b;
    let add = (a, b) => a + b;
    let subtract = (a, b) => a - b;
    
    let operationMap = {
        multiply,
        divide,
        add,
        subtract
    }


    console.log(operationMap[operator](firstNum, secondNum));
}
calculator (5, 5, 'multiply');
calculator (40, 8, 'divide');
calculator (12, 19, 'add');
calculator (50, 13, 'subtract');