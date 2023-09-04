function solve() {

    const info = document.querySelector('#info > span');
    const btnDepart = document.getElementById('depart');
    const btnArrive = document.getElementById('arrive');
    let nextStopID = 'depot';
    let nextStopName = null;
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/';

    function depart() {
        btnDepart.disabled = true;
        btnArrive.disabled = false;

        fetch(`${BASE_URL}${nextStopID}`)
            .then((res) => res.json())
            .then((nextStopInfo) => {
                const { name, next } = nextStopInfo;
                nextStopName = name;
                info.textContent = `Next stop ${nextStopName}`;
                nextStopID = next;
            })
            .catch((err) => {
                info.textContent = 'Error';
            });
    }

    async function arrive() {
        btnDepart.disabled = false;
        btnArrive.disabled = true;
        info.textContent = `Arriving at ${nextStopName}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();