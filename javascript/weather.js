document.querySelector('#wf-search-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#wf-city-input').value;

    if (!cityName) {
        document.querySelector("#wf-weather-result").classList.remove('show');
        showAlert('Digite o nome de uma cidade...');
        return;
    }

    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(apiUrl);
        const json = await results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
            document.querySelector("#wf-weather-result").classList.remove('show');
            showAlert('Cidade não encontrada.');
        }
    } catch (error) {
        showAlert('Erro ao carregar dados.');
    }
});

function showInfo(json) {
    showAlert('');
    document.querySelector("#wf-weather-result").classList.add('show');

    document.querySelector('#wf-location-title').innerText = `${json.city}, ${json.country}`;
    document.querySelector('#wf-temp-now').innerHTML = `${json.temp.toFixed(0)}<sup>°C</sup>`;
    document.querySelector('#wf-description').innerText = json.description;
    document.querySelector('#wf-temp-icon').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#wf-temp-max').innerHTML = `${json.tempMax.toFixed(0)}<sup>°</sup>`;
    document.querySelector('#wf-temp-min').innerHTML = `${json.tempMin.toFixed(0)}<sup>°</sup>`;
    document.querySelector('#wf-humidity-val').innerText = `${json.humidity}%`;
    document.querySelector('#wf-wind-val').innerText = `${json.windSpeed.toFixed(1)} km/h`;
}

function showAlert(msg) {
    document.querySelector('#wf-error-alert').innerHTML = msg;
}