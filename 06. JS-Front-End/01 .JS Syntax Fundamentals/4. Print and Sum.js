function solve (num1, num2) {
    let arr = [];
    let sum = 0;
    for (var i = num1; i <= num2; i++) {
        arr.push(i);
        sum += i;
    }

    console.log(arr.join(' '));
    console.log(`Sum: ${sum}`);
}
solve(5, 10);
solve(0, 26);
solve(50, 60);