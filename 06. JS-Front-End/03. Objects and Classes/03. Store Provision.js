function storProvision(first, second) {

    let object = {};

    for (let i = 0; i < first.length; i++) {
        if (i % 2 === 0) {
            object[first[i]] = Number(first[i + 1]);
        }
    }

    for (let i = 0; i < second.length; i++) {
        if (i % 2 === 0) {
            if (object.hasOwnProperty(second[i])) {
                object[second[i]] += Number(second[i + 1]);
            }
            else {
                object[second[i]] = Number(second[i + 1]);
            }
        }
    }

    for (const key in object) {
        console.log(`${key} -> ${object[key]}`);
    }
}

storProvision([
    'Chips', '5', 'CocaCola', '9', 'Bananas',
    '14', 'Pasta', '4', 'Beer', '2'
    ],
    [
    'Flour', '44', 'Oil', '12', 'Pasta', '7',
    'Tomatoes', '70', 'Bananas', '30'
    ]
    );