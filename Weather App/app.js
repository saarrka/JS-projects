const apiKey = 'YOUR_API_KEY';

function displayWeather(data) {
  const { main, weather, wind, name } = data;
  const weatherIcon = weather[0].icon;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const weatherDescription = weather[0].description;
  const city = name;

  // Save data to localStorage
  localStorage.setItem('city', city);
  localStorage.setItem('temperature', temperature);
  localStorage.setItem('humidity', humidity);
  localStorage.setItem('windSpeed', windSpeed);
  localStorage.setItem('weatherDescription', weatherDescription);
  localStorage.setItem('weatherIcon', weatherIcon);

  // Call the function to display the weather
  updateWeatherDisplay(city, weatherIcon, temperature, humidity, windSpeed, weatherDescription);
}

function loadFromLocalStorage() {
  const city = localStorage.getItem('city');
  const temperature = localStorage.getItem('temperature');
  const humidity = localStorage.getItem('humidity');
  const windSpeed = localStorage.getItem('windSpeed');
  const weatherDescription = localStorage.getItem('weatherDescription');
  const weatherIcon = localStorage.getItem('weatherIcon');

  if (city && temperature && humidity && windSpeed && weatherDescription && weatherIcon) {
    updateWeatherDisplay(city, weatherIcon, temperature, humidity, windSpeed, weatherDescription);
  }
}

function updateWeatherDisplay(city, weatherIcon, temperature, humidity, windSpeed, weatherDescription) {
  document.getElementById('weatherResult').innerHTML = `
    <div class='city-and-icon'>
        <h2>${city}</h2>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather icon">
    </div>
    <div class='weather-info'>
        <p><i class="fas fa-temperature-high"></i> Temperature: ${temperature}°C</p>
        <p><i class="fas fa-tint"></i> Humidity: ${humidity}%</p>
        <p><i class="fas fa-wind"></i> Wind Speed: ${windSpeed} m/s</p>
        <p><i class="fas fa-cloud-sun"></i> Description: ${weatherDescription}</p>
    </div>
  `;
}

// Fetch weather when button is clicked
document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;

    if (city === '') {
      alert('Please enter the city name.');
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod === '404') {
          document.getElementById('weatherResult').innerHTML = 'City not found.';
        } else {
          displayWeather(data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
});

window.onload = function() {
  loadFromLocalStorage();
};
