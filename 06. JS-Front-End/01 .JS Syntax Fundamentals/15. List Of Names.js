function solve (arr) {
    arr.sort();

    for (let i = 1; i <= arr.length; i++) {
        console.log(`${i}.${arr[i - 1]}`);   
    }
}
solve(["John",
"Bob",
"Christina",
"Ema"]
);