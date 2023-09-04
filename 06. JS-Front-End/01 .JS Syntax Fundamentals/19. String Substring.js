function solve (word, text) {
    let arr = text.split(" ");

    for (const sub of arr) {
        if (sub.toLowerCase() === word) {
            console.log(word);
            
            return;
        }
        else {
            console.log(`${word} not found!`);

            return;
        }
    }
}
solve('javascript', 'JavaScript is the best programming language');
solve('python', 'JavaScript is the best programming language');