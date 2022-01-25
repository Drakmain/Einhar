require('dotenv').config()

const express = require('express');
const app = express();
const port = 5000;

app.get('/salons', (req, res) => {
    res.send(process.env.TOKEN);
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
