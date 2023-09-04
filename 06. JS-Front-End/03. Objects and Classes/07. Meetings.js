function meetings(input) {
    let meets = {};

    for (const line of input) {
        let [day, name] = line.split(' ');

        if (!meets.hasOwnProperty(day)) {
            meets[day] = name;
            console.log(`Scheduled for ${day}`);
        }
        else {
            console.log(`Conflict on ${day}!`);
        }
    }

    for (const key in meets) {
        console.log(`${key} -> ${meets[key]}`);
    }
}

meetings(['Monday Peter',
'Wednesday Bill',
'Monday Tim',
'Friday Tim']);