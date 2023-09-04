function addressBook(input) {
    let persons = {};

    for (const line of input) {
        let [name, address] = line.split(':');

        if (!persons.hasOwnProperty(name)) {
            persons[name] = address;
        }
        else {
            persons[name] = address;
        }
    }

    let sorted = Object.keys(persons)
    .sort((a, b) => a.localeCompare(b));

    for (const name of sorted) {
        console.log(`${name} -> ${persons[name]}`);
    }
}

addressBook(['Tim:Doe Crossing',
'Bill:Nelson Place',
'Peter:Carlyle Ave',
'Bill:Ornery Rd']);