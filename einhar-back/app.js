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
        console.log(getDate() + " Error: http://localhost:" + port + "/guilds Bad Request");
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
            res.status(401).send("Missing acces : " + guild_id);
            console.log(getDate() + " Error: http://localhost:" + port + "/guilds Missing acces " + guild_id);
        }
        else {
            res.status(200).send(guildInfo);
            console.log(getDate() + " http://localhost:" + port + "/guilds OK " + guild_id);
        }
    }
});

app.get('/guild/members', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/guild/members Bad Request");
    }
    else {
        let guildMembers = await undici.fetch("https://discord.com/api/guilds/" + guild_id + "/members?limit=1000", {
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

app.get('/message/create', async (req, res) => {
    const channel_id = req.query.channel_id;
    const content = req.query.content;

    if (channel_id == undefined || content == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/message/create Bad Request");
    }
    else {
        let result = await undici.fetch("https://discord.com/api/channels/" + channel_id + "/messages", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
            body: JSON.stringify({
                "content": "This is a message with components",
            })
        });

        result = await result.json();

        res.status(200).send(result);
        console.log(getDate() + " http://localhost:" + port + "/message/create OK");
    }
});

app.get('/message/edit', async (req, res) => {
    const message_id = req.query.message_id;
    const channel_id = req.query.channel_id;
    const content = req.query.content;

    if (message_id == undefined || channel_id == undefined || content == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/message/edit Bad Request");
    }
    else {
        let result = await undici.fetch("https://discord.com/api/channels/" + channel_id + "/messages/" + message_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
            body: JSON.stringify({ "content": content })
        });

        result = await result.json();

        if (result.code == 10008) {
            res.status(401).send("Unknown Message : " + message_id);
            console.log(getDate() + " Error: http://localhost:" + port + "/message/edit Unknown Message : " + message_id);
        }
        else if (result.code == 10003) {
            res.status(401).send("Unknown Channel : " + channel_id);
            console.log(getDate() + " Error: http://localhost:" + port + "/message/edit Unknown Channel : " + channel_id);
        }
        else {
            res.status(200).send(result);
            console.log(getDate() + " http://localhost:" + port + "/message/edit OK");
        }
    }
});

app.get('/message/delete', async (req, res) => {
    const channel_id = req.query.channel_id;
    const message_id = req.query.message_id;

    if (channel_id == undefined && message_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/message/delete Bad Request");
    }
    else {
        let result = await undici.fetch("https://discord.com/api/channels/" + channel_id + "/messages/" + message_id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        result = await result.json();

        if (result.code == 10008) {
            res.status(404).send("Unknown Message : " + message_id);
            console.log(getDate() + " Error: http://localhost:" + port + "/message/delete Unknown Message " + message_id);
        }
        else if (result.code == 10003) {
            res.status(404).send("Unknown Channel : " + channel_id);
            console.log(getDate() + " Error: http://localhost:" + port + "/message/delete Unknown Channel : " + channel_id);
        }
        else {
            res.status(200).send(result);
            console.log(getDate() + " http://localhost:" + port + "/message/delete OK");
        }
    }
});

app.get('/guild/roles', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/guild/roles Bad Request");
    }
    else {
        let roles = await undici.fetch("https://discord.com/api/guilds/" + guild_id + "/roles", {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        roles = await roles.json();

        res.status(200).send(roles);
        console.log(getDate() + " http://localhost:" + port + "/guild/roles OK " + guild_id);
    }
});

app.get('/guild/channels', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/guild/channels Bad Request");
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
        console.log(getDate() + " http://localhost:" + port + "/guild/channels OK");
    }
});

app.get('/channel/messages', async (req, res) => {
    const channel_id = req.query.channel_id;

    if (channel_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/channels/messages Bad Request");
    }
    else {
        let channelMessages = await undici.fetch("https://discord.com/api/channels/" + channel_id + "/messages", {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        channelMessages = await channelMessages.json();

        console.log(channelMessages.filter(c => c.author.username == "Drakmain"));

        res.status(200).send(channelMessages);
        console.log(getDate() + " http://localhost:" + port + "/channels/messages OK");
    }
});

app.get('/guild/user/messages', async (req, res) => {
    const user_id = req.query.user_id;
    const guild_id = req.query.guild_id;

    let allChannelMessages = new Array;
    let channelMessages = new Array;

    if (user_id == undefined && guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/guild/user/messages Bad Request");
    }
    else {
        let guildChannels = await undici.fetch("https://discord.com/api/guilds/" + guild_id + "/channels", {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        guildChannels = await guildChannels.json();

        for (let i = 0; i < guildChannels.length; i++) {
            channelMessages = await undici.fetch("https://discord.com/api/channels/" + guildChannels[i].id + "/messages", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bot ' + process.env.BOT_TOKEN,
                },
            });

            channelMessages = await channelMessages.json();

            allChannelMessages = allChannelMessages.concat(channelMessages);
        }

        res.status(200).send(allChannelMessages);
        console.log(getDate() + " http://localhost:" + port + "/guild/user/messages OK");
    }
});

app.get('/guild/emojis', async (req, res) => {
    const guild_id = req.query.guild_id;

    if (guild_id == undefined) {
        res.status(400).send("Bad Request");
        console.log(getDate() + " Error: http://localhost:" + port + "/guild/emojis Bad Request");
    }
    else {
        let emojis = await undici.fetch("https://discord.com/api/guilds/" + guild_id + "/emojis", {
            method: 'GET',
            headers: {
                'Authorization': 'Bot ' + process.env.BOT_TOKEN,
            },
        });

        emojis = await emojis.json();

        res.status(200).send(emojis);
        console.log(getDate() + " http://localhost:" + port + "/guild/emojis OK");
    }
});

app.get('/CLIENT_SECRET', (req, res) => {
    res.status(200).json(process.env.CLIENT_SECRET);
});

app.listen(port, () => {
    console.log(getDate() + " API running at http://localhost:" + port);
});
