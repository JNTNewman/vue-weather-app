<script setup>

</script>

<template>
  <div class="body-wrapper">
    <h1>Javascript Weather App</h1>
    <div class="sample-image">
      <img src="../assets/app-sample-screen.png" alt="Download Sun Icon" />
    </div>
    <h2>Welcome 👋</h2>
    <p>Welcome to this Vue 3 weather app repository.</p>
    <h2>The Inspiration</h2>
    <p>
      I came across a very well-crafted weather app built in
      <a class="base-link" href="https://dogukanbatal.github.io/vue-weather-app">Vue JS Weather App</a>
      by Dogukan Batal and thought of doing a clone in vanilla JS and then Vue 3 to hone my HTML, CSS and
      Javascript skills.
    </p>
    <p>
      This weather app utilizes the
      <a class="base-link" href="https://openweathermap.org/">OpenWeather API</a> and you will need
      to set up an account (it has a free tier) and get an API key to use with the
      app.
    </p>
    <hr />
    <h2>Favicon</h2>
    <p>
      I used the sun icon from FreeIconsPNG site.
      <a class="base-link" href="https://www.freeiconspng.com/img/8579" title="Image from freeiconspng.com"><img
          src="https://www.freeiconspng.com/uploads/sun-icon-22.png" width="32" alt="Download Sun Icon" /></a>
    </p>
    <h2>Project Setup</h2>
    <ol>
      <li>1. Clone the github repository which should contain the code for the Vue frontend and the Express backend that
        handles the calls to the OpenWeatherMap API.</li>
      <li>
        2. Sign up and create and API Key at
        <a class="base-link" href="https://openweathermap.org/">OpenWeatherMap</a>.
      </li>
      <li>3. Store your key as <span class="code">WEATHER_APP_ID = "YOUR_API_KEY";</span> in a .env file such as
        at the root of the weather-backend.</li>
      <li>4. Run <span class="code">npm init</span> from the frontend and backend directories and run <span
          class="code">npm run dev</span> to get
        both frontend and backend servers running.</li>
      <li>5. Access http://localhost:3000 to get to frontend.</li>
    </ol>
    <h2 id="description">Description</h2>
    <p>
      The app takes city name query and returns information about weather
      conditions: temperature, feel, wind speed, sky condition, humidity, cloud
      cover, sunrise, sunset and actual time in that city. The background of the
      container div changes depending on the weather conditions and night and day.
      Images for the background are from
      <a class="base-link" href="https://unsplash.com/">Unsplash.com</a>. I have tried to have
      images to cover all possible conditions but I may have missed some.
    </p>
    <p>
      You may also input the query string as City Name, State and Country (eg. San
      Francisco, US or San Francisco, CA, US)
    </p>
    <p>With you permission the App could use your geolocation coordinates to determine your city and thus get weather
      data for your local city.</p>
    <h2 id="use">Use</h2>
    <p>Feel free to clone, fork and improve as you desire.</p>
    <p><em>John Newman</em></p>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800&display=swap');

:root {
  --color-background: #F1F1F1;
  --color-primary: #FFFFFF;
  --color-text: #000000;
  --color-platinum: #E5E4E2;
  --color-muted: #AAAAAA;
  --color-warning: #CC3300;
  --color-link: blue;

}

* {
  box-sizing: border-box;
  overflow: scroll;
  margin: 0;
  color: var(--color-text)
}

.body-wrapper {
  height: 100vh;
  padding: 2rem;
  font-size: 1.1rem;
  text-align: justify;
}

.sample-image {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}


h1,
h2,
h3 {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

h1 {
  text-align: center;
  margin: 1rem 0 1.5rem 0;
}

h2 {
  margin: 1rem 0 0.3rem 0;
}


h3 {
  margin: 0.3rem 0 0.3rem 0;
}

p {
  margin-bottom: 0.75rem;
}

a.base-link {
  color: var(--color-text);
  font-weight: 500;
}

a.base-link:hover {
  text-decoration: none;
  color: var(--color-link)
}

hr {
  margin: 2rem 0 1rem 0;
}

.code {
  font-size: 1rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 800;
}

ol > li {
  list-style-type: lower-latin;
}
</style>