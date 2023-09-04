function loadingBar (num) {  
    let output = [];

    for (let i = 0; i < num / 10; i++) {
        output.push("%");
    }

    while (output.length < 10) {
        output.push("."); 
    }

    if (num === 100) {
        console.log(`${num}% Complete!`);
        console.log(`[${output.join("")}]`);

        return;
    }

    console.log(`${num}% [${output.join("")}]`);
    console.log("Still loading...");
}

loadingBar(30);
loadingBar(50);
loadingBar(100);