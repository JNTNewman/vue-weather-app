const express = require('express');
const app = express();
const port = 3050;

// const api_base = 'https://api.openweathermap.org/data/2.5/';
const VITE_API_KEY = '471ec473b0b47d8a45df1e5816e4294a';

app.get('/', (request, response) => {
    response.send('Hello World')
})

app.listen(port, () => {
    console.log(`Weather Backend App listening at http://localhost:${port}`)
})