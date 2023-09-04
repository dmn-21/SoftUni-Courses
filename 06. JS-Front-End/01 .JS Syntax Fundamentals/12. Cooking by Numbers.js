function solve (numAsString, ...commands) {
    let num = Number(numAsString);

    for (const cmd of commands) {
        if (cmd === 'chop') {
            num /= 2;
        }
        else if (cmd === 'dice') {
            num = Math.sqrt(num);
        }
        else if (cmd === 'spice') {
            num++;
        }
        else if (cmd === 'bake') {
            num *= 3;
        }
        else if (cmd === 'fillet') {
            num *= 0.8;
        }

        console.log(num);
    }
}
solve('32', 'chop', 'chop', 'chop', 'chop', 'chop');