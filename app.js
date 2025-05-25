
document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();

    showLoading(); // Show loading immediately
    hideError();
    hideWeatherCard();

    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim().toLowerCase();

    getLatLon(city)
    .then((data) => {
        // Simulate API call with setTimeout
        setTimeout(() => {
            hideLoading();
            getData(data.lat,data.lon)
            .then((weatherData) => {
                showWeatherData(weatherData);
            })
            .catch(() => {
                showError();
            })
        }, 1500);
    })
    .catch(() => {
        setTimeout(() => {
            hideLoading();
            showError();
        }, 1500);
    });
});

async function getLatLon(city){
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid= {Your App Id} `); // Open Weather API Id
    try{
        if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
                throw new Error("City not found. Please enter a valid city name.")
            }
            // Proceed with data[0].lat and data[0].lon
            return {lat: data[0].lat,lon: data[0].lon}
        } else {
            throw new Error("Error fetching Latitude and Longitude from API.");
        }
    } catch(error){
        console.error(error);
        throw new Error(error)
    }
}

async function getData(lat,lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid= {Your App Id} &units=metric`); // Open Weather API Id
    try{
        if (response.ok) {
            const data = await response.json();
            return data
            
        } else {
            throw new Error("Error fetching data from API.");
        }
    } catch(error){
        throw new Error(error);
        
    }
}

// Error close button functionality
document.getElementById('errorClose').addEventListener('click', function() {
    hideError();
});

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weatherCard').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.style.display = 'block';
    errorElement.classList.add('error-show');
}

function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.style.display = 'none';
    errorElement.classList.remove('error-show');
}

function hideWeatherCard() {
    document.getElementById('weatherCard').style.display = 'none';
}

function showWeatherData(data) {
    // Mock weather data
    const Data = {
        location: data["name"],
        temperature: data["main"]["temp"],
        description: data["weather"][0]["main"],
        feelsLike: data["main"]["feels_like"],
        humidity: data["main"]["humidity"],
        windSpeed: data["wind"]["speed"],
        visibility: data["visibility"],
        icon: data["weather"][0]["icon"]
    };
    const image = 'http://api.openweathermap.org/img/w/'+Data.icon+'.png'
    document.getElementById('location').textContent = Data.location;
    document.getElementById('temperature').textContent = Data.temperature + '°C';
    document.getElementById('description').textContent = Data.description;
    document.getElementById('feelsLike').textContent = Data.feelsLike + '°C';
    document.getElementById('humidity').textContent = Data.humidity + '%';
    document.getElementById('windSpeed').textContent = Data.windSpeed + ' km/h';
    document.getElementById('visibility').textContent = Data.visibility/1000 + ' km';
    document.querySelector('.weather-icon').setAttribute("src", image)
    document.getElementById('weatherCard').style.display = 'block';
}