function perfectNum (num) {
    let divisors = [];
    
    for (var i = 1; i < num / 2; i++) { 
        if (num % i == 0) {
            divisors.push(i);
        }
    }

    let divisorsSum = divisors.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    }, 0);

    if (!(divisorsSum === num / 2)) {
        console.log("It's not so perfect.");

        return;
    }
    
    console.log("We have a perfect number!");
}

perfectNum (6);
perfectNum (28);
perfectNum (1236498);