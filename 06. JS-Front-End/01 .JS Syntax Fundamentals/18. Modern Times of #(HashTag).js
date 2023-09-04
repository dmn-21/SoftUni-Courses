function solve (text) {
    let words = text.split(" ");

    for (const word of words) {
        if (word.startsWith("#") && word.length > 1) {
            let newWord = word.replace("#", "");
            console.log(newWord);
        }
    }
}
solve('Nowadays everyone uses # to tag a #special word in #socialMedia'); 
solve('The symbol # is known #variously in English-speaking #regions as the #number sign');