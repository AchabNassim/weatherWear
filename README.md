WeatherWear API

WeatherWear is a weather-driven product recommendation API for e-commerce and fashion websites. It suggests personalized products based on real-time weather conditions like temperature and rainfall, enhancing the shopping experience for customers.
Getting Started
Prerequisites

    Node.js
    PostgreSQL

Installation

    - Clone the repository:

    git clone <repository_url>

    - Navigate to the project directory:

    cd <repository_name>

    - Install the dependencies:

    npm install

    Create a .env file in the root directory with the following environment variables:

    POSTGRESQL_PASSWORD=your_postgresql_password
    WEATHER_API_KEY=your_weather_api_key

    - Start the server:

    npm start

API Access

You can access the API at http://localhost:3000/ followed by the desired route. The available routes are:

    Authentication Routes:
        POST /register: Register a new user.
        POST /login: Login and create a session.
        GET /logout: Log out and destroy the session.

    Key Management Routes:
        GET /generate_key: Generate a new API key (authenticated users only).
        GET /get_key: Retrieve API key info (authenticated users only).
        POST /get_key: Retrieve API key info using the key itself.
        GET /update_key: Generate and update API key (authenticated users only).

    API Management Routes:
        POST /service: Get product suggestions based on city weather (requires API key and city).
        GET /user_history: Retrieve the user's API call history (authenticated users only).
