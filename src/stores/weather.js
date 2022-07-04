import { defineStore } from "pinia";
import { ref } from "vue";

const API_KEY = import.meta.env.VITE_API_KEY;
const api_base = 'https://api.openweathermap.org/data/2.5/';

export const weatherDataStore = defineStore({
  id: "weather",
  state: () => ({
    weatherInfo: ref({
      cityName: 'Kathmandu',
      countryName: 'NP',
      currentTemp: 23,
      subjectiveTemp: 29,
      humidity: 75,
      weatherIcon: '03n',
      weatherIconUrl: '',
      windSpeed: 3.3,
      cloudCover: 95,
      weatherCondition: 'really cold',
      sunrise: '05:00 AM',
      sunset: '18:00 PM',
      weatherLocationTime: '15:00 PM',
    }),
    unitsType: 'metric',
    cityInput: 'Kathmandu',
    conditionString: '404',
    backgroundUrl: '',
  }),

  getters: {
    getWeatherData: (state) => {
      return state.fetchWeatherData()
    }
  },
  actions: {
    async fetchWeatherData(city) {
      if(city) {
      let response = await fetch(`${api_base}weather?q=${this.cityInput}&units=${this.unitsType}&appid=${API_KEY}`)
      const responseStatus = response.status
      if (responseStatus === 200) {
        const data = await response.json()
        const localeTZ = new Date().getTimezoneOffset() / 60
        const weatherTZ = data.timezone / 3600
        const weatherLocationDate = new Date(data.dt * 1000 + (localeTZ + weatherTZ) * 3600000)
        const sunriseDate = new Date(data.sys.sunrise * 1000 + (localeTZ + weatherTZ) * 3600000)
        const sunsetDate = new Date(data.sys.sunset * 1000 + (localeTZ + weatherTZ) * 3600000)
        this.weatherInfo.cityName = data.name
        this.weatherInfo.countryName = data.sys.country
        this.weatherInfo.weatherCondition = this.capitalizeWords(data.weather[0].description)
        this.conditionString = (data.weather[0].main).toLowerCase()
        this.weatherInfo.weatherIcon = data.weather[0].icon
        this.weatherInfo.weatherIconUrl = `http://openweathermap.org/img/wn/${this.weatherInfo.weatherIcon}@2x.png`
        this.weatherInfo.currentTemp = (data.main.temp).toFixed(0)
        this.weatherInfo.subjectiveTemp = (data.main.feels_like).toFixed(0)
        this.weatherInfo.humidity = data.main.humidity
        this.weatherInfo.windSpeed = (data.wind.speed * 3.6).toFixed(1)
        this.weatherInfo.cloudCover = data.clouds.all
        this.weatherInfo.sunrise = sunriseDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
        this.weatherInfo.sunset = sunsetDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
        this.weatherInfo.weatherLocationTime = weatherLocationDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true })

        if (weatherLocationDate.getHours() > sunriseDate.getHours() && weatherLocationDate.getHours() < sunsetDate.getHours()) {
          this.backgroundUrl = `/images/skies/${this.conditionString}.jpg`
          } else {
          this.backgroundUrl = `/images/skies/${this.conditionString}-night.jpg`
        }
      } if(responseStatus === 404) {
        this.weatherInfo.cityName = ''
        this.weatherInfo.countryName = ''
        this.weatherInfo.weatherCondition = this.capitalizeWords(`${this.cityInput} ${response.statusText}`)
        this.weatherInfo.weatherIcon = ''
        this.weatherInfo.weatherIconUrl = ''
        this.weatherInfo.currentTemp = 0
        this.weatherInfo.subjectiveTemp = 0
        this.weatherInfo.humidity = 0
        this.weatherInfo.windSpeed = 0
        this.weatherInfo.cloudCover = 0
        this.weatherInfo.sunrise = '00:00'
        this.weatherInfo.sunset = '00:00'
        this.weatherInfo.weatherLocationTime = '00:00'
        this.backgroundUrl = '/images/skies/404.jpg'
  }
}
  return this.weatherInfo
    },
    capitalizeWords(sentenceString) {
      let __tmpArray = []
      const wordsArray = sentenceString.split(' ')
      wordsArray.forEach(word => {
        const capitalizedWord = word.slice(0, 1).toLocaleUpperCase() + word.slice(1)
        __tmpArray.push(capitalizedWord)
      })
      return __tmpArray.join(' ')
    }
  }
});
