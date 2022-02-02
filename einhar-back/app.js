require('dotenv').config()

const axios = require('axios');

const express = require('express');
const app = express();
const port = 5000;

function getDate() {
    let today = new Date();

    let local = "[" + today.toLocaleDateString("fr-FR") + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "]";

    return local;
}

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

app.get('/guilds', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.sendStatus(400).send('Bad Request');
    }
    else {
        const { data: guildInfo } = await axios.get(
            'https://discord.com/api/guilds/' + guild_id,
            {
                headers: {
                    'Authorization': 'Bot ' + process.env.BOT_TOKEN
                },
            }
        );

        res.status(400).send(guildInfo);
    }
});

app.get('/guilds/members', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.sendStatus(400).send('Bad Request');
    }
    else {
        const { data: guildInfo } = await axios.get(
            "https://discord.com/api/guilds/" + guild_id + "/members",
            {
                headers: {
                    'Authorization': 'Bot ' + process.env.BOT_TOKEN
                },
            }
        );

        res.status(400).send(guildInfo);
    }
});

app.get('/guilds/channels', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.sendStatus(400).send('Bad Request');
    }
    else {
        const { data: channels } = await axios.get(
            "https://discord.com/api/guilds/" + guild_id + "/channels",
            {
                headers: {
                    'Authorization': 'Bot ' + process.env.BOT_TOKEN
                },
            }
        );

        res.status(400).send(channels);
    }
});

app.get('/channels/messages', async (req, res) => {
    const channel_id = req.query.channel_id;

    if (channel_id == undefined) {
        res.sendStatus(400).send('Bad Request');
    }
    else {
        const { data: channels } = await axios.get(
            "https://discord.com/api/channels/" + channel_id + "/messages",
            {
                headers: {
                    'Authorization': 'Bot ' + process.env.BOT_TOKEN
                },
            }
        );

        res.status(400).send(channels);
    }
});

app.get('/CLIENT_SECRET', (req, res) => {
    res.status(200).json(process.env.CLIENT_SECRET);
});

app.listen(port, () => {
    console.log(getDate() + " API running at http://localhost:" + port);
});
