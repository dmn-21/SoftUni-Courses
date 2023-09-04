function solve (num) {
    const arr = Array.from(String(num), Number);
    console.log(arr.reduce((a, b) => a + b));
}
solve(245678);