# 🌤️ Weather Info & Forecast Bot using IBM Watson

Welcome to the Weather Info & Forecast Bot repository! This project demonstrates how to integrate IBM Watson's conversational capabilities with a weather API to provide current weather and forecast information for cities worldwide. The bot is implemented in Node.js and includes a RESTful API.

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Features](#features)
- [Demo Video](#demo-video)
- [Architecture](#architecture)
  - [Architecture Diagram](#architecture-diagram)
  - [Conversational Flow Diagram](#conversational-flow-diagram)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting Up IBM Watson](#setting-up-ibm-watson)
  - [Setting Up Webhook](#setting-up-webhook)
  - [Building and Running the REST API](#building-and-running-the-rest-api)
- [Usage Instructions](#usage-instructions)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This repository provides a comprehensive guide to building a weather chatbot using IBM Watson. The bot is capable of fetching the current weather and 8-day forecasts for any specified city using a REST API backend implemented in Node.js.

## Project Overview

The project includes:

1. **IBM Watson Assistant**: A conversational AI to handle user queries.
2. **Webhook Integration**: Connects IBM Watson to a RESTful API for weather data.
3. **REST API**: A backend service that interacts with a weather data provider.
4. **Deployment**: Uses Ngrok to expose the local server for testing.

## Features

- **Real-time Weather Data**: Provides current weather details for specified cities.
- **8-Day Forecast**: Delivers weather predictions for up to 8 days.
- **Conversational Interface**: User-friendly chatbot interaction.
- **Scalable and Extensible**: Easily adaptable for future enhancements.

## Demo Video

Check out our demo video "https://drive.google.com/file/d/1ntO8Uf-WXgBshlO8zBFRP5cqvWnBCmBq/view?usp=sharing "to see the bot in action!

### Detailed Workflow:

1. **User Interaction**: Users interact with the chatbot via IBM Watson Assistant.
2. **Webhook Trigger**: The bot triggers a webhook to fetch weather data.
3. **Data Retrieval**: The REST API calls a weather service to obtain data.
4. **Response Delivery**: The data is returned to the chatbot, which then presents it to the user.


## Getting Started

Follow these detailed steps to set up and run the project on your local machine.

### Prerequisites

- **IBM Cloud Account**: [Sign up here](https://cloud.ibm.com/registration) if you don’t have one.
- **Ngrok**: [Download and install Ngrok](https://ngrok.com/download) to expose your local server to the internet.
- **Node.js and npm**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/).
- **Weather API Key**: Obtain an API key from [OpenWeatherMap](https://openweathermap.org/).

### Setting Up IBM Watson

1. **Create a Watson Assistant**:
   - Log in to your [IBM Cloud account](https://cloud.ibm.com/login).
   - Go to the [Watson Assistant service](https://cloud.ibm.com/catalog/services/watson-assistant) and create a new instance.
   - Define the following:
     - **Intents**: Create intents like `get_current_weather` and `get_weather_forecast`.
     - **Entities**: Define entities to capture `city` and `date`.
     - **Dialog**: Set up the dialog to respond to different intents and provide relevant weather information.

2. **Configure Webhooks**:
   - In the Assistant settings, add a webhook URL under the **Fulfillment** section.
   - Use the URL from Ngrok or your hosted backend to handle webhook requests.

### Setting Up Webhook

1. **Expose Local Server**:
   - Install Ngrok and run the following command to expose your local server (assuming it runs on port 3000):
     ```bash
     ngrok http 3000
     ```
   - Note the public URL provided by Ngrok 

2. **Webhook URL Configuration**:
   - In the Watson Assistant settings, set the webhook URL to the public URL from Ngrok followed by the endpoint path (e.g., `https://12345678.ngrok.io/webhook`).

### Building and Running the REST API

1. **Clone the Repository**:
   ```bash
   git clone[ https://github.com/your-username/weather-forecast-bot.git](https://github.com/NabeelAhmed2211012KHICND/Weather-Info-Forecast-Bot)
   cd weather-forecast-bot
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file to store your API key and configuration.
   - Example `.env` file:
     ```env
     OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
     PORT=3000
     ```

4. **Run the Server**:
   ```bash
   node app.js
   ```

5. **Test the API**:
   - Use a tool like Postman or cURL to test the API endpoints.
   - Example cURL command:
     ```bash
     curl -X POST https://12345678.ngrok.io/webhook -H "Content-Type: application/json" -d '{"currentCity":"New York","requestType":"current"}'
     ```

### API Documentation

**POST /webhook**

- **Description**: Fetches weather data based on the request type (current weather or forecast).
- **Request Body**:
  - `currentCity` (optional): City name for current weather.
  - `forecastCity` (optional): City name for forecasted weather.
  - `requestType` (required): Type of request, either `current` for current weather or `forecast` for weather forecast.
  - `startDate` (optional): Start date for forecast in `YYYY-MM-DD` format.
- **Responses**:
  - `200 OK`: Returns the requested weather data.
  - `400 Bad Request`: Missing required parameters or invalid request type.
  - `500 Internal Server Error`: Error fetching weather data.

## Usage Instructions

1. **Start the Bot**:
   - Ensure your local server is running and Ngrok is exposing it.
   - Open the Watson Assistant interface and initiate a chat session.

2. **Interact with the Bot**:
   - Example queries:
     - "What's the current weather in Tokyo?"
     - "Give me the forecast for Paris for the next 8 days."

3. **Receive Weather Data**:
   - The bot will respond with the current weather or forecast based on the input query.

## Testing

1. **Automated Tests**:
   - Add unit tests to your API endpoints to ensure they handle various inputs correctly.
   - Use a testing framework like Mocha or Jest.

2. **Manual Testing**:
   - Interact with the bot and check if it provides accurate weather information and handles edge cases (e.g., invalid city names).

3. **Integration Testing**:
   - Ensure the end-to-end flow works seamlessly from user input to API response.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**:
   - Click the "Fork" button on the repository page to create your own copy.

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/weather-forecast-bot.git
   ```

3. **Create a New Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**:
   - Implement your feature or fix a bug.
   - Ensure your changes follow the coding standards and include tests.

5. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add feature/your-feature-name"
   ```

6. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**:
   - Go to the original repository and create a pull request from your fork.
