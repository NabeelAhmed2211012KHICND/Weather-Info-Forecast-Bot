const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

// Yeh middleware hai jo JSON bodies ko parse karta hai
app.use(express.json());

// hamara code 2 hison may yani post request karay ga ya to currentCity ya phir forcastCity

// /webhook endpoint define karna jiss ki request POST hay
app.post('/webhook', async (req, res) => {
  // Request body se data le rahe hain
  const { currentCity, forecastCity, requestType, startDate } = req.body;

  // Agar request current weather ke liye hai
  if (requestType === 'current') {
    // Check karte hain ke currentCity provided hai ya nahi
    if (!currentCity) {
      return res.status(400).json({ error: 'Current city is required' });
    }

    try {
      // OpenWeather API ko request karte hain taake current weather ka data mil sake
      const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: { q: currentCity, appid: apiKey, units: 'metric' }
      });

      // API response se weather data nikalna
      const weatherData = response.data;
      
      // Weather data client ko wapas bhejna
      return res.json({
        city: weatherData.name,
        temperature: weatherData.main.temp,
        weather: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        wind_speed: weatherData.wind.speed
      });

    } catch (error) {
      // Agar koi error ho to 500 status aur error message wapas bhejna
      return res.status(500).json({ error: 'Error fetching current weather data' });
    }

  // Agar request forecast weather ke liye hai
  } else if (requestType === 'forecast') {
    // Check karte hain ke forecastCity aur startDate provided hain ya nahi
    if (!forecastCity) {
      return res.status(400).json({ error: 'Forecast city is required' });
    }
    if (!startDate) {
      return res.status(400).json({ error: 'Start date is required' });
    }

    try {
      // OpenWeather API ko request karte hain taake forecast ka data mil sake
      const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast/daily', {
        params: { q: forecastCity, appid: apiKey, units: 'metric', cnt: 8 }
      });

      // API response se forecast data nikalna
      const forecastData = response.data;
      
      // Forecast data ko filter aur map karte hain
      const forecasts = forecastData.list
        .filter(day => new Date(day.dt * 1000) >= new Date(startDate)) // Start date ke baad wale din filter karte hain
        .map(day => ({
          date: new Date(day.dt * 1000).toLocaleDateString(), // Unix timestamp ko readable date mein convert karte hain
          temperature: {
            day: day.temp.day,
            min: day.temp.min,
            max: day.temp.max
          },
          weather: day.weather[0].description,
          humidity: day.humidity,
          wind_speed: day.speed
        }));

      // Forecast data client ko wapas bhejna
      return res.json({
        city: forecastData.city.name,
        country: forecastData.city.country,
        forecasts
      });

    } catch (error) {
      // Agar koi error ho to 500 status aur error message wapas bhejna
      return res.status(500).json({ error: 'Error fetching forecast weather data' });
    }
  } else {
    // Agar request type invalid ho to 400 status aur error message wapas bhejna
    return res.status(400).json({ error: 'Invalid request type' });
  }
});

// Server specified port par start karna
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
