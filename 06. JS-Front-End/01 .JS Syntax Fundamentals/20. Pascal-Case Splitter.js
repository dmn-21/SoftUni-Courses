function solve (str) {
    let arr = str.split('');
    let splittedWords = [];

    for (const ch of arr) {
        let upperChar = ch.toUpperCase();
        if (ch === upperChar) {
            if (splittedWords.length > 0) {
            splittedWords.push(", ");
            }
            splittedWords.push(ch);
        }
        else {
            splittedWords.push(ch);
        }
    }

    console.log(splittedWords.join(""));
}
solve('SplitMeIfYouCanHaHaYouCantOrYouCan');
solve('ThisIsSoAnnoyingToDo');