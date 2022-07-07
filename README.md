Javascript Weather App
======================

<img src="../vue-weather-app/src/assets/app-sample-screen.png" />
Welcome 👋
----------

Welcome to this Vue 3 weather app repository.

The Inspiration
---------------

I came across a very well-crafted weather app built in [Vue JS Weather App](https://dogukanbatal.github.io/vue-weather-app) by Dogukan Batal and thought of doing a clone in vanilla JS and then Vue 3 to hone my HTML, CSS and Javascript skills.

This weather app utilizes the [OpenWeather API](https://openweathermap.org/) and you will need to set up an account (it has a free tier) and get an API key to use with the app.

* * *

Favicon
-------

I used the sun icon from FreeIconsPNG site.
<a href="https://www.freeiconspng.com/img/8579" title="Image from freeiconspng.com"><img src="https://www.freeiconspng.com/uploads/sun-icon-22.png" width="32" alt="Download Sun Icon" /></a>

Project Setup
-------------

1. Clone the github repository which should contain the code for the Vue frontend and the Express backend that handles the calls to the OpenWeatherMap API.
2. Sign up and create and API Key at [OpenWeatherMap](https://openweathermap.org/).
3. Store your key as WEATHER\_APP\_ID = "YOUR\_API\_KEY"; in a .env file such as at the root of the weather-backend.
4. Run npm init from the frontend and backend directories and run npm run dev to get both frontend and backend servers running.
5. Access <http://localhost:3000> to get to frontend.

Description
-----------

The app takes city name query and returns information about weather conditions: temperature, feel, wind speed, sky condition, humidity, cloud cover, sunrise, sunset and actual time in that city. The background of the container div changes depending on the weather conditions and night and day. Images for the background are from [Unsplash.com](https://unsplash.com/). I have tried to have images to cover all possible conditions but I may have missed some.

You may also input the query string as City Name, State and Country (eg. San Francisco, US or San Francisco, CA, US)

With you permission the App could use your geolocation coordinates to determine your city and thus get weather data for your local city.

Use
---

Feel free to clone, fork and improve as you desire.

_John Newman_
