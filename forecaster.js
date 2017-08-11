function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com';
    $('#submit').click(loadForecast);

    function request(endpoint) {
        return $.ajax({
            method: 'GET',
            url: baseUrl + endpoint,
        })

    }

    function loadForecast() {
        request('/locations.json')
            .then(displayLocations)
            .catch(handleError);
    }

    function displayLocations(dataArr) {
        let inputLocation = $('#location').val();
        let code = dataArr
            .filter(loc => loc['name'] === inputLocation)
            .map(loc => loc['code']) [0];

        if (!code) {
            handleError();
        }

        let todayForecastP = request(`/forecast/today/${code}.json`);
        let upcomingForecastP = request(`/forecast/upcoming/${code}.json`);
        Promise.all([todayForecastP, upcomingForecastP])
            .then(displayAllForecstInfo)
            .catch(handleError)
    }

    function displayAllForecstInfo([todayWeather, upcomingWeather]) {
        let weatherSymbols = {
            'Synny': '&#x2600;',
            'Party sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;',
        };

        let forecast = $('#forecast');
        forecast.css('display', 'block');
        displayToCurrent(todayWeather, weatherSymbols);
        displayToUpcoming(upcomingWeather, weatherSymbols);
    }

    function displayToCurrent(todayWeather, weatherSymbols) {
        let current = $('#current');
        current.empty();
        let highLow =
            current
                .append($('<div class="label"Current conditions</div>'))
                .append($(`<span class="condition symbol">${weatherSymbols[todayWeather['forecast']['condition']]}</span>`))
                .append($('<span class="condition">')
                    .append($(`<span class="forecast-data">${todayWeather['name']}</span>`))
                    .append($(`<span class="forecast-data">${todayWeather['forecast']['low']}&#176;/${todayWeather['forecast']['high']}&#176;</span>`)))
                .append($(`<span class="forecast-data">${todayWeather['forecast']['condition']}</span>`))
    }

    function displayToUpcoming(upcomingWeather, weatherSymbols) {
        let upcoming = $('#upcoming');
        upcoming.empty();
        upcoming.append($('<div class="label">Three-day forecast</div>'))
        let data = upcomingWeather['forecast'];
        for (let info of data) {
            console.log(info);
            upcoming
                .append($('<span class="upcoming">')
                .append($(`<span class="symbol">${weatherSymbols[info['condition']]}</span>`))
                .append($(`<span class="forecast-data">${info['low']}&#176;/${info['high']}&#176;</span>`)))
                .append($(`<span class="forecast-data">${info['condition']}</span>`))

        }
    }

    function handleError() {
    $('#forecast')
        .css('display', 'block')
        .text('Error');
    }
}