import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
const api_url = "http://localhost:3050/api/v1/weather";

axios.defaults.headers.common['Access-Control-Origin'] = '*';

export const weatherDataStore = defineStore({
  id: "weather",
  state: () => ({
    weatherInfo: ref({
      cityName: "",
      countryName: "",
      currentTemp: 0,
      subjectiveTemp: 0,
      humidity: 0,
      weatherIcon: "",
      weatherIconUrl: "",
      windSpeed: 0,
      cloudCover: 0,
      weatherCondition: "",
      sunrise: "",
      sunset: "",
      weatherLocationTime: "",
    }),
    unitsType: "metric",
    cityInput: "Vostok", // Default city input
    longitudePos: "",
    latitudePos: "",
    conditionString: "",
    backgroundUrl: "",
    responseError: false,
    data: {},
  }),

  getters: {
    getWeatherData: (state) => {
      return state.fetchWeatherData();
    },
  },
  actions: {
    async fetchWeatherData(city) {
      if (city) {
        let response = await axios.get(`${api_url}?q=${this.cityInput}&units=${this.unitsType}`);
        this.data = await response.data;
      } else if (this.longitudePos && this.latitudePos) {
        let response = await axios.get(
          `${api_url}?lon=${this.longitudePos}&lat=${this.latitudePos}&units=${this.unitsType}`
        );
        this.data = await response.data;
      }
      if (this.data.cod == 200) {
        this.responseError = false;
        const localeTZ = new Date().getTimezoneOffset() / 60;
        const weatherTZ = this.data.timezone / 3600;
        const weatherLocationDate = new Date(
          this.data.dt * 1000 + (localeTZ + weatherTZ) * 3600000
        );
        const sunriseDate = new Date(
          this.data.sys.sunrise * 1000 + (localeTZ + weatherTZ) * 3600000
        );
        const sunsetDate = new Date(
          this.data.sys.sunset * 1000 + (localeTZ + weatherTZ) * 3600000
        );
        this.weatherInfo.cityName = this.data.name;
        this.cityInput = this.data.name;
        this.weatherInfo.countryName = this.data.sys.country;
        this.weatherInfo.weatherCondition = this.capitalizeWords(
          this.data.weather[0].description
        );
        this.conditionString = this.data.weather[0].main.toLowerCase();
        this.weatherInfo.weatherIcon = this.data.weather[0].icon;
        this.weatherInfo.weatherIconUrl = `http://openweathermap.org/img/wn/${this.weatherInfo.weatherIcon}@2x.png`;
        this.weatherInfo.currentTemp = this.data.main.temp.toFixed(0);
        this.weatherInfo.subjectiveTemp = this.data.main.feels_like.toFixed(0);
        this.weatherInfo.humidity = this.data.main.humidity;
        this.weatherInfo.windSpeed = (this.data.wind.speed * 3.6).toFixed(1);
        this.weatherInfo.cloudCover = this.data.clouds.all;
        this.weatherInfo.sunrise = sunriseDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        this.weatherInfo.sunset = sunsetDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        this.weatherInfo.weatherLocationTime =
          weatherLocationDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

        if (
          weatherLocationDate.getHours() > sunriseDate.getHours() &&
          weatherLocationDate.getHours() < sunsetDate.getHours()
        ) {
          this.backgroundUrl = `/images/skies/${this.conditionString}.jpg`;
        } else {
          this.backgroundUrl = `/images/skies/${this.conditionString}-night.jpg`;
        }
      } else if (this.data.cod == 404) {
        this.responseError = true;
        this.weatherInfo.cityName = "";
        this.weatherInfo.countryName = "";
        this.weatherInfo.weatherCondition = this.capitalizeWords(
          `${this.data.message}`
        );
        this.weatherInfo.weatherIcon = "";
        this.weatherInfo.weatherIconUrl = "";
        this.weatherInfo.currentTemp = "?";
        this.weatherInfo.subjectiveTemp = "?";
        this.weatherInfo.humidity = "?";
        this.weatherInfo.windSpeed = "?";
        this.weatherInfo.cloudCover = "?";
        this.weatherInfo.sunrise = "00:00";
        this.weatherInfo.sunset = "00:00";
        this.weatherInfo.weatherLocationTime = "00:00";
        this.backgroundUrl = "/images/skies/404.jpg";
      }
      // }
      // return this.weatherInfo
    },
    capitalizeWords(sentenceString) {
      let __tmpArray = [];
      const wordsArray = sentenceString.split(" ");
      wordsArray.forEach((word) => {
        const capitalizedWord =
          word.slice(0, 1).toLocaleUpperCase() + word.slice(1);
        __tmpArray.push(capitalizedWord);
      });
      return __tmpArray.join(" ");
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitudePos = position.coords.latitude;
          this.longitudePos = position.coords.longitude;
          this.fetchWeatherData(null);
        },
        (error) => {
          console.log(error.message);
          this.fetchWeatherData(this.cityInput);
        }
      );
    },
  },
});
