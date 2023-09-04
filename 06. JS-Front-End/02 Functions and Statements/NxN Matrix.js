function Matrix (num) {
    let matrix = new Array(num).fill(new Array(num).fill(num)).forEach(row => console.log(row.join(' ')));
}

Matrix(3);
Matrix(7);