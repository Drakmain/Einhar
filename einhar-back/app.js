require('dotenv').config()

const express = require('express');
const app = express();
const port = 5000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);

    next();
});

app.get('/', (req, res) => {
    res.sendStatus(400).send('Bad Request');
});

app.get('/CLIENT_SECRET', (req, res) => {
    res.status(200).json(process.env.CLIENT_SECRET);
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
