function attachEvents() {
    const locationName = document.getElementById('location').value;
    const button = document.getElementById('submit');
    const display = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    const BASE_URL = 'http://localhost:3030/jsonstore/forecaster';

    const weatherSymbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
    }

    button.addEventListener('click', update);
    
    async function update() {
        display.style.display = 'block';

        const locationResponse = await (await fetch(`${BASE_URL}/locations`)).json();
        let location = locationResponse.find((l) => l.name === locationName);
       
        const currResponse = await (await fetch(`${BASE_URL}/today/`)).json();
           
        let forecasts = document.createElement('div');
        forecasts.classList.add('forecast');

        let symbol = document.createElement('span');
        symbol.classList.add('condition', 'symbol');
        symbol.textContent = weatherSymbols[currResponse.forecast.condition];

        let conditions = document.createElement('span');

        let city = document.createElement('span');
        city.classList.add('forecast-data');
        city.textContent = currResponse.name;

        let temp = document.createElement('span');
        temp.classList.add('forecast-data');
        temp.textContent = (`${currResponse.forecast.low}°/${currResponse.forecast.high}°`);

        let condition = document.createElement('span');
        condition.classList.add('forecast-data');
        condition.textContent = currResponse.forecast.condition;

        current.appendChild(forecasts);
        forecasts.appendChild(symbol);
        forecasts.appendChild(conditions);
        conditions.appendChild(city);
        conditions.appendChild(temp);
        conditions.appendChild(condition);
    }
}    

attachEvents();