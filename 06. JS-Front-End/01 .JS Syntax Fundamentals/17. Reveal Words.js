function solve (words, text) {
    let wordss = words.split(", ");
    
    for (const word of wordss) {
        let startIndex = text.indexOf("*");
        let endIndex = text.indexOf("* ");
        let count = endIndex - startIndex + 1;

        if (word.length === count) {
            text = text.replace(`${"*".repeat(count)}`, word);
        }
    }
    
    console.log(text);
}
solve ('great', 'softuni is ***** place for learning new programming languages');
solve ('great, learning', 'softuni is ***** place for ******** new programming languages');