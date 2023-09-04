function solve (arr) {
    let sortedArr = arr.sort((a, b) => a - b);
    let resultArr = [];
    let length = arr.length;

    for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
            resultArr.push(sortedArr.shift());
        }
        else {
            resultArr.push(sortedArr.pop());
        }    
    }

    console.log(resultArr);
}
solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);