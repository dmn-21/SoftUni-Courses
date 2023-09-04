function phoneBook(input) {
    let persons = {};

    for (const line of input) {
        let [name, number] = line.split(' ');

        if (!persons.hasOwnProperty(name)) {
            persons[name] = number;
        }
        else {
            persons[name] = number;
        }
        
    }

    for (const key in persons) {
        console.log(`${key} -> ${persons[key]}`);
    }
}

phoneBook(['George 0552554',
'Peter 087587',
'George 0453112',
'Bill 0845344']);