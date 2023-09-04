function oddOccurrences(input) {
    let words = input.split(" ").map(el => el.toLowerCase());
    let collection = {};

    collection = words.reduce((acc, cur, i) => {
        if (!acc.hasOwnProperty(cur)) {
            acc[cur] = 1;
        } else {
            acc[cur]++;
        }

        return acc;
    }, {});

    collection = Object.entries(collection)
        .filter(([word, value]) => {
            if (value % 2 !== 0) {
                return word;
            }
        })
        .map(el => el[0]);

    console.log(collection.join(" "));
}

oddOccurrences('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');