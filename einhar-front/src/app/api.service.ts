import { Injectable } from '@angular/core';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  code!: any;
  error!: string;
  error_description!: string;
  isLogged: boolean = false;
  token!: string;
  selectedServer!: string;

  constructor() { }

  getIsLogged() {
    return this.isLogged;
  }

  getError() {
    return this.error;
  }

  getError_description() {
    return this.error_description;
  }

  getSelectedServer() {
    return this.selectedServer;
  }

  setSelectedServer(server: any) {
    this.selectedServer = server;
  }

  async authentification(code: any, error: string, error_description: string) {

    this.code = code;
    this.error = error;
    this.error_description = error_description;

    if (this.error == undefined) {
      const { data: client_secret } = await axios.get(
        'http://localhost:5000/CLIENT_SECRET',
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      const params = new URLSearchParams({
        client_id: '875444482835886131',
        client_secret: client_secret.toString(),
        grant_type: 'authorization_code',
        code: this.code,
        redirect_uri: 'http://localhost:4200/authentification'
      });

      const reponse = await axios.post(
        'https://discord.com/api/v8/oauth2/token',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      );

      this.isLogged = true;
      this.token = reponse.data.access_token;
    }
  }

  async getUserMe() {
    const { data: user } = await axios.get(
      'https://discord.com/api/v8/users/@me',
      {
        headers: {
          'Authorization': 'Bearer ' + this.token,
        },
      }
    );

    return user;
  }

  async getGuild(guild_id: string) {
    const guilds = await axios.get(
      'http://localhost:5000/guild?guild_id=' + guild_id,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).catch(function (error) {
      if (error.response) {
        return error.response.status;
      }
    });

    return guilds;
  }

  async getGuildRoles(guild_id: string) {
    const roles = await axios.get(
      'http://localhost:5000/guild/roles?guild_id=' + guild_id,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).catch(function (error) {
      if (error.response) {
        return error.response.status;
      }
    });

    return roles.data;
  }

  async getGuildMembers(guild_id: string) {
    const { data: members } = await axios.get(
      'http://localhost:5000/guild/members?guild_id=' + guild_id,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    return members.data;
  }

  async getUserMeGuilds() {
    const { data: guilds } = await axios.get(
      'https://discord.com/api/v8/users/@me/guilds',
      {
        headers: {
          'Authorization': 'Bearer ' + this.token,
        },
      }
    );

    return guilds;
  }

  async getUserGuildMember(guild_id: string) {
    const member = await axios.get(
      'https://discord.com/api/v8/users/@me/guilds/' + guild_id + '/member',
      {
        headers: {
          'Authorization': 'Bearer ' + this.token,
        },
      }
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response);
        return error.response;
      }
    });

    return member;
  }

  async getEmojis(guild_id: string) {
    const { data: emojis } = await axios.get(
      'http://localhost:5000/guild/emojis?guild_id=' + guild_id,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    return emojis;
  }

  async getChannelMessages(channel_id: string) {
    const { data: emojis } = await axios.get(
      'http://localhost:5000/channel/messages?channel_id=' + channel_id,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    return emojis;
  }

  async getUserMessages(guild_id: string, user_id: string) {
    const { data: emojis } = await axios.get(
      'http://localhost:5000/guild/user/messages?guild_id=' + guild_id + "&user_id=" + user_id,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    return emojis;
  }

}
