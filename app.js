document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (city) {
        showLoading();
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            hideLoading();
            showWeatherData(city);
        }, 1500);
    }
});

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weatherCard').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showWeatherData(city) {
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