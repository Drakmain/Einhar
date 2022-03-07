require('dotenv').config()

const undici = require('undici');

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
    res.status(400).send("Bad Request");
});

app.get('/guilds', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " http://localhost:" + port + "/guilds Bad Request");
    }
    else {

        let guildInfo = await undici.fetch('https://discord.com/api/guilds/' + guild_id + '?with_counts=true', {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        guildInfo = await guildInfo.json();

        if (guildInfo.code == 50001) {
            res.status(401).send("Missing acces");
            console.log(getDate() + " http://localhost:" + port + "/guilds " + guild_id + " Missing acces");
        }
        else {
            res.status(200).send(guildInfo);
            console.log(getDate() + " http://localhost:" + port + "/guilds " + guild_id + " OK");
        }
    }
});

app.get('/guilds/members', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " http://localhost:" + port + "/guilds/members Bad Request");
    }
    else {
        let guildMembers = await undici.fetch("https://discord.com/api/guilds/" + guild_id + "/members?limit=100", {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        guildMembers = await guildMembers.json();

        res.status(200).send(guildMembers);
        console.log(getDate() + " http://localhost:" + port + "/guilds/members OK");
    }
});

app.get('/guilds/channels', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " http://localhost:" + port + "/guilds/channels Bad Request");
    }
    else {
        let guildChannels = await undici.fetch("https://discord.com/api/guilds/" + guild_id + "/channels", {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        guildChannels = await guildChannels.json();

        res.status(200).send(guildChannels);
        console.log(getDate() + " http://localhost:" + port + "/guilds/channels OK");
    }
});

app.get('/channels/messages', async (req, res) => {
    const channel_id = req.query.channel_id;

    if (channel_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " http://localhost:" + port + "/channels/messages Bad Request");
    }
    else {
        let channelMessages = await undici.fetch("https://discord.com/api/channels/" + channel_id + "/messages", {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        channelMessages = await channelMessages.json();

        res.status(200).send(channelMessages);
        console.log(getDate() + " http://localhost:" + port + "/channels/messages OK");
    }
});

app.get('/guild/emojis', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " http://localhost:" + port + "/guild/emojis Bad Request");
    }
    else {
        let channelMessages = await undici.fetch("https://discord.com/api/guilds/" + guild_id + "/emojis", {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        channelMessages = await channelMessages.json();

        res.status(200).send(channelMessages);
        console.log(getDate() + " http://localhost:" + port + "/channels/messages OK");
    }
});

app.get('/CLIENT_SECRET', (req, res) => {
    res.status(200).json(process.env.CLIENT_SECRET);
});

app.listen(port, () => {
    console.log(getDate() + " API running at http://localhost:" + port);
});
