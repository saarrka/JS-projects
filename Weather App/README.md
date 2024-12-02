# Weather App Project

This is a simple Weather App built using JavaScript, HTML, and CSS. The app allows users to check the current weather by providing a location (city name). It fetches real-time data from a weather API and displays the weather information, including temperature, humidity and weather conditions.

## Features:
- **Search for a city's weather**: Users can search for the weather by entering a city name.
- **Displays current weather data**: Shows temperature, humidity, and weather conditions.
- **Responsive design**: The app is designed to work across various screen sizes.
- **Error handling**: If an invalid city name is entered or there is an issue with the API, an error message is displayed.

## Technologies Used:
- JavaScript
- HTML
- CSS
- OpenWeatherMap API (for fetching weather data)

## How it works:
1. The user enters a city name in the input field and clicks the "Search" button.
2. The app sends a request to the OpenWeatherMap API with the city name.
3. The weather data is then displayed on the screen, showing the temperature, humidity, and weather description.
4. If the city is invalid or the request fails, an error message is shown.

## Weather App - API Key Setup

For the Weather App project, you need an API key from [OpenWeather](https://openweathermap.org/).

### Follow these steps to get your API key:

1. Go to [OpenWeather API](https://openweathermap.org/).
2. Sign up or log in to your account.
3. Once logged in, navigate to the **API keys** section in your account settings.
4. Copy the generated API key.

### Replace the API Key in `app.js`

After obtaining your API key, follow these steps:

1. Open the `app.js` file in the **Weather App** folder.
2. Replace `YOUR_API_KEY` with the API key you copied from OpenWeather.

For example, change:

```javascript
const apiKey = 'YOUR_API_KEY';  // Replace with your actual API key
