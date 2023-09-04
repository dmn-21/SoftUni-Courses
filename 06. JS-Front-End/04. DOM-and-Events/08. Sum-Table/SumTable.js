function sumTable() {
    let evenTds = Array.from(document.querySelectorAll('td:nth-child(even)'));
    let sum = document.getElementById('sum');
    sum.textContent = 0;
    let result = 0;

    for (const td of evenTds) {
        result += Number(td.textContent);
        console.log(td.textContent);
    }

    sum.textContent = result;

    console.log(sum);
}