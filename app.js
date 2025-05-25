// https://api.openweathermap.org/data/2.5/weather?lat=28.6711527&lon=77.4120356&appid=ec99aec66d6d231466250cf9fb84d219&units=metric
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=ec99aec66d6d231466250cf9fb84d219

// List of invalid cities for simulation
// const invalidCities = ['xyz', 'invalidcity', 'notacity', 'fakecity', '123', ''];

// document.getElementById('weatherForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const cityInput = document.getElementById('cityInput');
//     const city = cityInput.value.trim();
    
//     if (city) {
//         showLoading();
//         hideError();
//         hideWeatherCard();
        
//         // Simulate API call with setTimeout
//         setTimeout(() => {
//             hideLoading();
            
//             // Check if city is in invalid list or too short
//             if (invalidCities.includes(city.toLowerCase()) || city.length < 2) {
//                 showError();
//             } else {
//                 showWeatherData(city);
//             }
//         }, 1500);
//     }
// });

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
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=ec99aec66d6d231466250cf9fb84d219`);
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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ec99aec66d6d231466250cf9fb84d219&units=metric`);
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
    const mockData = {
        location: city,
        temperature: Math.floor(Math.random() * 30) + 5,
        description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        feelsLike: Math.floor(Math.random() * 30) + 5,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        visibility: Math.floor(Math.random() * 15) + 5
    };

    document.getElementById('location').textContent = mockData.location;
    document.getElementById('temperature').textContent = mockData.temperature + '°C';
    document.getElementById('description').textContent = mockData.description;
    document.getElementById('feelsLike').textContent = mockData.feelsLike + '°C';
    document.getElementById('humidity').textContent = mockData.humidity + '%';
    document.getElementById('windSpeed').textContent = mockData.windSpeed + ' km/h';
    document.getElementById('visibility').textContent = mockData.visibility + ' km';

    document.getElementById('weatherCard').style.display = 'block';
}