function solve(num) {
    let arr = Array.from(String(num), Number);
    let isTrue = false;
    for (let i = 0; i < arr.length; i++) { 
        if (arr[i] === arr[i + 1]) {
            isTrue = true;
        }
        else if (i === arr.length - 1) {
            isTrue = true;
            break;
        }
        else {
            isTrue = false;
            break;
        }
    }
    console.log(isTrue);
    console.log(arr.reduce((a, b) => a + b));
}
solve(2222222);
solve(1234);