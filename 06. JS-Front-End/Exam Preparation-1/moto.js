function race(input) {
    let n = Number(input.shift());
    let collection = {};
    let cmdParser = {
        'StopForFuel': stopForFuel,
        'Overtaking': overtaking,
        'EngineFail': engineFail,
    };
    
    for (let i = 0; i < n; i++) {
        let [ rider, fuelCapacity, position ] = input.shift().split('|');
        collection[rider] = { fuelCapacity: Number(fuelCapacity), position };
    }
    
    for (const line of input) {  
        if (line === 'Finish') {
            break;
        }

        let cmdTokens = line.split(" - ");
        let cmd = cmdTokens[0];
        cmdParser[cmd](...cmdTokens.slice(1));
    }

    for (const rider in collection) {
        let { fuelCapacity, position } = collection[rider];
        console.log(rider);
        console.log(`Final position: ${position}`);
    }

    function stopForFuel(rider, minFuel, changePosition) {
        let minFuelNum = Number(minFuel);
        if (collection[rider].fuelCapacity < minFuelNum) {
            collection[rider].position = changePosition;
            console.log(`${rider} stopped to refuel but lost his position, now he is ${changePosition}.`);
            if (collection[rider].fuelCapacity + minFuel <= 100) {
                collection[rider].fuelCapacity += minFuel;
            } else {
                collection[rider].fuelCapacity = 100;   
            }

        } else {
            console.log(`${rider} does not need to stop for fuel!`);
        }
    }

    function overtaking(rider1, rider2) {
        let positionRider1 = collection[rider1].position;
        let positionRider2 = collection[rider2].position;
        if (positionRider1 < positionRider2) {
            
        collection[rider1].position = positionRider2;
        collection[rider2].position = positionRider1;
        console.log(`${rider1} overtook ${rider2}!`);
        }
    }

    function engineFail(rider, lapsLeft) {
        delete collection[rider];
        console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
    }
} 

race([
    "4",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|3",
    "Jorge Lorenzo|80|4",
    "Johann Zarco|80|2",
    "StopForFuel - Johann Zarco - 90 - 5",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"
]);