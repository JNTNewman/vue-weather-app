const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
let qs = require('qs');
let cors = require('cors')

dotenv.config()
const API_KEY = process.env.WEATHER_API_KEY;

const app = express();
const port = 3050;
app.use('*', cors())
let data = {}
const api_base = 'https://api.openweathermap.org/data/2.5/weather?';

app.get('/api/', (request, response) => {
    // response.set('Access-Control-Allow-Origin')
    let query = request.query
    query.appid = API_KEY
    queryString = qs.stringify(query)
    console.log(queryString);
    axios.get(`${api_base}${queryString}`)
    .then(res => {
        data = res.data
        data.message = 'OK'
        response.send(data)})
        .catch(error => {data = error.response.data
        response.send(data)})
})

app.listen(port, () => {
    console.log(`Weather Backend App listening at http://localhost:${port}`)
})