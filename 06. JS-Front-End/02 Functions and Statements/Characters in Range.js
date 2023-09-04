function inRange (firstChar, secondChar) {
    let start = Math.min(firstChar.charCodeAt(0), secondChar.charCodeAt(0));
    let end = Math.max(firstChar.charCodeAt(0), secondChar.charCodeAt(0));
    let output = [];
    
    for (let i = start + 1; i < end; i++) {
        output.push(String.fromCharCode(i));
    }

    console.log(output.join(" "));
}

inRange ('a', 'd');
inRange ('#', ':');
inRange ('C', '#');