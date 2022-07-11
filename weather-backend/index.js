/* jshint esversion:10 */

const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
let qs = require("qs");
let cors = require("cors");

dotenv.config();
const API_KEY = process.env.WEATHER_API_KEY;

const app = express();
const port = 3050;
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);
let data = {};
const api_base = "https://api.openweathermap.org/data/2.5/weather?";

app.get("/api/v1/weather", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let query = request.query;
  query.appid = API_KEY;
  queryString = qs.stringify(query);
  axios
    .get(`${api_base}${queryString}`)
    .then((res) => {
      data = res.data;
      data.message = "OK";
      response.send(data);
    })
    .catch((error) => {
      data = error.response.data;
      response.send(data);
      console.log(data);
    });
});

app.get("/", (request, response) => {
  response.send("Hello World!!");
});

app.listen(port, () => {
  console.log(`Weather Backend App listening at http://localhost:${port}`);
});
