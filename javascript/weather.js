document.querySelector('#wf-search-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#wf-city-input').value;

    if (!cityName) {
        document.querySelector("#wf-weather-result").classList.remove('show');
        showAlert('Digite o nome de uma cidade...');
        return;
    }

    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    
    const langSelect = document.querySelectorAll('.settings-select')[1];
    const currentLangValue = langSelect ? langSelect.value : "pt-BR";
    
    let units = 'metric';
    let langApi = 'pt_br';
    let unitSymbol = '°C';
    let windUnit = 'km/h';

    if (currentLangValue === "en-US") {
        units = 'imperial';
        langApi = 'en';
        unitSymbol = '°F';
        windUnit = 'mph';
    } else if (currentLangValue === "es-ES") {
        units = 'metric';
        langApi = 'es'; 
        unitSymbol = '°C';
        windUnit = 'km/h';
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=${units}&lang=${langApi}`;

    try {
        const results = await fetch(apiUrl);
        const json = await results.json();

        if (json.cod === 200) {
            let finalDescription = json.weather[0].description;

            if (currentLangValue === "es-ES") {
                if (finalDescription.toLowerCase() === "algo de nubes") {
                    finalDescription = "algunas nubes";
                }
                if (finalDescription.toLowerCase() === "cielo claro") {
                    finalDescription = "cielo despejado";
                }
            }

            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: finalDescription,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
                unitSymbol: unitSymbol,
                windUnit: windUnit
            });
        } else {
            document.querySelector("#wf-weather-result").classList.remove('show');
            let errorMsg = currentLangValue === "en-US" ? 'City not found.' : 
                           currentLangValue === "es-ES" ? 'Ciudad no encontrada.' : 'Cidade não encontrada.';
            showAlert(errorMsg);
        }
    } catch (error) {
        let errorMsg = currentLangValue === "en-US" ? 'Error loading data.' : 
                       currentLangValue === "es-ES" ? 'Error al cargar datos.' : 'Erro ao carregar dados.';
        showAlert(errorMsg);
    }
});

function showInfo(json) {
    showAlert('');
    document.querySelector("#wf-weather-result").classList.add('show');
    document.querySelector('#wf-location-title').innerText = `${json.city}, ${json.country}`;
    document.querySelector('#wf-temp-now').innerHTML = `${json.temp.toFixed(0)}<sup>${json.unitSymbol}</sup>`;
    document.querySelector('#wf-description').innerText = json.description;
    document.querySelector('#wf-temp-icon').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#wf-temp-max').innerHTML = `${json.tempMax.toFixed(0)}<sup>${json.unitSymbol}</sup>`;
    document.querySelector('#wf-temp-min').innerHTML = `${json.tempMin.toFixed(0)}<sup>${json.unitSymbol}</sup>`;
    document.querySelector('#wf-humidity-val').innerText = `${json.humidity}%`;
    document.querySelector('#wf-wind-val').innerText = `${json.windSpeed.toFixed(1)} ${json.windUnit}`;
}

function showAlert(msg) {
    document.querySelector('#wf-error-alert').innerText = msg;
}