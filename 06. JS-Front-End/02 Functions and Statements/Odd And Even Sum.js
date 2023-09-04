function sum (num) {
    let numbers = Array.from(String(num), Number);
    let odd = 0;
    let even = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            even += numbers[i];
        } else {
            odd += numbers[i];
        }
    }

    console.log(`Odd sum = ${odd}, Even sum = ${even}`);
}

sum (1000435); 
sum (3495892137259234); 