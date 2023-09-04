function addAndSubtract (firstNum, secondNum, thirdNum) {
    let sum = (a, b) => a + b;

    let subtract = (mySum, num) => mySum - num;

    console.log(subtract(sum(firstNum, secondNum), thirdNum));
}

addAndSubtract(23, 6, 10);
addAndSubtract(1, 17, 30);