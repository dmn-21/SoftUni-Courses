function wordTracker(input) {
    let findWords = input[0].split(' ');
    let searchWords = input.slice(1);

    let words = [];

    for (const word of findWords) {
        words.push({word: word, count: 0});
    }

    for (const word of searchWords) {
        let findWord = words.find(w => w.word === word);
        if (findWord) { 
            findWord.count++;
        }
    }

    let sortedWords = words.sort((a, b) => b.count - a.count);


    for (const word of sortedWords) {
        console.log(`${word.word} - ${word.count}`);
    }
}

wordTracker([
    'this sentence',
    'In', 'this', 'sentence', 'you', 'have',
    'to', 'count', 'the', 'occurrences', 'of',
    'the', 'words', 'this', 'and', 'sentence',
    'because', 'this', 'is', 'your', 'task'
    ]
    );