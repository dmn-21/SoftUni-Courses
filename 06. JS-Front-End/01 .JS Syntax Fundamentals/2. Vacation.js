function solve (count, type, day) {
    let totalPrice = 0;

    if (type === "Students") {
        if (day === "Friday") {
            totalPrice += count * 8.45;
        }
        else if (day === "Saturday") {
            totalPrice += count * 9.8;
        }
        else {
            totalPrice += count * 10.46;
        }
        if (count >= 30) {
            totalPrice *= 0.85;
        }
    }
    else if (type === "Business") {
        if (count >= 100) {
            count -= 10;
        }
        if (day === "Friday") {
            totalPrice += count * 10.9;
        }
        else if (day === "Saturday") {
            totalPrice += count * 15.6;
        }
        else {
            totalPrice += count * 16;
        }
    }
    else {
        if (day === "Friday") {
            totalPrice += count * 15;
        }
        else if (day === "Saturday") {
            totalPrice += count * 20;
        }
        else {
            totalPrice += count * 22.5;
        }
        if (count >= 10 && count <= 20) {
            totalPrice *= 0.95;
        }
    }
    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}
solve(30, "Students", "Sunday");
solve(40, "Regular", "Saturday");