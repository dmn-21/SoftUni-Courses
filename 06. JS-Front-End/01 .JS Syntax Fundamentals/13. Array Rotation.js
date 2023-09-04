function solve (arr, rotations) {
    for (var i = 0; i < rotations; i++) {
        let curr = arr.shift();
        arr.push(curr);
    }
    console.log(arr.join(' '));
}
solve([51, 47, 32, 61, 21], 2);