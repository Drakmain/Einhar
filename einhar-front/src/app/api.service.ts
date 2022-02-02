import { Injectable } from '@angular/core';
import axios from 'axios';

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

  async getGuild(guild_id: string) {
    const { data: guild } = await axios.get(
      'https://discord.com/api/v8/guilds/' + guild_id.toString(),
      {
        headers: {
          'Authorization': 'Bot ' + this.token,
        },
      }
    );

    return guild;
  }

  slowAlert() {
    console.log("Oue");
  }

  async getUserGuildMember(guild_id: string) {
    setTimeout(this.slowAlert, 200);
    const { data: member } = await axios.get(
      'https://discord.com/api/v8/users/@me/guilds/' + guild_id + '/member',
      {
        headers: {
          'Authorization': 'Bearer ' + this.token,
        },
      }
    );

    return member;
  }

  setSelectedServer(server_id: string) {
    this.selectedServer = server_id;
  }

  getSelectedServer() {
    return this.selectedServer;
  }

}
