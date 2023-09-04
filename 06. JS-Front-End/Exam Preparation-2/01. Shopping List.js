function shoppingList(input) {
    let items = input.shift().split('!');

    for (const line of input) {

        if (line === 'Go Shopping') {
            brake;
        }

        let [ cmd, item ] = line.split(' ');

        if (cmd === 'Urgent') {
            if (!items.includes(item)) {
                items.unshift(item);
            }
        } else if (cmd === 'Unnecessary') {
            if (items.includes(item)) {
                let index = items.indexOf(item);
                items.splice(index, 1);
            }
            
        } else if (cmd === 'Correct') {
            let [cm, oldItem, newItem ] = line.split(' ');
            if (items.includes(oldItem)) {
                let index = items.indexOf(item);
                items.splice(index, 1, newItem);
                
            }
        } else {
            if (items.includes(item)) {
                let index = items.indexOf(item);
                items.splice(index, 1);
                items.push(item);
            }
        }
    }
    console.log(items.join(', '));
}
shoppingList(["Tomatoes!Potatoes!Bread",

"Unnecessary Milk",

"Urgent Tomatoes",

"Go Shopping!"]);



shoppingList(["Milk!Pepper!Salt!Water!Banana",

"Urgent Salt",

"Unnecessary Grapes",

"Correct Pepper Onion",

"Rearrange Grapes",

"Correct Tomatoes Potatoes",

"Go Shopping!"])