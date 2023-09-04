function pianist(input) {
    let n = Number(input.shift());
    let collection = {};
    let cmdParser = {
        'Add': addPiece,
        'Remove': removePiece,
        'ChangeKey': changeKey,
    };
    
    for (let i = 0; i < n; i++) {
        let [ piece, composer, key ] = input.shift().split('|');
        collection[piece] = {composer, key};
    }

    for (const line of input) {  
        if (line === 'Stop') {
            break;
        }

        let cmdTokens = line.split('|');
        let cmd = cmdTokens[0];
        cmdParser[cmd](...cmdTokens.slice(1));
    }

    for (const piece in collection) {
        let { key, composer } = collection[piece];
        console.log(`${piece} -> Composer: ${composer}, Key: ${key}`);
    }

    function addPiece(piece, composer, key) {
        if (!collection.hasOwnProperty(piece)) {
            collection[piece] = { composer, key };
            console.log(`${piece} by ${composer} in ${key} added to the collection!`);
        } else {
            console.log(`${piece} is already in the collection!`);
        }
    }

    function removePiece(piece) {
        if (collection.hasOwnProperty(piece)) {
            delete collection[piece];
            console.log(`Successfully removed ${piece}!`);
        } else {
            console.log(`Invalid operation! ${piece} does not exist in the collection.`);
        }
    }

    function changeKey(piece, newKey) {
        if (collection.hasOwnProperty(piece)) {
            collection[piece].key = newKey;
            console.log(`Changed the key of ${piece} to ${newKey}!`);
        } else {
            console.log(`Invalid operation! ${piece} does not exist in the collection.`);
        }
    }
}

pianist([ '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
        'Add|Sonata No.2|Chopin|B Minor',
        'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
        'Add|Fur Elise|Beethoven|C# Minor',
        'Remove|Clair de Lune',
        'ChangeKey|Moonlight Sonata|C# Major',
        'Stop' ]);