function orders (product, quantity) {
    let coffee = 1.50;
    let water = 1.00;
    let coke = 1.40;
    let snacks = 2.00;
    let totalPrice = 0;

    if (product === "coffee") {
        totalPrice = coffee * quantity;
        console.log(totalPrice.toFixed(2));
    } else if (product === "water") {
        totalPrice = water * quantity;
        console.log(totalPrice.toFixed(2));
    } else if (product === "coke") {
        totalPrice = coke * quantity;
        console.log(totalPrice.toFixed(2));
    } else {
        totalPrice = snacks * quantity;
        console.log(totalPrice.toFixed(2));
    }
}

orders("coffee", 2);
orders("water", 5);